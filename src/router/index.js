import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Despesa from "../views/despesa/Despesa.vue";
import Fornecedor from "@/views/fornecedor/Fornecedor.vue";
import Conta from "@/views/contas/Conta.vue";

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/despesa', name: 'despesa', component: Despesa },
  { path: '/fornecedor', name: 'fornecedor', component: Fornecedor },
  { path: '/conta', name: 'conta', component: Conta },
  { path: '/about', name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
