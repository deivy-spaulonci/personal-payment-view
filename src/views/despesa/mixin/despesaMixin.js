import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
export default {
    data() {
        return {
            editingRows: [],
            idFilter: null,
            dataInicial:null,
            dataFinal:null,
            selectedTipoDespesa: null,
            selectedFornecedor: null,
            selectedFormaPgto: null,
            selectedDespesa: null,
            tipos: [],
            fornecedores: [],
            formasPgto: [],
            loading: false,
            lazyParams: {},
            totalLinas: 0,
            filters: null,
            rows: 10,
            data: [],
            valorTotal: 0,
            despesaCadastro: {
                id:null,
                tipoDespesa: null,
                data:null,
                forenecedor: null,
                formaPagamento:null,
                valor:null,
                obs:null
            }
        }
    },
    defaultService: null,
    util:null,
    methods:{
        async getDataDespesa(){
            //console.log(JSON.stringify(this.lazyParams));

            this.loading = true;
            let url = '';
            if(this.lazyParams.sortField)
                url += 'sort=' + (this.lazyParams.sortField)+','+(this.lazyParams.sortOrder==1 ? 'asc' : 'desc');
            else
                url += 'sort=data,desc';

            if(this.lazyParams.page) {
                url += '&page=' + this.lazyParams.page + '&size=' + this.lazyParams.rows;
                this.rows = this.lazyParams.rows;
            }else
                url += '&page=0&size=' + (this.lazyParams.rows ? this.lazyParams.rows : this.rows);

            if(this.idFilter)
                url += '&id=' + this.idFilter;
            if(this.selectedTipoDespesa)
                url += '&tipoDespesa=' + this.selectedTipoDespesa.value;
            if(this.selectedFornecedor)
                url += '&fornecedor.id=' + this.selectedFornecedor.id;
            if(this.selectedFormaPgto)
                url += '&formaPagamento=' + this.selectedFormaPgto.value;
            if(this.dataInicial)
                url += '&dataInicial=' + this.dataInicial.toISOString().substring(0, 10);
            if(this.dataFinal)
                url += '&dataFinal=' + this.dataFinal.toISOString().substring(0, 10);

            console.log('despesa/page?'+url);
            const res = await this.defaultService.get('despesa/page?'+url);
            this.data = await res.content;
            this.totalLinas =  await res.totalElements;
            this.valorTotal = await this.defaultService.get('despesa/valorTotal?'+url);

            this.tipos = await this.defaultService.get('tipo-despesa');
            this.fornecedores = await this.defaultService.get('fornecedor');
            this.formasPgto = await this.defaultService.get('forma-pagamento')

            this.loading = false;
        },
        onSort(event) {
            this.lazyParams = event;
            this.getDataDespesa();
        },
        onPage(event) {
            this.lazyParams = event;
            this.getDataDespesa();
        },
        keyUpIdFilter(event){
            this.idFilter = event.value;
            this.getDataDespesa();
        },
        cadastroDespesa(){
            console.log(JSON.stringify(this.despesaCadastro));
        },
        onRowEditSave(event) {
            console.log(event)
            //let { newData, index } = event;

            //this.products2[index] = newData;
        }
    },
    mounted() {
        this.loading = true;
        this.getDataDespesa();
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    }
}