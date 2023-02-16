<template>
	<div class="container-computer">
			<button v-on:click="chooseRandom()" id="play-btn">Choose an item and play</button>

	</div>
</template>

<script>
const options = ['rock', 'paper', 'scissors'];
export default {
	data() {
		return {
			option: ''
		};
	},
		methods: {
		chooseRandom() {
			const randomChoice = Math.floor(Math.random() * options.length);
			this.option = options[randomChoice];
			this.$emit('getChoice', this.option);
		}
		}
}
</script>
