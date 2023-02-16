<template>
	<div class="container">
	  <img src="../assets/rock.png" alt="Rock" type="button" v-on:click="pRock()">
	  <img src="../assets/paper.png" alt="Paper" type="button" v-on:click="pPaper()"  >
	  <img src="../assets/scissors.png" alt="Scissors" type="button" v-on:click="pScissors()" >
	</div>
</template>

<script>
export default {
	methods: {
		pRock() {
			this.$emit("getChoice", "rock")
		},
	  pPaper() {
		  this.$emit("getChoice", "paper")
	  },
	  pScissors() {
		  this.$emit("getChoice", "scissors")
	  }
	}
}
</script>
