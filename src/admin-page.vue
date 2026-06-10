<script setup lang="ts">
	// Import(s)
	import { type Ref, ref, watch, onMounted } from "vue";
	import ChallengeComponent from "./components/challenge-component.vue";
	import ParticipationComponent from "./components/participation-component.vue";
	import * as apiCall from "./utils/apiCall.ts";
	import type { UserData, ServerResponse } from "./utils/apiCall.ts";

	// Set variable(s)
	const { userData } = defineProps<{ userData: UserData }>();
	const accountId: Ref<number | undefined> = ref();
	const title: Ref<string> = ref("");
	const description: Ref<string> = ref("");
	const file: Ref<File | undefined> = ref();
	const startDate: Ref<Date | undefined> = ref();
	const endDate: Ref<Date | undefined> = ref();
	const info: Ref<string> = ref("");
	const challengeData: Ref<any> = ref({});
	const participationsData: Ref<any> = ref([]);
	const challengeStatus: Ref<string> = ref("Chargement...");
	const participationsStatus: Ref<string> = ref("Chargement...");
	const challengeId: Ref<number | undefined> = ref();

	// Check if the user is connected
	watch(
		() => userData,
		(newUserData: any) => {
			if (newUserData == undefined || newUserData == null) {
				accountId.value = undefined;
			} else {
				accountId.value = newUserData.id;
			}
		},
		{ immediate: true },
	);

	// Function(s)
	function formatDate(dateString?: Date) {
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

	async function fileChange(event: Event) {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		if (target && target.files && target.files.length > 0) {
			file.value = target.files[0];
		}
	}

	async function submit() {
		const call: ServerResponse = await apiCall.postChallenge(title.value, description.value, file.value, startDate.value, endDate.value, accountId.value);
		info.value = call.message;
	}

	async function login() {
		document.location.href = "/login";
	}

	function goBack() {
		document.location.href = "/";
	}

	function goBackUser() {
		document.location.href = "/account";
	}

	// Load challenge and participation(s)
	onMounted(async () => {
		challengeData.value = await apiCall.getCurrentChallenge();
		participationsData.value = await apiCall.getParticipationsByChallengeId(challengeData.value.id);
		if (participationsData.value == null || participationsData.value.length == 0) {
			participationsStatus.value = "Aucune participation.";
		}
		if (challengeData.value == null || challengeData.value.length == 0) {
			challengeStatus.value = "Impossible de récupérer le challenge.";
		} else {
			challengeId.value = challengeData.value.id;
		}
	});

	async function challengeViewChange() {
		challengeData.value = await apiCall.getChallenge(challengeId.value);
		participationsData.value = await apiCall.getParticipationsByChallengeId(challengeId.value);
		if (participationsData.value == null || participationsData.value.length == 0) {
			participationsStatus.value = "Aucune participation.";
		}
		if (challengeData.value == null || challengeData.value.length == 0) {
			challengeStatus.value = "Impossible de récupérer le challenge.";
		}
		console.log(challengeData.value);
	}
</script>

<template>
	<body>
		<div v-if="userData" class="account-container admin-div-element">
			<div class="top">
				<div class="center row">
					<div class="column left" style="width: 50%">
						<h2>Ajout challenge</h2>
						<div class="column rm-space">
							<label>Nom du challenge</label>
							<input v-model="title" type="text" name="title" />
						</div>
						<div class="column rm-space">
							<label>Date début</label>
							<input v-model="startDate" type="date" name="startDate" />
						</div>
						<div class="column rm-space">
							<label class="date">{{ formatDate(startDate) }}</label>
							<label>Date fin</label>
							<input v-model="endDate" type="date" name="endDate" />
						</div>
						<div class="column rm-space">
							<label class="date">{{ formatDate(endDate) }}</label>
						</div>
						<div>
							<label>Desciption of the challenge</label>
							<textarea v-model="description" type="text" name="description" style="min-height: 20lh; max-height: 35lh" />
						</div>
						<input v-on:change="fileChange" type="file" />
						<button v-on:click="submit">Ajouter le challenge</button>
						<div class="is-valid-section">
							<p class="low-warning">{{ info }}</p>
						</div>
					</div>
					<div class="column right" style="width: 50%">
						<h2>Moderation participation(s)</h2>
						<div class="column rm-space">
							<label>ChallengeId</label>
							<input v-on:change="challengeViewChange" v-model="challengeId" type="number" />
						</div>
						<div class="column rm-space">
							<label style="padding: 0px 0px 0px 10px">Challenge</label>
							<div v-if="challengeData == null || challengeData.length == 0">{{ challengeStatus }}</div>
							<div v-else><ChallengeComponent v-bind:challenge="challengeData" /></div>
						</div>
						<div class="column rm-space">
							<label style="padding: 0px 0px 0px 10px">Participation(s)</label>
							<div class="column" style="overflow-x: scroll">
								<div v-if="participationsData == null || participationsData.length == 0">{{ participationsStatus }}</div>
								<div v-else v-for="participation in participationsData">
									<ParticipationComponent v-bind:participation="participation" v-bind:userData="userData" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="row">
					<button v-on:click="goBackUser">Retour</button>
				</div>
			</div>
		</div>
		<div v-else class="issue">
			<span>Êtes vous connectez ?</span>
			<div class="row">
				<button v-on:click="goBack">Retour</button>
				<button v-on:click="login">Me connectez</button>
			</div>
		</div>
	</body>
</template>

<style scoped>
	.account-container {
		height: 100%;
	}

	.top {
		height: 95%;
		overflow: scroll;
	}

	.bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5%;
	}

	.row {
		width: 100%;
		height: min-content;
	}

	.issue {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>
