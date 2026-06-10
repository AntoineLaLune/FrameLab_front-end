<script setup lang="ts">
	// Import(s)
	import { type Ref, ref } from "vue";
	import * as apiCall from "./utils/apiCall";
	import type { RegisterResponse } from "./utils/apiCall";

	// Set variable(s)
	const lastName: Ref<string> = ref("");
	const firstName: Ref<string> = ref("");
	const email: Ref<string> = ref("");
	const password: Ref<string> = ref("");
	const info: Ref<string> = ref("");

	// Load email from params
	const url: URL = new URL(location.href);
	const linkEmail = url.searchParams.get("email");
	if (linkEmail) {
		email.value = linkEmail;
	}

	// Launch register when enter
	document.addEventListener("keypress", logKey);
	function logKey(e: KeyboardEvent) {
		if (e.key == "Enter") {
			register();
		}
	}

	// Function(s)
	async function register() {
		const call: RegisterResponse = await apiCall.register(lastName.value, firstName.value, email.value, password.value);

		info.value = "";

		if (call.success == false) {
			if (call.message == "Le format de l'adresse email est invalide.") {
				info.value = call.message;
				return;
			}
		}

		if (call.success == false) {
			if (call.message == "Le mot de passe doit faire au moins 8 caractères de long et inclure une majuscule, un minuscule, un chiffre, et un caractère speciale (#?!@$%^&*-.,)") {
				info.value = call.message;
				return;
			}
		}

		if (call.success == false) {
			info.value = "Oups, quelque chose c'est mal passé !";
			return;
		}

		document.location.href = "/";
	}

	function goBack() {
		if (linkEmail) {
			document.location.href = "/login?email=" + linkEmail;
		} else {
			document.location.href = "/login";
		}
	}
</script>

<template>
	<body>
		<div class="body">
			<div class="register-container">
				<div class="top">
					<div>
						<h1><span>FrameLab</span><span class="not-bold">Compte</span></h1>
					</div>
					<div>
						<p>Inscription</p>
					</div>
				</div>
				<div class="center">
					<div class="input-section">
						<div class="last-name-input-section">
							<label>Nom</label>
							<input v-model="lastName" type="text" name="email" />
						</div>
						<div class="first-name-input-section">
							<label>Prénom</label>
							<input v-model="firstName" type="text" name="email" />
						</div>
						<div class="email-input-section">
							<label>Email</label>
							<input v-model="email" type="text" name="email" />
						</div>
						<div class="password-input-section">
							<label>Mot de passe</label>
							<input v-model="password" type="password" name="password" />
						</div>
					</div>
				</div>
				<div class="bottom">
					<div class="botton-section">
						<button id="button" v-on:click="goBack">Retour</button>
						<button v-on:click="register" type="submit">Valider</button>
					</div>
					<div class="info-section">
						<p class="low-warning">{{ info }}</p>
					</div>
				</div>
			</div>
			<div class="image-container">
				<img src="./assets/fox.webp" alt="Decoration Image" />
			</div>
		</div>
	</body>
</template>

<style scoped>
	.body {
		display: flex;
		height: 100%;
	}

	.register-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
		flex-shrink: 1;
		align-items: center;
	}

	.image-container {
		height: 100%;
		flex-shrink: 0;
		img {
			height: 100%;
			outline-width: 0px;
		}
	}

	.top {
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: end;
		padding: 10px 20px; /* horizontal / vertical */
	}

	.center {
		width: 100%;
		padding: 10px 20px; /* horizontal / vertical */
	}

	.bottom {
		width: 100%;
		height: 12%;
		padding: 10px 20px; /* horizontal / vertical */
	}

	.input-section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;

		div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: start;
			width: 100%;
		}
	}

	.info-section {
		padding: 10px 20px; /* horizontal / vertical */
	}

	.botton-section {
		display: flex;
		justify-content: space-around;
		width: 100%;

		* {
			width: 45%;
		}
	}
</style>
