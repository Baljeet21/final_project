<script setup>
import { ref } from 'vue'
import { sounds } from '../scripts/sounds.js'
import AudioButton from "../components/Audiobutton.vue";
</script>

<template>
  <AudioButton v-for="sound in sounds" :sound = 'sound'/>
</template>

<style>
button {
  appearance: none;
  background: none;
  padding: 1rem;
  margin: 1rem;
}

button.playing {
  background: #bada55;
}
</style>
