<script setup lang="ts">
	// Import(s)
	import { type Ref, ref } from "vue";
	import * as apiCall from "./utils/apiCall";

	// Set interface(s)
	interface LoginResponse {
		success?: boolean;
		data?: {
			id: number;
			email: string;
			last_name: string;
			first_name: string;
			is_admin: number;
			inscription_date: Date;
		};
		message?: string;
	}

	// Set variable(s)
	const email: Ref = ref("");
	const password: Ref = ref("");
	const info: Ref = ref("");

	// Load email from params
	const url: URL = new URL(location.href);
	const linkEmail = url.searchParams.get("email");
	if (linkEmail) {
		email.value = linkEmail;
	}

	// Launch login when enter
	document.addEventListener("keypress", logKey);
	function logKey(e: KeyboardEvent) {
		if (e.key == "Enter") {
			login();
		}
	}

	// Function(s)
	async function login() {
		const data: LoginResponse = await apiCall.login(email.value, password.value);

		if (data.success == false) {
			if (data.message == "L'adresse email n'existe pas.") {
				document.location.href = "/register?email=" + email.value;
				return;
			} else {
				info.value = data.message;
				return;
			}
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
						<button id="button" v-on:click="goBack">Retour</button>
						<button id="button" v-on:click="login" type="submit">Valider</button>
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

	.login-container {
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
		height: 12%;
		padding: 10px 20px; /* horizontal / vertical */
	}

	.bottom {
		width: 100%;
		height: 12%;
		padding: 10px 20px; /* horizontal / vertical */
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

		.password-input-section {
			width: 45%;
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
