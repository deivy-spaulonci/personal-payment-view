<template>
  <Panel header="Despesas">

    <Fieldset legend="Dados Cadastrais" :toggleable="true">
      <Dropdown :options="tipos" optionLabel="nome" placeholder="Despesas"
                style="width: 180px;" :filter="true" :show-clear="true"/>
    </Fieldset>


    <div class="grid" style="margin-top: 20px;">
      <div class="col-fixed" style="width:70px">
        <InputNumber inputId="withoutgrouping" v-model="idFilter" mode="decimal" :useGrouping="false" placeholder="Id"
                     @input="keyUpIdFilter($event)" input-style="width:100%;"/>
      </div>
      <div class="col-fixed" style="width:200px">
        <Dropdown v-model="selectedTipoDespesa" :options="tipos" optionLabel="nome" placeholder="Despesas"
                  style="width: 180px;" :filter="true" @change="getDataDespesa()" :show-clear="true"/>
      </div>
      <div class="col-fixed" style="width:100px">
        <Calendar v-model="dataInicial" placeholder="Inicio" @date-select="getDataDespesa()"  dateFormat="dd/mm/yy"
                  :showButtonBar="true" @clear-click="getDataDespesa"/>
      </div>
      <div class="col-fixed" style="width:100px">
        <Calendar v-model="dataFinal"  placeholder="Termino" @date-select="getDataDespesa()"  dateFormat="dd/mm/yy"
                  :showButtonBar="true" @clear-click="getDataDespesa"/>
      </div>
      <div class="col-fixed" style="width:350px;">
        <Dropdown v-model="selectedFornecedor" :options="fornecedores" optionLabel="nome" placeholder="Fornecedor"
                  style="width: 100%;" :filter="true" @change="getDataDespesa()" :show-clear="true"/>
      </div>
      <div class="col-fixed" style="width:250px;">
        <Dropdown v-model="selectedFormaPgto" :options="formasPgto" optionLabel="nome" placeholder="Forma Pgto"
                  style="width: 100%;" :filter="true" :show-clear="true"/>
      </div>
<!--      <div class="col-fixed" style="width:50px;">-->
<!--        <Button icon="pi pi-eraser"  class="p-button-secondary p-button-text p-button-sm" @click="clearFilter()"/>-->
<!--      </div>-->
    </div>


    <DataTable :value="data" :loading="loading" dataKey="id" @sort="onSort($event)" responsiveLayout="scroll" stripedRows
               selectionMode="single" v-model:selection="selectedDespesa">
      <template #empty>No customers found.</template>
      <template #loading>Loading despesas data. Please wait.</template>
      <Column field="id" header="Id" :sortable="true" class="columnId" ></Column>
      <Column field="tipoDespesa" header="Despesa" :sortable="true">
        <template #body="slotProps" >
          <div>{{slotProps.data.tipoDespesa.nome}}</div>
        </template>
      </Column>
      <Column field="data" header="Data" :sortable="true">
        <template #body="slotProps" >
          <div class="textRight">{{util.formatDateBr(slotProps.data.data)}}</div>
        </template>
      </Column>
      <Column field="fornecedor.nome" header="Fornecedor" :sortable="true"></Column>
      <Column field="formaPagamento" header="Pagamento" :sortable="true">
        <template #body="slotProps" >
          <div>{{slotProps.data.formaPagamento.nome}}</div>
        </template>
      </Column>
      <Column field="valor" header="Valor" class="columnCurrency">
        <template #body="slotProps" >
          <div class="textRight">{{util.formatCurrencyBR(slotProps.data.valor)}}</div>
        </template>
      </Column>
      <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body>
          <Button type="button" icon="pi pi-pencil" class="p-button-success p-button-sm"></Button>
        </template>
      </Column>
      <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body>
          <Button type="button" icon="pi pi-trash" class="p-button-danger p-button-sm"></Button>
        </template>
      </Column>
      <template #footer>
        <div class="textRight">Total: {{util.formatCurrencyBR(valorTotal)}}</div>
      </template>
    </DataTable>
    <Paginator :rows="rows" :totalRecords="totalLinas" @page="onPage($event)" :rowsPerPageOptions="[20,30,40]">
    </Paginator>
  </Panel>

</template>

<script>
import despesaMixin from "@/views/despesa/mixin/despesaMixin";

export default {
  mixins: [despesaMixin]
}
</script>