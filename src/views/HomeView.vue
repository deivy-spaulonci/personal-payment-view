<template>
  <div class="home">
    <Message severity="info" :closable="false" >
      Welcome to App personal-payment-view
    </Message>
  </div>
  <div class="grid">
    <div class="col">
    <card-chard titulo="Despesas" :dados="basicData" :valorTotal="totalValorDespesas" :icone="'pi pi-fw pi-dollar'"></card-chard>
    </div>
    <div class="col">
    <card-chard titulo="Contas" :dados="basicData" :valorTotal="totalValorContas" :icone="'pi pi-fw pi-credit-card'"></card-chard>
    </div>
  </div>
</template>

<script>
import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import CardChard from "@/components/dashboard/CardChard.vue";
export default {
  data() {
    return {
      totalValorDespesas: 0,
      totalValorContas: 0,
      basicData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: 'My Second dataset',
            backgroundColor: '#9CCC65',
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      }
    }
  },
  name: 'HomeView',
  defaultService: null,
  components: {
    CardChard
  },
  mounted() {
    this.geTotais();
  },
  created() {
    this.defaultService = new DefaultService();
    this.util = new Util();
  },
  methods:{
    async geTotais(){
      this.totalValorDespesas = await this.defaultService.get('despesa/valorTotal');
      this.totalValorContas = await this.defaultService.get('conta/valorTotal');
    }
  }
}
</script>
