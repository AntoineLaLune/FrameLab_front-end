<script setup>
import { ref } from "vue";
import { reactive } from "vue";

const isValid = ref("")
const email = ref("")
const password = ref("")

document.addEventListener("keypress", logKey);

function logKey(e) {
	if (e.key=="Enter") {
		submit();
	}
}

async function submit() {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: { 'Content-Type' : "application/json" },
		body: JSON.stringify({
			email : email.value,
			password : password.value
		})
	}); const data = await response.json();

	isValid.value = ""; 

	if (data.success == false) {
		if (data.message == "L'adresse email n'existe pas.") {
			document.location.href="/register?email="+email.value;
			return;
		} else {
			isValid.value = data.message; 		
			return;
		}
	}

	document.location.href="/";
}
</script>

<template>
	<body>
		<div v-bind:class="{ 'body' : true}">
			<div v-bind:class="{ 'login-container' : true}">
				<div v-bind:class="{ 'top' : true }">
					<div>
						<h1><span>FrameLab</span><span v-bind:class="{ 'not-bold' : true }">Compte</span></h1>
					</div>
					<div>
						<p>Connexion et Inscription</p>
					</div>
				</div>
				<div v-bind:class="{ 'center' : true }">
					<div v-bind:class="{ 'input-section' : true }">
						<div v-bind:class="{ 'email-input-section' : true }">
							<label>Email</label>
							<input v-on:keypress="" v-bind:id="{ 'email_input' : true }" v-model="email" type="text" name="email" />
						</div>
						<div v-bind:class="{ 'password-input-section' : true }">
							<label>Mot de passe</label>
							<input v-bind:id="{ 'password_input' : true }" v-model="password" type="password" name="password" />
						</div>
					</div>
				</div>
				<div v-bind:class="{ 'bottom' : true }">
					<div v-bind:class="{ 'botton-section' : true }">
						<button v-bind:id="{ 'button' : true }" v-on:click="submit" type="submit">Valider</button>
					</div>
					<div v-bind:class="{ 'is-valid-section' : true }">
						<p v-bind:class="{ 'low-warning' : true }">{{ isValid }}</p>
					</div>
				</div>
			</div>
			<div v-bind:class="{ 'image-container' : true}">
				<img href="./public/renard.webp" alt="Decoration Image" /> <!-- À FAIRE -->
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

.login-container {
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
	padding: 10px 20px;
	text-align: center;
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: end;
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
	justify-content: space-between;
	width: 100%;

	
	* {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: start;
		width: 100%;
	}

	.email-input-section {
		width: 45%;
	}

	.password-input-section{
		width: 45%;
	}
}

.is-valid-section {
	padding: 10px 20px; /* horizontal / vertical */
}

.button-section {
	padding: 10px 20px; /* horizontal / vertical */
}

</style>
