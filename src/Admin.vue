<script setup>
  import { ref } from "vue";
  import { reactive } from "vue";
  import Challenge_Admin_Container from "./components/Challenge_Admin_Container.vue";

  import * as apiCall from "./utils/apiCall.ts";

  function formatDate(dateString) {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-Fr', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const title = ref("");
  const description = ref("");
  const file = ref("");
  const startDate = ref("");
  const endDate = ref("");
  let creatorId;

  async function fileChange(event) {
  	file.value = event.target.files[0]; // Prend "file" du event lisener déclangé
  }

  async function submit() {
  	const data = await apiCall.getSession();

  	creatorId = data.id;

  	apiCall.postChallenge(title.value, description.value, file.value, startDate.value, endDate.value, creatorId);
  }
</script>

<template>
	<body>
		<div v-bind:class="{ 'body' : true}">
			<div v-bind:class="{ 'left-container' : true}">
				<div v-bind:class="{ 'input-section' : true }">
					<div>
						<label>Nom du challenge</label>
						<input v-model="title" type="text" name="title" />
						<label>Date début</label>
						<input v-model="startDate" type="date" name="startDate" />
						<label class="date">{{ formatDate(startDate) }}</label>
						<label>Date fin</label>
						<input v-model="endDate" type="date" name="endDate" />
						<label class="date">{{ formatDate(endDate) }}</label>
					</div>
					<div>
						<label>Desciption of the challenge</label>
						<textarea v-model="description" type="text" name="description"
						style="min-height: 20lh; max-height: 35lh"></textarea>
					</div>
					<div v-bind:class="{ 'confirm-button' : true }">
						<input @change="fileChange" type="file"></input>
						<button v-on:click="submit">Ajouter le challenge</button>
					</div>
				</div>
			</div>
			<div v-bind:class="{ 'right-container' : true}">
				<Challenge_Admin_Container/> <!-- À FAIRE -->
				<Challenge_Admin_Admin_Container/> <!-- À FAIRE -->
				<Challenge_Container/> <!-- À FAIRE -->
				<Challenge_Admin_Container/> <!-- À FAIRE -->
				<Challenge_Admin_Container/> <!-- À FAIRE -->
				<Challenge_Admin_Container/> <!-- À FAIRE -->
				<Challenge_Admin_Container/> <!-- À FAIRE -->
			</div>
		</div>
	</body>
</template>

<style scoped>
  .body {
  	display: flex;
  	height: 100%;
  }

  .right-container {
  	height: 100%;
  	width: 50%;
  	padding: 10px 20px;
  	* {
  		margin-block: 10px;
  	}
  }

  .left-container {
  	display: flex;
  	flex-direction: column;
  	justify-content: center;
  	height: 100%;
  	width: 50%;
  	align-items: center;
  	padding: 10px 20px;
  	text-align: center;
  }

  .input-section {

  	width: 100%;

  	* {
  		display: flex;
  		flex-direction: column;
  		justify-content: center;
  		text-align: start;
  		width: 100%;
  	}

  }

  .confirm-button {
  	padding: 10px 0px; /* horizontal / vertical */
  	* {
  		margin-block: 5px;
  	}
  }

</style>
