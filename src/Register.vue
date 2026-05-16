<script setup>
  import { ref } from "vue";
  import { reactive } from "vue";

  const link = location.href;
  const linkEmail = link.substring(link.indexOf("?")+7);

  const isValid = ref("");
  const lastName = ref("");
  const firstName = ref("");
  const email = ref("");
  const password = ref("");

  if (link.indexOf("?") !== -1) {
  	email.value = linkEmail;
  }

  async function submit() {
  	const response = await fetch("/api/auth/register", {
  		method: "POST",
  		headers: { 'Content-Type' : "application/json" },
  		body: JSON.stringify({
  			lastName : lastName.value,
  			firstName : firstName.value,
  			email : email.value,
  			password : password.value
  		})
  	}); const data = await response.json();

  	isValid.value = "";

  	if (data.success == false) {
  		if (data.message == "Le format de l'adresse email est invalide.") {
  			isValid.value = data.message;
  			return;
  		}
  	}

  	if (data.success == false) {
  		if (data.message == "Le mot de passe doit faire au moins 8 caractères de long et inclure une majuscule, un minuscule, un chiffre, et un caractère speciale (#?!@$%^&*-.,)") {
  			isValid.value = data.message;
  			return;
  		}
  	}

  	if (data.success == false) {
  		isValid.value = "Oups, quelque chose c'est mal passé !";
  		return;
  	}

  	document.location.href="/";
  }
</script>

<template>
	<body>
		<div v-bind:class="{ 'body' : true}">
			<div v-bind:class="{ 'register-container' : true}">
				<div v-bind:class="{ 'top' : true }">
					<div>
						<h1><span>FrameLab</span><span v-bind:class="{ 'not-bold' : true}">Compte</span></h1>
					</div>
					<div>
						<p>Inscription</p>
					</div>
				</div>
				<div v-bind:class="{ 'center' : true }">
					<div v-bind:class="{ 'input-section' : true }">
						<div v-bind:class="{ 'last-name-input-section' : true }">
							<label>Nom</label>
							<input v-model="lastName" type="text" name="email" />
						</div>
						<div v-bind:class="{ 'first-name-input-section' : true }">
							<label>Prénom</label>
							<input v-model="firstName" type="text" name="email" />
						</div>
						<div v-bind:class="{ 'email-input-section' : true }">
							<label>Email</label>
							<input v-model="email" type="text" name="email" />
						</div>
						<div v-bind:class="{ 'password-input-section' : true }">
							<label>Mot de passe</label>
							<input v-model="password" type="password" name="password" />
						</div>
					</div>
				</div>
				<div v-bind:class="{ 'bottom' : true }">
					<div v-bind:class="{ 'botton-section' : true }">
						<button v-on:click="submit" type="submit">Valider</button>
					</div>
					<div v-bind:class="{ 'is-valid-section' : true }">
						<p v-bind:class="{ 'low-warning' : true }">{{ isValid }}</p>
					</div>
				</div>
			</div>
			<div v-bind:class="{ 'image-container' : true}">
				<img href="/api/renard.webp" alt="Decoration Image" /> <!-- À FAIRE -->
			</div>
		</div>
	</body>
</template>

<style scoped>
  .body {
  	display: flex;
  	height: 100%;
  }

  .image-container {
  	height: 100%;
  	width: 50%;
  }

  .register-container {
  	display: flex;
  	flex-direction: column;
  	justify-content: center;
  	height: 100%;
  	width: 50%;
  	align-items: center;
  	padding: 10px 20px;
  	text-align: center;
  }

  .top {
  	display: flex;
  	justify-content: space-between;
  	width: 100%;
  	align-items: end;
  	padding: 10px 20px;
  	text-align: center;
  }

  .center {
  	padding: 10px 20px; /* horizontal / vertical */
  	text-align: center;
  	width: 100%;
  }

  .bottom {
  	padding: 10px 20px; /* horizontal / vertical */
  	width: 100%;
  }

  .input-section {

  	display: flex;
  	flex-direction: column;
  	justify-content: space-between;
  	width: 100%;


  	* {
  		display: flex;
  		flex-direction: column;
  		justify-content: center;
  		text-align: start;
  		width: 100%;
  	}
  }

  .is-valid-section {
  	padding: 10px 20px; /* horizontal / vertical */
  }

  .botton-section {
  	padding: 10px 20px; /* horizontal / vertical */
  }

</style>
