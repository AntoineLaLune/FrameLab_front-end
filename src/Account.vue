<script setup>
  import { ref } from "vue";
  import { reactive } from "vue";

  import * as apiCall from "./utils/apiCall.ts";

  const isValid = ref("");
  const lastName = ref("");
  const firstName = ref("");
  const email = ref("");
  const oldEmail = ref("");
  const password = ref("");
  const oldPassword = ref("");

  window.onload = async function() { // Check si un compte est connecté
  	const data = await apiCall.getSession();

    if (data == undefined) {
      document.location.href="/login";
    }

  	lastName.value = data.last_name;
  	firstName.value = data.first_name;
  	email.value = data.email;
  	oldEmail.value = data.email;
  }

  async function submit() {
  	if (password.value == null || password.value == "") {
  		const response = await fetch("/api/users/edit", {
  			method: "PUT",
  			headers: { 'Content-Type' : "application/json" },
  			body: JSON.stringify({
  				newLastName : lastName.value,
  				newFirstName : firstName.value,
  				newEmail : email.value,
  				email : oldEmail.value,
  				password : oldPassword.value
  			})
  		}); const data = await response.json();


  		isValid.value = "";

  		console.log("vvvvv"+data.success)


  		if (data.success == false) {
  			isValid.value = data.message;
  			return;
  		} else {
  			isValid.value = "Changement effectué avec succès."
  			return;
  		}
  	}
  	if (password.value !== null && password.value !== "") {
  		const response = await fetch("/api/users/edit_with_password", {
  			method: "PUT",
  			headers: { 'Content-Type' : "application/json" },
  			body: JSON.stringify({
  				newLastName : lastName.value,
  				newFirstName : firstName.value,
  				newEmail : email.value,
  				email : oldEmail.value,
  				newPassword : password.value,
  				password : oldPassword.value
  			})
  		}); const data = await response.json();

  		isValid.value = "";

  		if (data.success == false) {
  			if (data.message == "L'adresse email n'existe pas." ||
  			data.message == "L'adresse email est déjà utilisé." ||
  			data.message == "Le mot de passe est invalide.") {
  				isValid.value = data.message;
  				return;
  			}
  			isValid.value = "Oups, quelque chose c'est mal passé !";
  			return;
  		} else {
  			isValid.value = "Changement effectué avec succès."
  			return;
  		}
  	}

  	isValid.value = "Oups, quelque chose c'est mal passé...";
  }

  async function logout() {
  	console.log("Peut être, peut être pas.") // @TODO
  }

</script>

<template>
	<body>
		<div v-bind:class="{ 'account-container' : true}">
			<div v-bind:class="{ 'top' : true }">
				<div>
					<h1><span>FrameLab</span><span v-bind:class="{ 'not-bold' : true }">Compte</span></h1>
				</div>
				<div>
					<p>Informations</p>
				</div>
			</div>
			<div v-bind:class="{ 'center' : true }">
				<div v-bind:class="{ 'input-section' : true }">
					<div v-bind:class="{ 'last-name-input-section' : true }">
						<label>Nom / Nouveau Nom</label>
						<input v-model="lastName" type="text" name="email" />
					</div>
					<div v-bind:class="{ 'first-name-input-section' : true }">
						<label>Prénom / Nouveau Prénom</label>
						<input v-model="firstName" type="text" name="email" />
					</div>
					<div v-bind:class="{ 'email-input-section' : true }">
						<label>Email / Nouvelle Email</label>
						<input v-model="email" type="text" name="email" />
					</div>
					<div v-bind:class="{ 'old-password-input-section' : true }">
						<label>Mot de passe actuel</label>
						<input v-model="oldPassword" type="password" name="oldPassword" />
					</div>
					<div v-bind:class="{ 'password-input-section' : true }">
						<label>Nouveau Mot de passe</label>
						<input v-model="password" type="password" name="password" />
					</div>
				</div>
			</div>
			<div v-bind:class="{ 'bottom' : true }">
				<div v-bind:class="{ 'botton-section' : true }">
					<button v-on:click="submit" type="submit">Modifier</button>
				</div>
				<div v-bind:class="{ 'botton-section' : true }">
					<button v-on:click="logout">Se déconnecter</button>
				</div>
				<div v-bind:class="{ 'is-valid-section' : true }">
					<p v-bind:class="{ 'low-warning' : true }">{{ isValid }}</p>
				</div>
			</div>
		</div>
	</body>
</template>

<style scoped>
  .account-container {
  	display: flex;
  	flex-direction: column;
  	justify-content: center;
  	height: 100%;
  	width: 100%;
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
