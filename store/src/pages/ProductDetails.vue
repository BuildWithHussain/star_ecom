<template>
	<div class="p-5">
		<div v-if="productDoc">
			<h1 class=" font-black text-gray-900 text-3xl">
				{{ productDoc.name }}
			</h1>

			<div class="sm:flex sm:gap-6">
				<!-- Image Carousel -->
				<div class="flex gap-3 flex-col w-fit mt-5">
					<div
						@click="currentPreviewImageURL = image.image_url"
						:class='[
							"p-2 border-2 border-gray-600/25 rounded hover:bg-black-overlay-50 cursor-pointer",
							currentPreviewImageURL === image.image_url ? "border-gray-500/90" : ""
						]'
						v-for="image in productDoc.images"
					>
						<img
							class="h-16"
							:src="image.image_url"
							alt="product image thumbnail"
						/>
					</div>
				</div>

				<!-- Current Preview Image -->
				<img class=" sm:max-w-lg" :src="currentPreviewImageURL">
			</div>

			<div class="prose prose-sm" v-html="md.render(productDoc.description)"></div>

			<div class="space-y-3">
				<p class="text-3xl font-bold text-gray-900">{{ formatCurrency(productDoc.price, productDoc.currency) }}</p>

				<Button @click="addProductToCart" variant="solid" size="2xl">
					<template #prefix>
						<FeatherIcon class="h-5" name="shopping-cart" />
					</template>
					Add to cart
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup>
import markdownit from 'markdown-it'
import { useToast } from "vue-toastification";
import { computed, watch, ref, inject } from "vue";
import { formatCurrency } from "@/utils";
import { useRoute } from "vue-router";
import { Button, createDocumentResource, FeatherIcon } from "frappe-ui";

const route = useRoute();
const toast = useToast();

const cart = inject("cart");

const md = markdownit()

const currentPreviewImageURL = ref(null);

const productResource = createDocumentResource({
	doctype: "Product",
	name: route.params.name,
	auto: true
})

const productDoc = computed(() => {
	if (productResource.doc) {
		return productResource.doc
	}
})

watch(productDoc, () => {
	if (productDoc && productDoc.value.images.length > 0) {
		currentPreviewImageURL.value = productDoc.value.images[0].image_url;
	}
})


function addProductToCart() {
	const productName = route.params.name;

	cart.items.push({
		product: productName,
		qty: 1
	})
	toast.success("Item added to cart!")
}
</script>
