<template>
	<div class="container-computer">
			<button v-on:click="chooseRandom()" id="play-btn">Choose an item and click here</button>

	</div>
</template>

<script>
// Items
const options = ['rock', 'paper', 'scissors'];
export default {
	data() {
		//Export the one chosen
		return {
			option: ''
		};
	},
		//Random choosing of an item
		methods: {
		chooseRandom() {
			const randomChoice = Math.floor(Math.random() * options.length);
			this.option = options[randomChoice];
			this.$emit('getChoice', this.option);
		}
		}
}
</script>
