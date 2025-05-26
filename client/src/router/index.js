import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Collection from '../views/Collection.vue'
import About from '../views/About.vue'
import Account from '../views/Account.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'
import axios from 'axios'

Vue.use(VueRouter)
Vue.prototype.$axios = axios

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.getters['auth/isAuthenticated']) {
      await store.dispatch('auth/checkAuth');
    }
    if (store.getters['auth/isAuthenticated']) {
      next();
    } else {
      store.commit('auth/SET_AUTH_MODAL', {
        show: true,
        context: 'login',
        redirectTo: to.path
      });
      next('/');
    }
  } else {
    next();
  }
});

export default router