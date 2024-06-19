import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: {
		name: "ProductsListPage"
	}
  },
  {
	path: '/products',
	name: 'ProductsListPage',
	component: () => import("@/pages/Products.vue")
  },
  {
	path: '/products/:name',
	name: "ProductDetailsPage",
	component: () => import("@/pages/ProductDetails.vue"),
  },
  {
	path: '/checkout',
	name: 'CheckoutPage',
	component: () => import("@/pages/Checkout.vue"),
	meta: {
		requiresLogin: true
	}
  }
]

let router = createRouter({
  history: createWebHistory('/store'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

	if (to.meta.requiresLogin && !isLoggedIn) {
		// throw them to login page
		window.location.href = "/login?redirect-to=/store";
	}
	next();
})

export default router
