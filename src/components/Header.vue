<script setup>

  import { ref } from "vue";

  const account = ref("");
  const accountId = ref("");
  const ifDisconect = ref("");

  import * as apiCall from "./../utils/apiCall.ts";
  import { onMounted } from "vue";
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const challengeData = ref({});
  const urlParams = new URLSearchParams(window.location.search);
  const challengeId = urlParams.get('id');

  onMounted(async () => {
    // Check if the user is connected
  	const data = await apiCall.getSession();
   console.log(data)
  	if (data == undefined) {
  		account.value = "";
  		accountId.value = "";
  		ifDisconect.value = "Connectez votre ";
  	} else {
  		account.value = data.first_name;
  		accountId.value = data.id;
  		ifDisconect.value = "";
  	}

    // Check if the Challenge page is loaded
    await router.isReady();
    if (route.path == "/challenge") {
      challengeData.value = await apiCall.getChallenge(challengeId);
    }
  });

  function redirectAccount() {
 	document.location.href="/account";
  }
  function redirectHome() {
 	document.location.href="/";
  }

</script>



<template>

	<div class="header">
	  <div class="hybrid">
		  <h1 class="cursor" v-on:click="redirectHome">FrameLab
				<div v-if="route.path == '/challenge'">
  		  <span>{{ challengeData.title }}</span><span class="not-bold" v-if="challengeData != null">Challenge</span>
				</div>
			</h1>
  		<div v-if="route.path == '/challenge'">
    		<img v-bind:src="`/uploads${challengeData.photo_url}`" alt="Challenge Theme Image" />
      </div>
		</div>

		<div class="=profile-zone, cursor" v-on:click="redirectAccount">
				<h2><span>{{ ifDisconect }}Utilisateur{{ accountId }}</span><span v-bind:class="{ 'not-bold' : true }">{{ account }}</span></h2>
		</div>
	</div>

</template>



<style scoped>

  .header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;

		border-bottom-width: 2px;
  }

  .hybrid{
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
