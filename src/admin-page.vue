<script setup lang="ts">
	import * as apiCall from "./utils/apiCall.ts";

	import { type Ref, ref, watch } from "vue";

	const { userData } = defineProps({
		userData: Object,
	});

	const accountId = ref();

	// Check if the user is connected
	watch(
		() => userData,
		(newUserData) => {
			if (newUserData == undefined || newUserData == null) {
				accountId.value = "";
			} else {
				accountId.value = newUserData.id;
			}
		},
		{ immediate: true },
	);

	function formatDate(dateString: Date) {
		if (!dateString) return "";
		const date = new Date(dateString);
		return date.toLocaleDateString("fr-Fr", {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	const title: Ref = ref("");
	const description: Ref = ref("");
	const file: Ref = ref();
	const startDate: Ref = ref("");
	const endDate: Ref = ref("");

	async function fileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target && target.files && target.files.length > 0) {
			file.value = target.files[0];
		}
	}

	async function submit() {
		apiCall.postChallenge(
			title.value,
			description.value,
			file.value,
			startDate.value,
			endDate.value,
			accountId.value,
		);
	}
</script>

<template>
	<body>
		<div class="body">
			<div class="left-container">
				<div class="input-section">
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
						<textarea
							v-model="description"
							type="text"
							name="description"
							style="min-height: 20lh; max-height: 35lh"
						></textarea>
					</div>
					<div class="confirm-button">
						<input @change="fileChange" type="file" />
						<button v-on:click="submit">Ajouter le challenge</button>
					</div>
				</div>
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
