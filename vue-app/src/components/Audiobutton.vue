<script setup>
import {ref} from 'vue';
defineProps(['sound']);

const audio = ref(null);
const isPlaying = ref(false)

function playSound() {
  isPlaying.value = true
  audio.value.play();
}
</script>

<template>
  <audio :src = 'sound.filename' @ended="() => {isPlaying = false}" ref = 'audio'></audio>
  <button @click = 'playSound' :class="{playing: isPlaying}">{{sound.name}}</button>
</template>