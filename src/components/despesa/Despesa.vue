<template>
  <Panel header="Header">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </Panel>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  methods:{
    async getDataDespesa(){
      const res = await fetch('http://10.10.10.35:8083/api/v1/despesa/page');
      const finalRes = await res.json();
      this.data = finalRes.content;
    }
  },
  created() {
    this.getDataDespesa();
  }
}
</script>

<style scoped>

</style>