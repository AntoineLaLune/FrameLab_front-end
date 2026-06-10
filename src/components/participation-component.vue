<script setup lang="ts">
	// Import(s)
	import { onMounted, type Ref, ref } from "vue";
	import * as apiCall from "./../utils/apiCall.ts";
	import type { UserData, Votes, VotesResponse, ServerResponse } from "./../utils/apiCall.ts";

	// Set variable(s)
	const { userData, participation } = defineProps<{
		userData: UserData | undefined;
		participation: any;
	}>();
	const creativityNote: Ref<number> = ref(0);
	const technicalNote: Ref<number> = ref(0);
	const respectThemeNote: Ref<number> = ref(0);
	const info: Ref<string> = ref<string>("");
	const hasVotes: Ref<boolean> = ref(false);
	const isVoted: Ref<boolean> = ref(false);
	const validNoteNumber: Array<number> = [1, 2, 3, 4, 5];
	const isDeleted: Ref<boolean> = ref(false);

	// Function(s)
	function checkNoteNumber(note: number) {
		for (let i = 0; i < validNoteNumber.length; i++) {
			if (note == validNoteNumber[i]) {
				info.value = "";
				return;
			}
		}
		info.value = "La note doit être comprise entre 1 et 5.";
	}

	onMounted(async () => {
		await getVote(participation);
	});

	async function getVote(participation: Record<string, any> | undefined) {
		if (!participation) return;

		if (participation.id !== undefined) {
			try {
				const votes: Votes | undefined = await apiCall.getVote(participation.id);
				if (votes !== undefined) {
					creativityNote.value = Math.round(votes.creativityNote * 100) / 100;
					technicalNote.value = Math.round(votes.technicalNote * 100) / 100;
					respectThemeNote.value = Math.round(votes.respectThemeNote * 100) / 100;
					hasVotes.value = votes.hasVotes;
					isVoted.value = true;
				}
			} catch (error) {
				console.error("Erreur lors de la récupération des votes :", error);
			}
		}
	}

	async function refresh() {
		if (participation !== undefined) {
			participation.value = await apiCall.getParticipation(participation.id);
			await getVote(participation);
		}
	}

	async function submitVote() {
		if (participation !== undefined) {
			const call: VotesResponse | undefined = await apiCall.postVote(participation.id, creativityNote.value, technicalNote.value, respectThemeNote.value);
			if (!call?.success && call?.message) {
				info.value = call?.message;
			} else {
				await refresh();
				info.value = "";
			}
		} else {
			info.value = "Une erreur est survenue à l'envoie de votre vote";
		}
	}

	async function remove() {
		if (participation !== undefined) {
			const call: ServerResponse | undefined = await apiCall.removeParticipation(participation.id);
			if (call.success) {
				isDeleted.value = true;
			}
		}
	}
</script>

<template>
	<body v-bind:class="{ hide: isDeleted }">
		<div v-if="participation" class="participation-container">
			<div class="top">
				<h2>
					<span>{{ participation.first_name }}{{ participation.user_id }}</span
					><span class="not-bold">Participation</span>
				</h2>
				<p>Date de mise en ligne : {{ participation.created }}</p>
			</div>
			<div class="center">
				<div
					v-bind:class="{
						'image-section': !isVoted,
						'image-section-vote': isVoted,
					}"
				>
					<img v-bind:src="`${participation.photo_url}`" alt="Image de la participation" />
					<div v-if="isVoted && hasVotes" class="participation-vote-section">
						<span>Créativité: {{ creativityNote }} | Technique: {{ technicalNote }} | Respect: {{ respectThemeNote }}</span>
					</div>
					<div v-if="isVoted && !hasVotes" class="participation-vote-section">
						<p style="font-style: italic">Votre participation n'a pas encore reçu de vote</p>
					</div>
				</div>
				<div v-if="!isVoted">
					<div class="user-vote-section">
						<div class="single-vote-section">
							<label> Créativité </label>
							<input v-model="creativityNote" v-on:input="checkNoteNumber(creativityNote)" name="Votez de 1 à 5" type="number" maxlength="1" min="1" max="5" />
						</div>
						<div class="single-vote-section">
							<label> Technique </label>
							<input v-model="technicalNote" v-on:input="checkNoteNumber(technicalNote)" name="Votez de 1 à 5" type="number" maxlength="1" min="1" max="5" />
						</div>
						<div class="single-vote-section">
							<label> Respect </label>
							<input v-model="respectThemeNote" v-on:input="checkNoteNumber(respectThemeNote)" name="Votez de 1 à 5" type="number" maxlength="1" min="1" max="5" />
						</div>
					</div>
					<div>
						<button v-on:click="submitVote">Je vote</button>
					</div>
					<p class="low-warning">{{ info }}</p>
				</div>
			</div>
			<div class="bottom column">
				<button>Voir les commentaires</button>
				<button v-if="userData && userData.is_admin" v-on:click="remove" class="admin-element">Retirer</button>
			</div>
		</div>
		<div v-else class="participation-container">
			<p>Chargement...</p>
		</div>
	</body>
</template>

<style scoped>
	.participation-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		height: calc(100% - 20px);

		padding: 10px 20px;
		border-width: 2px;

		margin: 10px;
	}

	.top {
		text-align: start;
		padding: 10px 0px; /* horizontal / vertical */
	}

	.center {
		justify-content: center;
		padding: 20px 0px; /* horizontal / vertical */

		width: fit-content;
		height: fit-content;
	}

	.bottom {
		display: flex;
		flex-direction: column;
		justify-content: end;
		height: 100%;
	}

	.image-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 0px; /* horizontal / vertical */
	}

	.image-section-vote {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 0px; /* horizontal / vertical */
	}

	.user-vote-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		bottom: 0;
		padding: 10px 0px; /* horizontal / vertical */
	}

	.participation-vote-section {
		height: 100%;
		padding: 10px 0px; /* horizontal / vertical */
	}

	.single-vote-section {
		display: flex;
		flex-direction: column;
		align-items: start;
		margin-inline: 10px;
	}

	img {
		max-width: 512px;
		max-height: 512px;
	}
</style>
