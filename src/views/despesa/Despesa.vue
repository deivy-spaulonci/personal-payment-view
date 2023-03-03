<template>
  <Panel header="Despesas">

    <div class="grid">
      <div class="col-fixed" style="width:400px; margin:5px;" >
        <div class="card">
          <h5>Cadastro</h5>
          <div class="field">
            <ComboTipo @custom-change="(s) => despesaCadastro.tipoDespesa = s" :valores="tipos" place="Despesa"/>
          </div>
          <div class="field">
            <CampoData @custom-change="(s) => despesaCadastro.data = s" place="Data"/>
          </div>
          <div class="field">
            <ComboTipo @custom-change="(s) => despesaCadastro.fornecedor = s" :valores="fornecedores" :largura="250" place="Fornecedor"/>
          </div>
          <div class="field">
            <ComboTipo @custom-change="(s) => despesaCadastro.formaPagamento = s" :valores="formasPgto" :largura="250" place="Forma Pgto"/>
          </div>
          <div class="field">
            <CampoMoeda @custom-change="(s) => despesaCadastro.valor = s"/>
          </div>
          <div class="field">
            <InputText type="text" v-model="despesaCadastro.obs" placeholder="Observação" style="width: 100%;"/>
          </div>
          <div class="field">
            <Button type="button" icon="pi pi-save" class="p-button-primary p-button-sm" style="height: 100%; width: 100%;" @click="cadastroDespesa"></Button>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="grid" style="margin-top: 20px;">
          <div class="col-fixed" style="width:100px">
            <InputNumber inputId="withoutgrouping" v-model="idFilter" mode="decimal" :useGrouping="false" placeholder="Id"  @input="keyUpIdFilter($event)" input-style="width:100%;"/>
          </div>
          <div class="col-fixed" style="width:200px">
            <Dropdown v-model="selectedTipoDespesa" scrollHeight="400px" :options="tipos" optionLabel="nome" placeholder="Despesas" style="width: 180px;" :filter="true" @change="getDataDespesa()" :show-clear="true"/>
          </div>
          <div class="col-fixed" style="width:100px">
            <Calendar v-model="dataInicial" placeholder="Inicio" @date-select="getDataDespesa()"  dateFormat="dd/mm/yy" :showButtonBar="true" @clear-click="getDataDespesa"/>
          </div>
          <div class="col-fixed" style="width:100px">
            <Calendar v-model="dataFinal"  placeholder="Termino" @date-select="getDataDespesa()"  dateFormat="dd/mm/yy" :showButtonBar="true" @clear-click="getDataDespesa"/>
          </div>
          <div class="col-fixed" style="width:350px;">
            <Dropdown v-model="selectedFornecedor" scrollHeight="400px" :options="fornecedores" optionLabel="nome" placeholder="Fornecedor" style="width: 100%;" :filter="true" @change="getDataDespesa()" :show-clear="true"/>
          </div>
          <div class="col-fixed" style="width:250px;">
            <Dropdown v-model="selectedFormaPgto" scrollHeight="400px" :options="formasPgto" optionLabel="nome" placeholder="Forma Pgto" style="width: 100%;" :filter="true" :show-clear="true"/>
          </div>
          <!--      <div class="col-fixed" style="width:50px;">-->
          <!--        <Button icon="pi pi-eraser"  class="p-button-secondary p-button-text p-button-sm" @click="clearFilter()"/>-->
          <!--      </div>-->
        </div>

        <DataTable :value="data" :loading="loading" dataKey="id" @sort="onSort($event)" responsiveLayout="scroll" stripedRows
                   selectionMode="single" v-model:selection="selectedDespesa"  editMode="row" @row-edit-save="onRowEditSave"
                   v-model:editingRows="editingRows">
          <template #empty>No customers found.</template>
          <template #loading>Loading despesas data. Please wait.</template>

          <Column field="id" header="Id" :sortable="true" class="columnId"></Column>

          <Column field="tipoDespesa" header="Despesa" :sortable="true" style="width: 170px;">
            <template #editor="{ data, field }">
              <Dropdown v-model="data[field]" :options="tipos" optionLabel="nome" style="width: 100%;" :filter="true" scrollHeight="400px">
                <template #option="slotProps">
                  <span>{{slotProps.option.nome}}</span>
                </template>
              </Dropdown>
            </template>

            <template #body="slotProps" >
              <div>{{slotProps.data.tipoDespesa.nome}}</div>
            </template>
          </Column>

          <Column field="data" header="Data" :sortable="true" style="width: 130px;">
            <template #editor="{ data, field }">
              <CampoData @custom-change="(s) => data[field] = s" :defaultValue="util.formatDateBr(data[field])"/>
            </template>
            <template #body="slotProps" >
              <div class="textCenter">{{util.formatDateBr(slotProps.data.data)}}</div>
            </template>
          </Column>

          <Column field="fornecedor" header="Fornecedor" :sortable="true">
            <template #editor="{ data, field }">
              <Dropdown v-model="data[field]" :options="fornecedores" optionLabel="nome" style="width: 100%;" :filter="true" scrollHeight="400px">
                <template #option="slotProps">
                  <span>{{slotProps.option.nome}}</span>
                </template>
              </Dropdown>
            </template>

            <template #body="slotProps" >
              <div>{{slotProps.data.fornecedor.nome}}</div>
            </template>
          </Column>

          <Column field="formaPagamento" header="Pagamento" :sortable="true">
            <template #editor="{ data, field }">
              <Dropdown v-model="data[field]" :options="formasPgto" optionLabel="nome" style="width: 100%;" :filter="true" scrollHeight="400px">
                <template #option="slotProps">
                  <span>{{slotProps.option.nome}}</span>
                </template>
              </Dropdown>
            </template>

            <template #body="slotProps" >
              <div>{{slotProps.data.formaPagamento.nome}}</div>
            </template>
          </Column>

          <Column field="valor" header="Valor" class="columnCurrency">
            <template #editor="{ data, field }">
              <CampoMoeda @custom-change="(s) => data[field] = s" :defaultValue="util.formatCurrencyBR(data[field])"/>
            </template>

            <template #body="slotProps" >
              <div class="textRight">{{util.formatCurrencyBR(slotProps.data.valor)}}</div>
            </template>
          </Column>

          <Column :rowEditor="true" :styles="{width:'10%', 'min-width':'8rem'}" :bodyStyle="{'text-align':'center'}" ></Column>

          <!--      <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">-->
          <!--        <template #body>-->
          <!--          <Button type="button" icon="pi pi-pencil" class="p-button-success p-button-sm"></Button>-->
          <!--        </template>-->
          <!--      </Column>-->
          <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
            <template #body>
              <Button type="button" icon="pi pi-trash" class="p-button-danger p-button-sm"></Button>
            </template>
          </Column>

          <template #footer>
            <div class="textRight">Total: {{util.formatCurrencyBR(valorTotal)}}</div>
          </template>

        </DataTable>
        <Paginator :rows="rows" :totalRecords="totalLinas" @page="onPage($event)" :rowsPerPageOptions="[10,15,20,25]"></Paginator>

      </div>

    </div>
  </Panel>
</template>

<script>
import despesaMixin from "@/views/despesa/mixin/despesaMixin";
import ComboTipo from "@/components/ComboTipo.vue";
import CampoData from "@/components/CampoData.vue";
import CampoMoeda from "@/components/CampoMoeda.vue";

export default {
  components: {ComboTipo, CampoData, CampoMoeda},
  mixins: [despesaMixin]
}
</script>