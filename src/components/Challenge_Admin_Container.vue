<script setup>
  import { ref } from "vue";
  import { reactive } from "vue";
</script>

<template>
	<div v-bind:class="{ 'challenge-container': true }">
		<div v-bind:class="{ 'top': true }">
				<h2><span>{{ challenge_name }}</span><span v-bind:class="{ 'not-bold' : true}">Challenges</span></h2>
				<p>Du : {{ beginning_date }} au : {{ ending_date }}, est {{ is_active }}</p>
		</div>
		<div v-bind:class="{ 'center': true }">
				<p>{{ description }}</p>
				<img v-bind:src="image_url" alt="Challenge Theme Image" />
		</div>
		<div v-bind:class="{ 'button-section': true }">
			<button>Voir</button>
			<button>Archiver</button>
		</div>
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

  .button-section {
  	display: flex;
  	justify-content: space-between;

  	* {
  		width: 45%;
  	}
  }
</style>
