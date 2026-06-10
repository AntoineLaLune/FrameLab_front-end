<script setup lang="ts">
	// Import(s)
	import { onMounted, type Ref, type ComputedRef, ref, computed } from "vue";
	import { type _RouterClassic, type RouteLocationNormalizedLoadedGeneric, useRoute, useRouter } from "vue-router";
	import * as apiCall from "./../utils/apiCall.ts";
	import type { UserData } from "./../utils/apiCall";

	// Set variable(s)
	const { userData } = defineProps<{ userData: UserData | undefined }>();
	const account: ComputedRef<string> = computed(() => {
		if (!userData) return "";
		return userData.first_name;
	});
	const accountId: ComputedRef<number> = computed(() => {
		if (!userData) return -1;
		return userData.id;
	});
	const isDisconect: ComputedRef<boolean> = computed(() => {
		if (!userData) return true;
		return false;
	});
	const isHidden: Ref<boolean> = ref(false);

	// Load challengeId from params
	const url: URL = new URL(location.href);
	const challengeId: number = Number(url.searchParams.get("id"));

	const challengeData: Ref<any> = ref({});
	// Check page loaded
	const route: RouteLocationNormalizedLoadedGeneric = useRoute();
	const router: _RouterClassic = useRouter();
	onMounted(async () => {
		await router.isReady();
		if (route.path == "/challenge") {
			challengeData.value = await apiCall.getChallenge(challengeId);
		}
		if (route.path == "/login" || route.path == "/register" || route.path == "/account" || route.path == "/admin") {
			isHidden.value = true;
		}
	});

	// Function(s)
	function redirectAccount() {
		if (!isDisconect.value) {
			document.location.href = "/account";
		} else {
			document.location.href = "/login";
		}
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
				<img v-bind:src="`${challengeData.photo_url}`" alt="Challenge Theme Image" />
			</div>
		</div>

		<div class="=profile-zone, cursor" v-on:click="redirectAccount">
			<h2 v-if="!isDisconect">
				<span>Utilisateur{{ accountId }}</span
				><span class="not-bold">{{ account }}</span>
			</h2>
			<h2 v-else>
				<span class="not-bold">Non connecté</span>
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

		margin-left: 24px;
	}
</style>
