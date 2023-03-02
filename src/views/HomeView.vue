<template>
  <div class="home">
    <Message severity="info" :closable="false" >
      Welcome to App personal-payment-view
    </Message>
  </div>
  <div class="grid">
    <div class="col">
    <card-chard titulo="Despesas" :dados="basicDataDespesa" :valorTotal="totalValorDespesas" :icone="'pi pi-fw pi-dollar'"   ></card-chard>
    </div>
    <div class="col">
    <card-chard titulo="Contas" :dados="basicDataConta" :valorTotal="totalValorContas" :icone="'pi pi-fw pi-credit-card'"></card-chard>
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
      dataChartDespesa: [],
      totalValorDespesas: 0,
      totalValorContas: 0,
      basicData: {
        labels: [],
        datasets: [
          {
            label: 'Tatal por Despesa',
            backgroundColor: '#42A5F5',
            data: []
          }
        ]
      },
      basicDataDespesa:{},
      basicDataConta:{}
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

      this.dataChartDespesa = await this.defaultService.get('despesa/despesaPorTipo');

      this.basicData.labels = this.dataChartDespesa.map((i) => i.tipoDespesa.nome)
      this.basicData.datasets[0].data = this.dataChartDespesa.map((i) => i.valor)
      this.basicDataDespesa = this.basicData;


    }
  }
}
</script>
