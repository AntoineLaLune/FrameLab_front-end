<script setup>
import Challenge_Container from "./containers/Challenge_Container.vue";
import Participation_Container from "./containers/Participation_Container.vue";

import { onMounted, ref } from "vue";
import { reactive } from "vue";

const currentChallenge = ref(null)
const archiveChallenge = ref(null)
onMounted(async()=>{
	// Current
	const currentResponse = await fetch("/api/challenge/current")
	const currentData = await currentResponse.json();
	currentChallenge.value = currentData.challenge;
	// Archive
	const archiveResponse = await fetch("/api/challenge/archive")
	const archiveData = await archiveResponse.json();
	archiveChallenge.value = archiveData.challenge;
})
</script>

<template>
	<body>
		
		<!-- Challenge Actuel -->
		<h2 v-bind:class="{ 'not-bold' : true }">
			Le challenge actuel ainsi que les participations
		</h2>
		<div v-if="currentChallenge" v-bind:class="{ 'challenge-container': true, 'horizontal-scroll-container' : true }">
			<Challenge_Container v-bind:challenge="currentChallenge"/>
			<Participation_Container/>
		</div>
		<div v-else v-bind:class="{ 'challenge-container': true }">
			<p>Chargement...</p>
		</div>
		
		<!-- Ancien Challenges -->
		<h2 v-bind:class="{ 'not-bold' : true }">
			Les anciens challenges ainsi que de quelques participations
		</h2>
		<div v-if="archiveChallenge" v-for="challenge in archiveChallenge" v-bind:key="challenge.id" class="horizontal-scroll-container">
			<Challenge_Container v-bind:challenge="challenge"/>
		</div>
		<div v-else>
			<p>Chargement...</p>
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
}

.vertical-scroll-container {
	display: flex;
	flex-direction: column;

	padding: 10px 20px;
}
</style>
