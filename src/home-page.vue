<script setup lang="ts">
	// Import(s)
	import { onMounted, type Ref, ref } from "vue";
	import ChallengeComponent from "./components/challenge-component.vue";
	import * as apiCall from "./utils/apiCall.ts";

	// Set variable(s)
	const currentChallengeData: Ref<Array<any>> = ref([]);
	const archiveChallengesData: Ref<Array<any>> = ref([]);
	const currentStatus: Ref<string> = ref("Chargement...");
	const archiveStatus: Ref<string> = ref("Chargement...");

	// Load Challenge(s)
	onMounted(async () => {
		currentChallengeData.value = await apiCall.getCurrentChallenge();
		archiveChallengesData.value = await apiCall.getArchivesChallenges();

		if (currentChallengeData.value == null || currentChallengeData.value.length == 0) {
			currentStatus.value = "Aucun challenge actuel disponible.";
		} else {
			currentStatus.value = "";
		}

		if (archiveChallengesData.value == null || archiveChallengesData.value.length == 0) {
			archiveStatus.value = "Aucun ancian challenge disponible.";
		} else {
			archiveStatus.value = "";
		}
	});
</script>

<template>
	<body>
		<!-- Challenge Actuel -->
		<h2 class="not-bold">Le challenge actuel</h2>
		<div v-if="currentChallengeData != null">
			<div class="horizontal-scroll-container">
				<ChallengeComponent v-bind:challenge="currentChallengeData" />
			</div>
		</div>
		<div v-else>
			<p>{{ currentStatus }}</p>
		</div>

		<!-- Anciens Challenges -->
		<h2 class="not-bold">Les anciens challenges</h2>
		<div class="horizontal-scroll-container" v-if="archiveChallengesData != null">
			<div v-for="challenge in archiveChallengesData" v-bind:key="challenge.id">
				<ChallengeComponent v-bind:challenge="challenge" />
			</div>
		</div>
		<div v-else>
			<p>{{ archiveStatus }}</p>
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
		flex-direction: row;
		justify-content: space-evenly;

		overflow-y: hidden;
	}

	.vertical-scroll-container {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		overflow-y: scroll;
	}
</style>
