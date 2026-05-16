<script setup>
  import { ref } from "vue";

  defineProps(["participation"]);

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

	<div class="participation-container">
		<div class="top">
			<h2><span>{{ participation.first_name }}{{ participation.user_id }}</span><span class="not-bold">Participation</span></h2>
			<p>Date de mise en ligne : {{ participation.created }}</p>
		</div>
		<div class="center">
			<div class="image-section">
				<img v-bind:src="`/uploads${participation.photo_url}`" alt="User Participation Image" />
				<!--p>{{ note }}</p-->
			</div>
			<div class="user-vote-section">
				<div class="vote-section">
					<div class="single-vote-section">
						<label>
							<input class="text-center" v-model="creativityNote" v-on:input="checkNoteNumber(creativityNote)" name="Votez de 1 à 5" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
							Créativité
						</label>
					</div>
					<div class="single-vote-section">
						<label>
							<input class="text-center" v-model="technicalNote" v-on:input="checkNoteNumber(technicalNote)" name="Votez de 1 à 5" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
							Technique
						</label>
					</div>
					<div class="single-vote-section">
						<label>
							<input class="text-center" v-model="respectNote" v-on:input="checkNoteNumber(respectNote)" name="Votez de 1 à 5" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
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
		<div class="bottom">
			<button>Voir les commentaires</button>
		</div>
	</div>

</template>



<style scoped>

  .participation-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height:100%;

    padding: 10px 20px;
    border-width: 2px;

    margin: 10px;
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

  img {
    display: block;
    max-width: 512px;
    max-height: 512px;
  }

</style>
