<script setup>
import { ref } from "vue";
import { reactive } from "vue";

const props = defineProps(["challenge"]);
</script>

<template>
	<div v-if="challenge" v-bind:class="{ 'challenge-container': true }">
		<div v-bind:class="{ 'top': true }">
				<h2><span>{{ challenge.title }}</span><span v-bind:class="{ 'not-bold' : true}">Challenges</span></h2>
				<p>Du : {{ challenge.start_date }} au : {{ challenge.end_date }}</p>
		</div>
		<div v-bind:class="{ 'center': true }">
				<p>{{ challenge.description }}</p>
				<img v-bind:src="`/uploads${challenge.photo_url}`" alt="Challenge Theme Image" />
		</div>
		<button>Voir</button>
	</div>
	<div v-else v-bind:class="{ 'challenge-container': true }">
		<p>Chargement...</p>
	</div>
</template>

<style scoped>
.challenge-container {
		padding: 10px 20px;
		border-width: 2px;
}

.top {
		text-align: start;
}

.center {
		display: flex;
		justify-content: center;
		text-align: center;
}
</style>

