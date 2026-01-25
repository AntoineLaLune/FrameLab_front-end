<script setup>
import { ref } from "vue";
import { reactive } from "vue";

const isValid = ref("");
const creativityNote = ref(1);
const technicalNote = ref(1);
const respectNote = ref(1);

const validNoteNumber = [1, 2, 3, 4, 5];

function checkNoteNumber(note) {
		for (let i = 0; i < validNoteNumber.length; i++) {
				console.log(note);
				console.log(note == validNoteNumber[i]);
				if (note == validNoteNumber[i]) {
						isValid.value = "";
						return;
				}
		}
		isValid.value = "La note doit être comprise entre 1 et 5.";
}

</script>

<template>
	<div v-bind:class="{ 'participation-container': true }">
		<div v-bind:class="{ 'top': true }">
			<h2><span>{{ userParticipationName }}</span><span v-bind:class="{ 'not-bold' : true}">Participation</span></h2>
			<p>Date de mise en ligne : {{ submissionDate }}</p>
		</div>
		<div v-bind:class="{ 'center': true }">
			<div v-bind:class="{ 'image-section': true }">
				<img v-bind:src="imageUrl" alt="User Participation Image" />
				<p>{{ note }}</p>
			</div>
			<div v-bind:class="{ 'user-vote-section': true }">
				<div v-bind:class="{ 'vote-section': true }">
					<div v-bind:class="{ 'single-vote-section': true }">
						<label>
							<input v-bind:class="{ 'text-center' : true }" v-model="creativityNote" v-on:input="checkNoteNumber(creativityNote)" name="Votez de 1 à 5" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
							Créativité
						</label>
					</div>
					<div v-bind:class="{ 'single-vote-section': true }">
						<label>
							<input v-bind:class="{ 'text-center' : true }" v-model="technicalNote" v-on:input="checkNoteNumber(technicalNote)" name="Votez de 1 à 5" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
							Technique
						</label>
					</div>
					<div v-bind:class="{ 'single-vote-section': true }">
						<label>
							<input v-bind:class="{ 'text-center' : true }" v-model="respectNote" v-on:input="checkNoteNumber(respectNote)" name="Votez de 1 à 5" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
							Respect
						</label>
					</div>
				</div>
				<p class="low-warning">{{ isValid }}</p>
				<div>
					<button>Je vote</button>
				</div>
			</div>
		</div>
		<div v-bind:class="{ 'bottom': true }">
			<button>Voir les commentaires</button>
		</div>
	</div>
</template>

<style scoped>
.participation-container {
	padding: 10px 20px;
	border-width: 2px;
	margin-top: 8px;
}

.top {
	text-align: start;
	padding: 10px 0px; /* horizontal / vertical */
}

.center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding: 10px 0px; /* horizontal / vertical */
}

.vote-section {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	bottom: 0;
	padding: 10px 0px; /* horizontal / vertical */
}

.single-vote-section {
	align-items: center;
	margin-inline: 10px;
}
</style>
