<script setup>
import { ref } from "vue";
import { reactive } from "vue";

const props = defineProps(["challenge"]);
</script>

<template>
  <div v-if="challenge" class="challenge-container">
    <div class="top">
      <h2>
        <span>{{ challenge.title }}</span
        ><span class="not-bold">Challenges</span>
      </h2>
      <p>Du : {{ challenge.start_date }} au : {{ challenge.end_date }}</p>
    </div>
    <div class="center">
      <p class="challenge-description">
        {{ challenge.description }}
      </p>
      <img v-bind:src="`/uploads${challenge.photo_url}`" alt="Challenge Theme Image" />
    </div>
    <button>Voir</button>
  </div>
  <div v-else class="challenge-container">
    <p>Chargement...</p>
  </div>
</template>

<style scoped>
.challenge-container {
  padding: 10px 20px;
  border-width: 2px;
}

.top {
  text-align: start;
}

.center {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 20px 0px 20px 0px;

  width: max-content;
}

.challenge-description {
  text-align: left;

  width: 250px;
}

img {
  display: block;
  max-width: 512px;
  max-height: 512px;
  width: auto;
  height: auto;
}
</style>
