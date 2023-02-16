

<template id="app">
  <header>
			<h1>Rock paper scissors</h1>
			<!-- Score board -->
  </header>
<div class="container">
		<div class="score_board">
		<h2>Scores:</h2>
	<h3 class="score">You: {{player_score}}</h3>
	<h3 class="score">Computer:
	  {{ computer_score }}</h3>
				<h3 class="score">Ties: {{tie}}</h3>
		<h1 class="winner" v-if="winner">
			{{ winner }}
		</h1>
	</div>

		<div class="float-child">
			<div class="player">
			</div>
		</div>
	<div class="main">
		<div class="player-side">
				<Player v-on:getChoice="updatePlayerChoice($event)" v-bind:option="player_choice"/>
				<h2>You chose: {{player_choice}}</h2>
				<div class="to-the-right">
		<img  v-if="player_choice === 'rock'" v-bind:src="'../public/' + rockImg"/>
		<img  v-if="player_choice === 'paper'" v-bind:src="'../public/' + paperImg" />
		<img  v-if="player_choice === 'scissors'" v-bind:src="'../public/' + scissorsImg" />
		</div>
		</div>
		<div class="computer-side">
		<img src="./assets/rock.png" alt="Rock" type="button" :style="[ computer_choice === 'rock' ? {opacity: `1` } : null ]">
		<img src="./assets/paper.png" alt="Paper" type="button" :style="[ computer_choice === 'paper' ? {opacity: `1` } : null ]">
		<img src="./assets/scissors.png" alt="Scissors" type="button" :style="[ computer_choice === 'scissors' ? {opacity: `1` } : null ]">
		<br>
		<h2>Computer
		chose:
		{{ computer_choice }}</h2>
		<img v-if="computer_choice === 'rock'" v-bind:src="'../public/' + rockImg" />
		<img v-if="computer_choice === 'paper'" v-bind:src="'../public/' + paperImg" />
		<img v-if="computer_choice === 'scissors'" v-bind:src="'../public/' + scissorsImg" />

		</div>
</div>
	<Computer @click="play" v-on:getChoice="updateComputerChoice($event)" v-bind:option="computer_choice"/>


</div>

</template>

<script>
import Computer
	from "@/components/Computer.vue";
import Player
	from "@/components/Player.vue";


export default {
	name: 'App',
	components: {
		Computer: Computer,
		Player
	},
	data() {
		return {
			player_choice: "",
			computer_choice: "",
			computer_score: "",
			player_score: "",
			winner: "",
				tie: "",
				rockImg: 'rock.png',
				paperImg: 'paper.png',
				scissorsImg: 'scissors.png',
		};
	},
	methods: {
		updatePlayerChoice(option) {
			this.player_choice = option;
		},
		updateComputerChoice(option) {
			this.computer_choice = option;
		},

	  play() {
			const {player_choice, computer_choice} = this;

			if (player_choice === computer_choice) {
				this.winner = "It's a tie!";
				this.tie++
			} else if (
		  (computer_choice === "scissors" && player_choice === "paper") ||
		  (computer_choice === "paper" && player_choice === "rock") ||
		  (computer_choice === "rock" && player_choice === "scissors")
	  ) {
			this.computer_score++
			this.winner = 'You lost!'
		} else if (player_choice === "") {
		  alert("You have to select your choice!")
	  }
	  else {
		  this.player_score++;
		  this.winner = "You won!";
	  }

		}
	}

}
</script>
