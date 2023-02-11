<template>
  <TabMenu :model="items" />
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {label: 'Home', icon: 'pi pi-fw pi-home', to:'/'},
        {label: 'Despesa', icon: 'pi pi-fw pi-dollar', to:'/despesa'},
        {label: 'Fornecedor', icon: 'pi pi-fw pi-box'},
        {label: 'Contas', icon: 'pi pi-fw pi-credit-card'},
      ]
    }
  }
}
</script>

<style>
</style>
