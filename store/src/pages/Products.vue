<template>
  <h1 class="text-2xl font-bold text-gray-800">
	✨ Star Store ✨
  </h1>
  <hr>

  <h2 class="my-4 font-semibold text-lg">Our Products</h2>

  <div class="mt-4 grid grid-cols-4 gap-3" v-if="productsList">
	<ProductCard v-for="product in productsList" :key="product.name" :product="product" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { createListResource } from "frappe-ui";
import ProductCard from "@/components/ProductCard.vue";

const productsResource = createListResource({
	doctype: "Product",
	fields: ["name", "preview_image", "price", "currency"],
	auto: true
})

const productsList = computed(() => {
	if (productsResource.list.data) {
		return productsResource.list.data;
	}
	return [];
})
</script>
