<template>
  <Panel :bodyStyle="{textAlign:'center'}">
    <LinkButton :plain="true" href="#/" class="larg"><i class="fa-solid fa-house"></i> Home</LinkButton>
    <LinkButton :plain="true" href="#/despesa" class="larg"><i class="fa-solid fa-dollar-sign"></i> Despesas</LinkButton>
    <LinkButton :plain="true" href="#/" class="larg"><i class="fa-solid fa-barcode"></i> Contas</LinkButton>
    <LinkButton :plain="true" href="#/" class="larg"><i class="fa-solid fa-box"></i> Fornecedores</LinkButton>
  </Panel>
</template>

<script>
export default {
  name: "MainMenu"
}
</script>

<style scoped>
.larg{
  width: 110px;
}
</style>