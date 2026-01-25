<script setup>
import Challenge_Container from "./containers/Challenge_Container.vue";

import { ref } from "vue";
import { reactive } from "vue";
</script>

<template>
	<body>
		<div>
			<h2 v-bind:class="{ 'not-bold' : true }">Active Challenges</h2>
			<div v-bind:class="{ 'horizontal-scroll-container': true }">
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
				<Challenge_Container/>
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
