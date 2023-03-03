<template>
  <Panel header="Fornecedores">
    <TabView :activeIndex="activeIndex">
      <TabPanel header="Consulta">

        <DataTable :value="data" :loading="loading" dataKey="id" @sort="onSort($event)" responsiveLayout="scroll"
                   stripedRows selectionMode="single" v-model:selection="selectedConta"
                   v-model:expandedRows="expandedRows"
                   @rowExpand="onRowExpand"
                   @rowCollapse="onRowCollapse">
          <template #empty>No customers found.</template>
          <template #loading>Loading contas data. Please wait.</template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="id" header="Id" :sortable="true" class="columnId"></Column>
          <Column field="nome" header="Nome" :sortable="true"></Column>
          <Column field="cnpj" header="CNPJ" :sortable="true">
            <template #body="slotProps" >
              <div>{{slotProps.data.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5")}}</div>
            </template>
          </Column>
          <Column field="cidade.nome" header="Cidade" :sortable="true">
            <template #body="slotProps" >
              <div>{{slotProps.data.cidade.nome}} / {{slotProps.data.cidade.estado.value}}</div>
            </template>
          </Column>

          <template #expansion="slotProps">

              <div class="grid" style="margin-top: 5px;">
                <div class="col-1">Nome:</div>
                <div class="col-5 bg-teal-100">{{slotProps.data.nome}}</div>
                <div class="col-2">Razão Social:</div>
                <div class="col-4 bg-teal-100">{{slotProps.data.razaoSocial}}</div>

                <div class="col-1">CNPJ:</div>
                <div class="col-5 bg-teal-50">{{slotProps.data.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5")}}</div>
                <div class="col-2">Insc. Estadual:</div>
                <div class="col-4 bg-teal-50">{{slotProps.data.inscEstadual}}</div>

                <div class="col-1">Endereço:</div>
                <div class="col-5 bg-teal-100">{{slotProps.data.endereco}}</div>
                <div class="col-2">Bairro:</div>
                <div class="col-4 bg-teal-100">{{slotProps.data.bairro}}</div>

                <div class="col-1">Complem.:</div>
                <div class="col-5 bg-teal-50">{{slotProps.data.complemento}}</div>
                <div class="col-2">Cep:</div>
                <div class="col-4 bg-teal-50">{{slotProps.data.cep}}</div>

                <div class="col-1">Telefone:</div>
                <div class="col-5 bg-teal-100">{{slotProps.data.telefone}}</div>
                <div class="col-2">Cidade:</div>
                <div class="col-4 bg-teal-100">{{slotProps.data.cidade.nome}} - {{slotProps.data.cidade.estado.value}}</div>
              </div>

          </template>

        </DataTable>

      </TabPanel>
      <TabPanel header="Cadastro">
        Content II
      </TabPanel>
    </TabView>
  </Panel>
</template>

<script>

import fornecedorMixin from "@/views/fornecedor/fornecedorMixin";

export default {
  name: "Fornecedor",
  mixins: [fornecedorMixin]
}
</script>

<style scoped>

</style>