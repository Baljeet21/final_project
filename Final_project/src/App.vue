<template id="app">
  <header>
			<h1>Rock Paper Scissors</h1>
  </header>
<div class="container">
		<div class="score_board">
		<!-- Score -->
		<h2>Scores:</h2>
	<h3 class="score">You: {{player_score}}</h3>
	<h3 class="score">Computer:
	  {{ computer_score }}</h3>
				<h3 class="score">Ties: {{tie}}</h3>
				<h2 id="currentState"> {{ currentState }}</h2>
	</div>
	<!-- Player's side -->
		<div class="float-child">
			<div class="player">
			</div>
		</div>
	<div class="main">
		<div class="player-side">
				<Player v-on:getChoice="updatePlayerChoice($event)" v-bind:option="player_choice"/>
				<h2>You chose: {{player_choice}}</h2>
				<div class="to-the-right">
			<!-- Only the chosen one is shown on the screen -->
		<img  v-if="player_choice === 'rock'" v-bind:src="'../public/' + rockImg" alt="rock"/>
		<img  v-if="player_choice === 'paper'" v-bind:src="'../public/' + paperImg" alt="paper" />
		<img  v-if="player_choice === 'scissors'" v-bind:src="'../public/' + scissorsImg" alt="scissors"/>
		</div>
		</div>
	  <!-- Computer's side -->
		<div class="computer-side">
		<!-- These images are shown always -->
		<img src="./assets/scissors.png" alt="Scissors" type="button" />
		<img src="./assets/paper.png" alt="Paper" type="button" />
		<img src="./assets/rock.png" alt="Rock" type="button" />
		<br>
		<h2>Computer
		chose:
		{{ computer_choice }}</h2>
		<!-- Only the chosen one is shown on the screen -->
		<img v-if="computer_choice === 'rock'" v-bind:src="'../public/' + rockImg" />
		<img v-if="computer_choice === 'paper'" v-bind:src="'../public/' + paperImg" />
		<img v-if="computer_choice === 'scissors'" v-bind:src="'../public/' + scissorsImg" />

		</div>
</div>
		<div class="winner-section">
	<!-- Winner announcment -->
	<h1 class="winner" v-if="winner">
	  {{
			winner
	  }} </h1>
	</div>
	<!-- Play button -->
	<Computer @click="play" v-on:getChoice="updateComputerChoice($event)" v-bind:option="computer_choice"/>


</div>

</template>

<script>
//Import components
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
				currentState: ''
		};
	},
	methods: {
		//Updating choices
		updatePlayerChoice(option) {
			this.player_choice = option;
		},
		updateComputerChoice(option) {
			this.computer_choice = option;
		},

			//Comparison mechanism - Game logic
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
		  alert("Select your item!")
	  }
	  else {
		  this.player_score++;
		  this.winner = "You won!";
	  }
	  //Telling your current state
	  if (this.player_score + 1 > this.computer_score + 1) {
		  this.currentState = 'You are winning!'
		} else if (this.player_score + 1 < this.computer_score + 1) {
		this.currentState = 'You are loosing!'
		} else {
		this.currentState = 'Now the score is equal!'
		}

		}
	}

}
</script>
