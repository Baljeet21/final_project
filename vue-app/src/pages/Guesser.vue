<script setup>
import { createArrayExpression } from "@vue/compiler-core";
import { ref, computed } from "vue";
import { ref, computed, onBeforeMount, onErrorCaptured } from "vue";
import Loader from "../components/Loader.vue";
import FaultyComponent from "../components/FaultyComponent.vue";

const currentDeck = "0obbsuxiurp9";
const getDeckAPI =
	"https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

const currentGuess = ref(undefined);
const currentScore = ref(0);
const deckID = ref();
const currentGuess = ref();
const drawnCards = ref([]);
const score = ref(0);
const loading = ref(true);

onBeforeMount(() => {
	setTimeout(async () => {
		const { deck_id } = await fetch(getDeckAPI).then((r) => r.json());
		deckID.value = deck_id;
		loading.value = false;
	}, 2000);
});

onErrorCaptured((err, instance) => {
	console.log("Opps, error happened", err);
	instance.$el.innerHTML = `<div style="border: 1px solid red;">Error captured</div>`;
	return false;
});

// const drawCardAPI = `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`

const drawCardAPI = computed(() => {
	return `https://www.deckofcardsapi.com/api/deck/${currentDeck}/draw/?count=1`;
	return `https://www.deckofcardsapi.com/api/deck/${deckID.value}/draw/?count=1`;
});

function setGuess(color) {
	currentGuess.value = color;
}

async function drawCard() {
	// goto API draw a card
	const { cards } = await fetch(drawCardAPI.value).then((r) => r.json());
	// store the card in drawnCards Array
	drawnCards.value.push(cards[0]);
	validateGuess(drawCard.suit);
	// evaluate guess
	evaluateGuess(cards[0].suit);
}

function validateGuess(suit) {
	function evaluateGuess(suit) {
		const reds = ["HEARTS", "DIAMONDS"];
		const blacks = ["SPADES", "CLUBS"];

		if (currentGuess.value === "RED") {
			return reds.includes(suit) ? currentScore.value++ : null;
		}
		return blacks.includes(suit) ? currentScore.value++ : null;
		if (currentGuess.value == "RED")
			return reds.includes(suit) ? score.value++ : null;

		return blacks.includes(suit) ? score.value++ : null;
	}
</script>

<template>
	<h1>The Big Guesser Game</h1>
	<h2>The current Deck: {{ currentDeck }}</h2>
	<h2>The current Guess: {{ currentGuess }}</h2>
	<h2>The current Score: {{ currentScore }}</h2>

	<button
			@click="
      () => {
        currentGuess = 'RED';
      }
    "
	>
		Guess red
	</button>
	<button
			@click="
      () => {
        currentGuess = 'BLACK';
      }
    "
	>
		Guess black
	</button>

	<div v-if="currentGuess">
		<button @click="drawCard">Draw a card</button>
		<ul>
			<li>List of</li>
			<li v-for="card in drawnCards">
				<img :src="card.image" height="100" />
			</li>
		</ul>
		<h1>Guesser Game</h1>

		<h3>Score: {{ score }}</h3>
		<h3>Current Guess: {{ currentGuess }}</h3>

		<Loader v-if="loading" />

		<div v-if="loading">Loading ...</div>

		<div v-if="deckID">
			<button @click="setGuess('RED')">Guess RED</button>
			<button @click="setGuess('BLACK')">Guess BLACK</button>

			<FaultyComponent />

			<div v-if="currentGuess">
				<button @click="drawCard">Draw Card</button>

				<div id="cards">
					<img
							:src="card.image"
							:alt="card.code"
							v-for="card in drawnCards"
							height="200"
					/>
				</div>
			</div>
		</div>
</template>
