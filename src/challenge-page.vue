<script setup lang="ts">
	// Import(s)
	import { onMounted, type Ref, ref, watch } from "vue";
	import ParticipationComponent from "./components/participation-component.vue";
	import * as apiCall from "./utils/apiCall.ts";
	import type { UserData } from "./utils/apiCall.ts";

	// Set variable(s)
	const userData: UserData | undefined = defineProps();
	const userId: Ref<number> = ref(-1);
	const userParticipation: Ref<any> = ref({});
	const userParticipationStatus: Ref<string> = ref("Chargement...");
	const challengeData: Ref<any> = ref({});
	const participationsData: Ref<Array<any>> = ref([]);
	const challengeStatus: Ref<string> = ref("Chargement...");
	const participationsStatus: Ref<string> = ref("Chargement...");
	const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
	const challengeId: number = Number(urlParams.get("id"));

	// Get the user id, and load the user participation
	watch(
		() => userData,
		async (newUserData) => {
			if (newUserData.id != undefined && newUserData.id != null) {
				userId.value = newUserData.id;
			}
			userParticipation.value = await apiCall.getUserParticipation(userId.value, challengeId);
			if (userParticipation.value == undefined || userParticipation.value == null) {
				userParticipationStatus.value = "Vous n'avez pas participé.";
			}
		},
		{ immediate: true },
	);

	// Load participations
	onMounted(async () => {
		challengeData.value = await apiCall.getChallenge(challengeId);
		participationsData.value = await apiCall.getParticipationsByChallengeId(challengeId);
		if (participationsData.value == null || participationsData.value.length == 0) {
			participationsStatus.value = "Aucune participation.";
		}
		if (challengeData.value == null || challengeData.value.length == 0) {
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
