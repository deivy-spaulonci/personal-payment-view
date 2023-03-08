<template>
  <Panel header="Fornecedores">

    <div class="grid">
      <div class="col-fixed" style="width:400px; margin:5px;" >
        <div class="card">
          <h5>Cadastro</h5>
          <div class="field">
            <InputMask v-model="fornecedorCadastro.cnpj" mask="99.999.999/9999-99" placeholder="CNPJ" style="width: 90%;"/>
            <Button type="button" icon="pi pi-save" class="p-button-primary p-button-sm" style="width:10%;" @click="getCnpj"></Button>
          </div>
          <div class="field">
            <InputText type="text" v-model="fornecedorCadastro.nome" :style="{'text-transform':'capitalize'}" placeholder="Nome" style="width: 100%; text-transform: capitalize"/>
          </div>
          <div class="field">
            <InputText type="text" v-model="fornecedorCadastro.razaoSocial" placeholder="Razão Social" style="width: 100%;"/>
          </div>
          <div class="field">
            <InputText type="text" v-model="fornecedorCadastro.inscricaoEstadual" placeholder="Inscrição Estadual" style="width: 100%;"/>
          </div>
          <div class="field">
            <InputText type="text" v-model="fornecedorCadastro.endereco" placeholder="Endereço" style="width: 100%;"/>
          </div>
          <div class="field">
            <InputText type="text" v-model="fornecedorCadastro.bairro" placeholder="Bairro" style="width: 100%;"/>
          </div>
          <div class="field">
            <InputText type="text" v-model="fornecedorCadastro.complemento" placeholder="Complemento" style="width: 100%;"/>
          </div>
          <div class="field">
            <InputText type="text" v-model="fornecedorCadastro.cep" placeholder="Complemento" style="width: 100%;"/>
          </div>
          <div class="field">
            <InputText type="text" v-model="fornecedorCadastro.telefone" placeholder="Telefone" style="width: 100%;"/>
          </div>
          <div class="field">
            <Dropdown v-model="fornecedorCadastro.cidade" scrollHeight="400px" :options="cidades" optionLabel="nome" placeholder="Cidade" style="width: 100%;" :filter="true" :show-clear="true"/>
          </div>
          <div class="field">
            <Button type="button" icon="pi pi-save" class="p-button-primary p-button-sm" style="height: 100%; width: 100%;" @click="cadastroFornecedor"></Button>
          </div>
        </div>
      </div>

      <div class="col">

        <div class="grid" style="margin-top: 20px;">
          <div class="col-fixed" style="width:150px">
            <InputNumber inputId="withoutgrouping" v-model="idFilter" mode="decimal" :useGrouping="false" placeholder="Id"  @input="keyUpIdFilter($event)" input-style="width:100%;"/>
          </div>
          <div class="col-fixed" style="width:730px">
            <InputText type="text" v-model="nomeFilter" @input="keyUpIdFilter($event)" style="width:100%;"/>
          </div>
          <div class="col-fixed" style="width:250px">
            <InputText type="text" v-model="cnpjFilter" @input="keyUpIdFilter($event)" style="width:100%;"/>
          </div>
        </div>

        <DataTable :value="data" :loading="loading" dataKey="id" @sort="onSort($event)" responsiveLayout="scroll"
                   stripedRows selectionMode="single" v-model:selection="selectedConta"
                   v-model:expandedRows="expandedRows">
          <template #empty>No customers found.</template>
          <template #loading>Loading contas data. Please wait.</template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="id" header="Id" :sortable="true" class="columnId"></Column>
          <Column field="nome" header="Nome" :sortable="true"></Column>
          <Column field="cnpj" header="CNPJ" :sortable="true">
            <template #body="slotProps" >
              <div v-if="slotProps.data.cnpj">{{slotProps.data.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5")}}</div>
            </template>
          </Column>
          <Column field="cidade.nome" header="Cidade" :sortable="true">
            <template #body="slotProps" >
              <div>{{slotProps.data.cidade.nome}} / {{slotProps.data.cidade.estado.value}}</div>
            </template>
          </Column>

          <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
            <template #body="slotProps">
              <Button type="button" icon="pi pi-pencil" class="p-button-success p-button-sm" @click="editFornecedor(slotProps.data.id)"></Button>
            </template>
          </Column>

          <template #expansion="slotProps">

            <div class="grid" style="margin-top: 5px;">
              <div class="col-fixed" style="width:90px;">Nome:</div>
              <div class="col-5 bg-teal-100">{{slotProps.data.nome}}</div>
              <div class="col-2">Razão Social:</div>
              <div class="col-4 bg-teal-100">{{slotProps.data.razaoSocial}}</div>

              <div class="col-fixed" style="width:90px;">CNPJ:</div>
              <div class="col-5 bg-teal-50">{{slotProps.data.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5")}}</div>
              <div class="col-2">Insc. Estadual:</div>
              <div class="col-4 bg-teal-50">{{slotProps.data.inscEstadual}}</div>

              <div class="col-fixed" style="width:90px;">Endereço:</div>
              <div class="col-5 bg-teal-100">{{slotProps.data.endereco}}</div>
              <div class="col-2">Bairro:</div>
              <div class="col-4 bg-teal-100">{{slotProps.data.bairro}}</div>

              <div class="col-fixed" style="width:90px;">Complem.:</div>
              <div class="col-5 bg-teal-50">{{slotProps.data.complemento}}</div>
              <div class="col-2">Cep:</div>
              <div class="col-4 bg-teal-50">{{slotProps.data.cep}}</div>

              <div class="col-fixed" style="width:90px;">Telefone:</div>
              <div class="col-5 bg-teal-100">{{slotProps.data.telefone}}</div>
              <div class="col-2">Cidade:</div>
              <div class="col-4 bg-teal-100">{{slotProps.data.cidade.nome}} - {{slotProps.data.cidade.estado.value}}</div>
            </div>

          </template>

        </DataTable>
        <Paginator :rows="rows" :totalRecords="totalLinas" @page="onPage($event)" :rowsPerPageOptions="[10,15,20,25]"></Paginator>
      </div>
    </div>



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