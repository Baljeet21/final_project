<template>
	<h1>Faulty Component</h1>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
	throw new Error("Can't load content from Server!");
});
</script>
