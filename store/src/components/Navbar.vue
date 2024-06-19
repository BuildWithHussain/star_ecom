<template>
	<div>
		<nav class="p-4 flex items-center justify-between">
		<router-link :to="{name: 'ProductsListPage'}" class="text-2xl font-bold text-gray-800">
		✨ Star Store ✨
		</router-link>

		<button @click="cartDialogShown = true" class="flex flex-start">
			<FeatherIcon class="h-8" name="shopping-cart" />
			<Badge variant="solid">{{ cart.items.length }}</Badge>
		</button>
	</nav>
	</div>
	<Dialog :options="{
		title: 'Your Cart',
		size: '3xl',
		actions: [
			{
				label: 'Proceed to checkout',
				variant: 'solid',
				onClick: (close) => {
					close();
					router.push({
						name: 'CheckoutPage'
					})

				}
			}
		]
	}" v-model="cartDialogShown"
	>
		<template #body-content>
			<ul class="space-y-3">
				<li v-for="item, index in cart.items">
					#{{ (index + 1) }} -  {{ item.product }}
					<FormControl v-model="item.qty" type="number" placeholder="Qty" />
					<Button @click="removeProductFromCart(index)" class="mt-2" variant="outline" theme="red">Remove</Button>
				</li>
			</ul>
		</template>
	</Dialog>
</template>

<script setup>
import { FeatherIcon, Badge, Button, Dialog, FormControl } from "frappe-ui";
import { inject, ref } from "vue";
import { useRouter } from "vue-router"

const router = useRouter();

const cart = inject("cart");
const cartDialogShown = ref(false);

function removeProductFromCart(index) {
	cart.items.splice(index, 1);
}
</script>

