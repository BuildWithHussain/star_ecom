<template>
	<Navbar />
	<div class="m-3">
		<router-view />
	</div>
</template>

<script setup>
import {watch, inject} from "vue";
import Navbar from './components/Navbar.vue';

const cart = inject("cart")

watch(cart.items, () => {
	console.log("watcher works!")
	// update cart in local storage
	localStorage.setItem("cart", JSON.stringify(cart))
})
</script>
