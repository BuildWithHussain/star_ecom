<template>
	<a href="#" class="shadow-md rounded-sm p-4 space-y-2 flex items-start justify-between flex-col" >
		<div>
			<img :src="product.preview_image" alt="Product Preview Image">
			<p class="text-base text-gray-800 font-medium mt-2">{{ product.name }}</p>
		</div>
		<p class="text-xl font-bold text-gray-900">{{ formatCurrency(product.price, product.currency) }}</p>
	</a>
</template>

<script setup>
import { formatCurrency } from "@/utils";

const props = defineProps({
	product: Object
})
</script>
