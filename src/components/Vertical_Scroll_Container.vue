<script setup>
  import { ref } from "vue";
  import { reactive } from "vue";
</script>

<template>
	<div class="vertical-scroll-container">

	</div>
</template>

<style scoped>
  .vertical-scroll-container {
  	display: flex;
  	flex-direction: column;
  	overflow-y: auto;
  }
</style>
