<script setup lang="ts">
	import * as apiCall from "./utils/apiCall";

	import { type Ref, ref } from "vue";

	const link = location.href;
	const linkEmail = link.substring(link.indexOf("?") + 7);

	const isValid: Ref = ref("");
	const lastName: Ref = ref("");
	const firstName: Ref = ref("");
	const email: Ref = ref("");
	const password: Ref = ref("");

	if (link.indexOf("?") !== -1) {
		email.value = linkEmail;
	}

	interface RegisterResponse {
		success?: boolean;
		message?: string;
	}

	async function submit() {
		const data: RegisterResponse = await apiCall.register(
			lastName.value,
			firstName.value,
			email.value,
			password.value,
		);

		isValid.value = "";

		if (data.success == false) {
			if (data.message == "Le format de l'adresse email est invalide.") {
				isValid.value = data.message;
				return;
			}
		}

		if (data.success == false) {
			if (
				data.message ==
				"Le mot de passe doit faire au moins 8 caractères de long et inclure une majuscule, un minuscule, un chiffre, et un caractère speciale (#?!@$%^&*-.,)"
			) {
				isValid.value = data.message;
				return;
			}
		}

		if (data.success == false) {
			isValid.value = "Oups, quelque chose c'est mal passé !";
			return;
		}

		document.location.href = "/";
	}
	function goBack() {
		document.location.href = "/";
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
						<button v-on:click="submit" type="submit">Valider</button>
					</div>
					<div class="is-valid-section">
						<p class="low-warning">{{ isValid }}</p>
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

	.image-container {
		img {
			height: 100%;
			aspect-ratio: 1;
		}
	}

	.register-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		width: 100%;
		align-items: center;
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

	.is-valid-section {
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
