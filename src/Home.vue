<script setup>
import Challenge_Container from "./components/Challenge_Container.vue";
import Participation_Container from "./components/Participation_Container.vue";

import * as apiCall from "./utils/apiCall.ts";

import { onMounted, ref } from "vue";

const currentChallengeData = ref([]);
const archiveChallengeData = ref([]);
const currentStatus = ref("Chargement...");
const archiveStatus = ref("Chargement...");
onMounted(async () => {
  currentChallengeData.value = await apiCall.getCurrentChallenge();
  const archiveChallengeDataTemp = await apiCall.getRandomArchivesChallenges(10);
    for (let i = 0; i < archiveChallengeDataTemp.length; i++) {
        console.log(await apiCall.getRandomParticipationsByChallengeId(10, archiveChallengeDataTemp[i].id));
      const archiveParticipationDataTemp = await apiCall.getRandomParticipationsByChallengeId(10, archiveChallengeDataTemp[i].id);
      archiveChallengeData.value.push([archiveChallengeDataTemp[i], archiveParticipationDataTemp])
  }
  if (currentChallengeData.value == null || currentChallengeData.value.length == 0) {
    currentChallenge.value = "Aucun challenge actuel disponible.";
  } else {
    currentChallenge.value = "";
  }
  if (archiveChallengeData.value == null || archiveChallengeData.value.length == 0) {
    archiveStatus.value = "Aucun ancian challenge disponible.";
  } else {
    archiveStatus.value = "";
  }
});
</script>

<template>
  <body>
    <!-- Challenge Actuel -->
    <h2 class="not-bold">Le challenge actuel ainsi que les participations</h2>
    <div v-if="currentChallengeData != null">
      <div class="horizontal-scroll-container">
        <Challenge_Container v-bind:challenge="currentChallengeData" />
        <Participation_Container />
      </div>
    </div>
    <div v-else class="challenge-container">
      <p>{{ currentStatus }}</p>
    </div>

    <!-- Anciens Challenges -->
    <h2 class="not-bold">Les anciens challenges ainsi que de quelques participations</h2>
    <div
      class="horizontal-scroll-container"
      v-for="challenge in archiveChallengeData"
      v-bind:key="challenge.id"
    >
      <Challenge_Container
        v-bind:challenge="challenge"
      />
      <div
        class="vertical-scroll-container"
      >
        <Participation_Container v-bind:participation="participation" />
        <Participation_Container v-bind:participation="participation" />
        <Participation_Container v-bind:participation="participation" />
        <Participation_Container v-bind:participation="participation" />
      </div>
    </div>
    <p>{{ archiveStatus }}</p>
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
}

.vertical-scroll-container {
  display: flex;
  flex-direction: column;

  padding: 10px 20px;
}

.horizontal-scroll-container {
  padding: 10px;
}
</style>
