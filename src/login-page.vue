<script setup lang="ts">
	import * as apiCall from "./utils/apiCall";

	import { type Ref, ref } from "vue";

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

	const isValid: Ref = ref("");
	const email: Ref = ref("");
	const password: Ref = ref("");

	document.addEventListener("keypress", logKey);

	function logKey(e: KeyboardEvent) {
		if (e.key == "Enter") {
			login();
		}
	}

	async function login() {
		const data: LoginResponse = await apiCall.login(
			email.value,
			password.value,
		);

		if (data.success == false) {
			if (data.message == "L'adresse email n'existe pas.") {
				document.location.href = "/register?email=" + email.value;
				return;
			} else {
				isValid.value = data.message;
				return;
			}
		}
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
							<input
								id="email_input"
								v-model="email"
								type="text"
								name="email"
							/>
						</div>
						<div class="password-input-section">
							<label>Mot de passe</label>
							<input
								id="password_input"
								v-model="password"
								type="password"
								name="password"
							/>
						</div>
					</div>
				</div>
				<div class="bottom">
					<div class="botton-section">
						<button id="button" v-on:click="login" type="submit">
							Valider
						</button>
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
		justify-content: space-between;
		height: 100%;
	}

	.image-container {
		img {
			height: 100%;
			aspect-ratio: 1;
		}
	}

	.login-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		align-items: center;
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

		.password-input-section {
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
