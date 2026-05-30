<script setup lang="ts">
	import * as apiCall from "./../utils/apiCall.ts";

	import { onMounted, type Ref, ref, watch } from "vue";
	import {
		type _RouterClassic,
		type RouteLocationNormalizedLoadedGeneric,
		useRoute,
		useRouter,
	} from "vue-router";

	const { userData } = defineProps({
		userData: Object,
	});

	const isHidden = ref(false);

	const account: Ref = ref("");
	const accountId: Ref = ref("");
	const ifDisconect: Ref = ref("");

	// Check if the user is connected
	watch(
		() => userData,
		(newUserData) => {
			if (newUserData == undefined || newUserData == null) {
				account.value = "";
				accountId.value = "";
				ifDisconect.value = "Connectez votre ";
			} else {
				account.value = newUserData.first_name;
				accountId.value = newUserData.id;
				ifDisconect.value = "";
			}
		},
		{ immediate: true },
	);

	const route: RouteLocationNormalizedLoadedGeneric = useRoute();
	const router: _RouterClassic = useRouter();
	const challengeData: Ref = ref({});
	const urlParams: URLSearchParams = new URLSearchParams(
		window.location.search,
	);
	const challengeId: number = Number(urlParams.get("id"));

	// Check page loaded
	onMounted(async () => {
		await router.isReady();
		if (route.path == "/challenge") {
			challengeData.value = await apiCall.getChallenge(challengeId);
		}
		if (route.path == "/login" || route.path == "/register") {
			isHidden.value = true;
		}
	});

	function redirectAccount() {
		document.location.href = "/account";
	}
	function redirectHome() {
		document.location.href = "/";
	}
</script>

<template>
	<div class="header" v-bind:class="{ hidden: isHidden }">
		<div class="hybrid">
			<h1 class="cursor" v-on:click="redirectHome">
				FrameLab
				<div v-if="route.path == '/challenge'">
					<span>{{ challengeData.title }}</span
					><span class="not-bold" v-if="challengeData != null">Challenge</span>
				</div>
			</h1>
			<div v-if="route.path == '/challenge'">
				<img
					v-bind:src="`/uploads${challengeData.photo_url}`"
					alt="Challenge Theme Image"
				/>
			</div>
		</div>

		<div class="=profile-zone, cursor" v-on:click="redirectAccount">
			<h2>
				<span>{{ ifDisconect }}Utilisateur{{ accountId }}</span
				><span class="not-bold">{{ account }}</span>
			</h2>
		</div>
	</div>
</template>

<style scoped>
	.hidden {
		display: none !important;
	}

	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;

		border-bottom-width: 2px;
	}

	.hybrid {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.profile-zone {
		display: flex;
		flex-direction: row;
		justify-content: end;
		text-align: end;
	}

	img {
		display: block;
		height: 96px;

		padding-left: 24px;
	}
</style>
