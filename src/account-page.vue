<script setup lang="ts">
	import * as apiCall from "./utils/apiCall.ts";

	import { type Ref, ref, watch } from "vue";

	const { userData } = defineProps({
		userData: Object,
	});

	// Check if the user is connected
	watch(
		() => userData,
		(newUserData) => {
			if (newUserData == undefined || newUserData == null) {
				document.location.href = "/login";
			} else {
				lastName.value = newUserData.last_name;
				firstName.value = newUserData.first_name;
				email.value = newUserData.email;
				oldEmail.value = newUserData.email;
			}
		},
		{ immediate: true },
	);

	const isValid: Ref = ref("");
	const lastName: Ref = ref("");
	const firstName: Ref = ref("");
	const email: Ref = ref("");
	const oldEmail: Ref = ref("");
	const newPassword: Ref = ref("");
	const currentPassword: Ref = ref("");

	async function submit() {
		if (newPassword.value == null || newPassword.value == "") {
			const data = await apiCall.editUser(lastName.value, firstName.value, email.value, oldEmail.value, currentPassword.value);

			if (data.success == false) {
				isValid.value = data.message;
				return;
			} else {
				isValid.value = "Changement effectué avec succès.";
				return;
			}
		}
		if (newPassword.value !== null && newPassword.value !== "") {
			const data = await apiCall.editUserWithPassword(lastName.value, firstName.value, email.value, oldEmail.value, newPassword.value, currentPassword.value);

			if (data.success == false) {
				if (data.message == "L'adresse email n'existe pas." || data.message == "L'adresse email est déjà utilisé." || data.message == "Le mot de passe est invalide.") {
					isValid.value = data.message;
					return;
				}
				isValid.value = "Oups, quelque chose c'est mal passé !";
				return;
			} else {
				isValid.value = "Changement effectué avec succès.";
				return;
			}
		}

		isValid.value = "Oups, quelque chose c'est mal passé...";
	}

	async function logout() {
		await apiCall.logout();
		document.location.href = "/";
	}
</script>

<template>
	<body>
		<div class="account-container">
			<div class="top">
				<div>
					<h1><span>FrameLab</span><span class="not-bold">Compte</span></h1>
				</div>
				<div>
					<p>Informations</p>
				</div>
			</div>
			<div class="center">
				<div class="input-section">
					<div class="last-name-input-section">
						<label>Nom / Nouveau Nom</label>
						<input v-model="lastName" type="text" name="email" />
					</div>
					<div class="first-name-input-section">
						<label>Prénom / Nouveau Prénom</label>
						<input v-model="firstName" type="text" name="email" />
					</div>
					<div class="email-input-section">
						<label>Email / Nouvelle Email</label>
						<input v-model="email" type="text" name="email" />
					</div>
					<div class="old-password-input-section">
						<label>Mot de passe actuel *</label>
						<input v-model="currentPassword" type="password" name="currentPassword" />
					</div>
					<div class="password-input-section">
						<label>Nouveau Mot de passe</label>
						<input v-model="newPassword" type="password" name="newPassword" />
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="botton-section">
					<button v-on:click="submit" type="submit">Modifier</button>
				</div>
				<div class="botton-section">
					<button v-on:click="logout">Se déconnecter</button>
				</div>
				<div class="is-valid-section">
					<p class="low-warning">{{ isValid }}</p>
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
