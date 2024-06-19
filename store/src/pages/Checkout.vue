<template>
	<div>
		<h1>Checkout</h1>

		<p v-if="cart.items.length === 0">Cart Empty</p>

		<Button v-else :loading="placeOrderResource.loading" @click="placeOrderResource.submit()">Place Order</Button>

		<ErrorMessage :message="placeOrderResource.error" />
	</div>
</template>

<script setup>
import {createResource, Button, ErrorMessage} from "frappe-ui";
import {inject} from "vue";

const cart = inject("cart");

const placeOrderResource = createResource({
	url: 'star_ecom.api.place_order',
	makeParams() {
		return {
			products: cart.items
		}
	}
})
</script>
