<script setup>

	import { ref } from "vue";
	import * as apiCall from "./utils/apiCall";

	const isValid = ref("")
	const email = ref("")
	const password = ref("")

	document.addEventListener("keypress", logKey);

	function logKey(e) {
		if (e.key=="Enter") {
			login();
		}
	}

	async function login() {
		const data = await apiCall.login(email.value, password.value);

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
		<div class="body">
			<div class="login-container">
				<div class="top">
					<div>
						<h1><span>FrameLab</span><span class="not-bold">Compte</span></h1>
					</div>
					<div>
						<p>Connexion et Inscription</p>
					</div>
				</div>
				<div class="center">
					<div class="input-section">
						<div class="email-input-section">
							<label>Email</label>
							<input id="email_input" v-model="email" type="text" name="email" />
						</div>
						<div class="password-input-section">
							<label>Mot de passe</label>
							<input id="password_input" v-model="password" type="password" name="password" />
						</div>
					</div>
				</div>
				<div class="bottom">
					<div class="botton-section">
						<button id="button" v-on:click="login" type="submit">Valider</button>
					</div>
					<div class="is-valid-section">
						<p class="low-warning">{{ isValid }}</p>
					</div>
				</div>
			</div>
			<div class="image-container">
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
