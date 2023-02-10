<script>
import Home from './components/Home.vue'
import MainMenu from "./components/MainMenu.vue";
import Despesa from "./components/despesa/Despesa.vue";

const routes = {
  '/': Home,
  '/despesa': Despesa,

}
export default {
  components: {MainMenu},
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <main-menu></main-menu>
  <component :is="currentView" />
</template>