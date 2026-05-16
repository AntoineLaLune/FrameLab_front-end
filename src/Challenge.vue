<script setup>

  import Participation_Container from "./components/Participation_Container.vue";

  import * as apiCall from "./utils/apiCall.ts";

  import { onMounted, ref } from "vue";

  const challengeData = ref({});
  const participationsData = ref([]);
  const challengeStatus = ref("Chargement...");
  const participationsStatus = ref("Chargement...");

  const urlParams = new URLSearchParams(window.location.search);
  const challengeId = urlParams.get('id');
  onMounted(async () => {
    challengeData.value = await apiCall.getChallenge(challengeId);
    participationsData.value = await apiCall.getParticipationsByChallengeId(challengeId);

    if (participationsData.value == null || participationsData.value.length == 0) {
      participationsStatus.value = "Aucune participation.";
    }
    if (challengeData.value == null || challengeData.value.length == 0) {
      challengeStatus.value = "Impossible de récupérer le challenge.";
    }
  });

</script>



<template>

  <body>
    <!-- User Participation -->
    <h2 class="not-bold">Ta participation</h2>

    <!-- Participations -->
    <div>
      <h2 class="not-bold">Participation(s)</h2>
      <div class="horizontal-scroll-container" v-if="participationsData != null">
        <div
          v-for="participation in participationsData"
          v-bind:key="participation.id"
        >
          <Participation_Container v-bind:participation="participation" />
        </div>
      </div>
      <div v-else>
        <p>{{ participationsStatus }}</p>
      </div>
    </div>
  </body>

</template>



<style scoped>

  h2 {
    padding: 10px 20px;
    text-align: center;
  }

  .horizontal-scroll-container {
    display: flex;
    overflow-x: scroll;

    padding: 10px 20px;

    * {
      margin-right: 10px !important;
    }
  }

</style>
