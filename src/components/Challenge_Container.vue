<script setup>
  import { ref } from "vue";
  import { reactive } from "vue";

  defineProps(["challenge"]);

  function redirectChallenge(id) {
   	document.location.href=("/challenge?id="+id);
    }
</script>



<template>

  <div v-if="challenge" class="challenge-container">
    <div class="top">
      <h2>
        <span>{{ challenge.title }}</span
        ><span class="not-bold">Challenge</span>
      </h2>
      <p>Du : {{ challenge.start_date }} au : {{ challenge.end_date }}</p>
    </div>
    <div class="center">
      <p class="challenge-description">
        {{ challenge.description }}
      </p>
      <img v-bind:src="`/uploads${challenge.photo_url}`" alt="Challenge Theme Image" />
    </div>
    <button v-on:click="redirectChallenge(challenge.id)">Voir</button>
  </div>
  <div v-else class="challenge-container">
    <p>Chargement...</p>
  </div>

</template>



<style scoped>

  .challenge-container {
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
  }

  .center {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 20px 0px 20px 0px;

    width: fit-content;
    height: fit-content;
  }

  .challenge-description {
    text-align: left;

    width: 250px;
  }

  img {
    display: block;
    max-width: 512px;
    max-height: 512px;
  }

</style>
