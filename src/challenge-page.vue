<script setup lang="ts">
	import ParticipationComponent from "./components/participation-component.vue";

	import * as apiCall from "./utils/apiCall.ts";

	import { onMounted, type Ref, ref, watch } from "vue";

	const { userData } = defineProps({
		userData: Object,
	});

	const userId: Ref = ref(-1);
	const userParticipation: Ref = ref({});
	const userParticipationStatus: Ref = ref("Chargement...");

	// Get the user id, and load the user participation
	watch(
		() => userData,
		async (newUserData) => {
			if (newUserData != undefined && newUserData != null) {
				userId.value = newUserData.id;
			}

			userParticipation.value = await apiCall.getUserParticipation(userId.value, challengeId);
			if (userParticipation.value == null) {
				userParticipationStatus.value = "Vous n'avez pas participé.";
			}
		},
		{ immediate: true },
	);

	const challengeData: Ref = ref({});
	const participationsData: Ref = ref([]);
	const challengeStatus: Ref = ref("Chargement...");
	const participationsStatus: Ref = ref("Chargement...");

	const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
	const challengeId: number = Number(urlParams.get("id"));

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
			<ParticipationComponent v-bind:participation="userParticipation" />
		</div>
		<div class="horizontal-scroll-container" style="justify-content: center" v-else>
			<p>{{ userParticipationStatus }}</p>
		</div>
		<!-- Participations -->
		<div>
			<h2 class="not-bold">Participation(s)</h2>
			<div class="horizontal-scroll-container" v-if="participationsData != null">
				<div v-for="participation in participationsData">
					<ParticipationComponent v-if="participation.user_id != userId" v-bind:participation="participation" />
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
