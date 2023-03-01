<template>
  <Card style="width: 100%; display: inline-block;">
    <template #header></template>
    <template #title>
      {{titulo}}
    </template>
    <template #subtitle>
      <Message severity="success" :closable="false" :icon="icone">
        Total : {{util.formatCurrencyBR(valorTotal)}}
      </Message>
    </template>
    <template #content>
      <p>Lorem ipsum dolor sit amet, </p>
      <Chart type="bar" :data="dados" />
    </template>
    <template #footer>
      <Button icon="pi pi-check" label="Save" />
    </template>
  </Card>
</template>

<script>
import Util from "@/util/Util";

export default {
  props: ['titulo','valorTotal','dados','icone'],
  name: "CardChard",
  util:null,
  created() {
    this.util = new Util();
  },
}
</script>

<style scoped>

</style>