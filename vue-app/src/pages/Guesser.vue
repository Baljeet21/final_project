<script setup>
import {ref, computed} from 'vue';


const deckId = "pgyq205cjsef";
const lastCard = ref(undefined)

const score = ref(0)
const currentGuess = ref(null)
const drawCardAPI = computed(()=>{
  return 'https://www.deckofcardsapi.com/api/deck/${deckID}/draw/count=1';
});

async function drawCard(){
  const {cards} = await fetch(drawCardAPI.value).then((r)=> r.json());
  lastCard.value = cards[0]

  validateResult(lastCard.value.suit)
}

function validateResult(suit){
  const reds = ['HEARTS', 'DIAMONDS']
  const blacks = ['SPADES', 'CLUBS']

  if(currentGuess.value == 'RED'){
    return reds.includes(suit) ? score.value++ :null;
  }

  return blacks.includes(suit) ? score.value++ : null;
}


</script>

<template>
  <h3>Current Score {{score}}</h3>
  <h3>Current Guess {{currentGuess}}</h3>

  <img v-if="lastCard" :src="lastCard.image"/>
  <button @click="() => { currentGuess = 'Red'}">Guess Red</button>
  <button @click="() => { currentGuess = 'Black'}">Guess Black</button>

  <button v-if="currentGuess" @click="drawCard">Draw Card</button>


</template>