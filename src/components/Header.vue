<script setup>
import { ref } from "vue";

const account = ref("");
const accountId = ref("");
const ifDisconect = ref("");

window.onload = async function() { // Check si un compte est connecté
	const response = await fetch("/api/auth/session", {
		method: "GET",
		headers: { 'Content-Type' : "application/json" },
	}); const data = await response.json();

	if (data.success == false) {
		account.value = "";
		accountId.value = "";
		ifDisconect.value = "Connectez votre ";
	} else {
		account.value = data.first_name;
		accountId.value = data.id;
		ifDisconect.value = "";
	}
}

function redirectAccount() {
	document.location.href="/account";
}
function redirectHome() {
	document.location.href="/";
}
</script>

<template>
	<div class="header">
		<h1 v-bind:class="{ 'cursor' : true }" v-on:click="redirectHome">FrameLab</h1>
		<div v-bind:class="{ 'profile-zone' : true, 'cursor' : true }" v-on:click="redirectAccount">
				<h2><span>{{ ifDisconect }}Utilisateur{{ accountId }}</span><span v-bind:class="{ 'not-bold' : true }">{{ account }}</span></h2>
		</div>
	</div>
</template>

<style scoped>
.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;

		border-bottom-width: 2px;
}

.profile-zone {
		display: flex;
		justify-content: end;
		text-align: end;
}
</style>