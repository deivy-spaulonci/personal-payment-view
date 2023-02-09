<script>
import Home from './components/Home.vue'
import About from './components/About.vue'

const routes = {
  '/': Home,
  '/about': About
}
export default {
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
  <a href="#/">Home</a> |
  <a href="#/about">About</a>
  <component :is="currentView" />

  <div>
    <h2>Basic Panel</h2>
    <Panel title="Panel Title" :collapsible="true" :bodyStyle="{padding:'20px'}" style="height:200px">
      <p>Panel Content.</p>
    </Panel>
  </div>
</template>