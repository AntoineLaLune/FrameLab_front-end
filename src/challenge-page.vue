<script setup lang="ts">
	// Import(s)
	import { onMounted, type Ref, ref } from "vue";
	import ParticipationComponent from "./components/participation-component.vue";
	import * as apiCall from "./utils/apiCall.ts";
	import type { UserData } from "./utils/apiCall.ts";

	// Set variable(s)
	const { userData } = defineProps<{ userData: UserData | undefined }>();
	let userId: number | undefined = undefined; // @TODO Fix duplicate
	const userParticipation: Ref<any> = ref(undefined);
	const userParticipationStatus: Ref<string> = ref("Chargement...");
	const challengeData: Ref<any> = ref({});
	const participationsData: Ref<Array<any>> = ref([]);
	const challengeStatus: Ref<string> = ref("Chargement...");
	const participationsStatus: Ref<string> = ref("Chargement...");
	const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
	const challengeId: number = Number(urlParams.get("id"));

	// Load participations
	onMounted(async () => {
		// User
		if (userData != undefined) {
			userParticipation.value = await apiCall.getUserParticipation(userData.id, challengeId);
			if (userParticipation.value == undefined || userParticipation.value == null) {
				userParticipationStatus.value = "Vous n'avez pas participé.";
			}
		} else {
			userParticipationStatus.value = "Vous devez être connecté.";
		}

		// Users
		challengeData.value = await apiCall.getChallenge(challengeId);
		participationsData.value = await apiCall.getParticipationsByChallengeId(challengeId);
		if (participationsData.value == null || participationsData.value.length == 0) {
			participationsStatus.value = "Aucune participation.";
		}
		if (challengeData.value == undefined || challengeData.value.length == 0) {
			challengeStatus.value = "Impossible de récupérer le challenge.";
		}
	});
</script>

<template>
	<body>
		<!-- User Participation -->
		<h2 class="not-bold">Votre participation</h2>
		<div class="horizontal-scroll-container" style="justify-content: center" v-if="userParticipation">
			<ParticipationComponent v-bind:participation="userParticipation" v-bind:userData="userData" />
		</div>
		<div class="horizontal-scroll-container" style="justify-content: center" v-else>
			<p>{{ userParticipationStatus }}</p>
		</div>
		<!-- Participations -->
		<div>
			<h2 class="not-bold">Participation(s)</h2>
			<div class="horizontal-scroll-container" v-if="participationsData != null">
				<div v-for="participation in participationsData">
					<ParticipationComponent v-if="participation.user_id != userId" v-bind:participation="participation" v-bind:userData="userData" />
					<!-- @TODO Fix duplicate -->
				</div>
			</div>
			<div v-else>
				<p>{{ participationsStatus }}</p>
			</div>
		</div>
	</body>
</template>

<style scoped>
	h2 {
		padding: 10px 20px;
		text-align: center;
	}

	.horizontal-scroll-container {
		display: flex;
		overflow-x: scroll;

		padding: 10px 20px;

		* {
			margin-right: 10px !important;
		}
	}
</style>
