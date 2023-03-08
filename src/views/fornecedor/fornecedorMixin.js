import DefaultService from "@/service/DefaultService";
import Util from "@/util/Util";
import {useToast} from "primevue/usetoast";

export default {
    setup() {
        const toast = useToast();
        toast.add({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});
    },
    data() {
        return {
            loading: false,
            selectedConta: null,
            idFilter: null,
            nomeFilter: null,
            cnpjFilter: null,
            expandedRows: [],
            totalLinas: 0,
            lazyParams: {},
            rows: 20,
            data: [],
            cidades:[],
            cidadesDb:[],
            fornecedorCadastro:{
                id:null,
                nome:null,
                razaoSocial:null,
                cnpj:null,
                inscricaoEstadual:null,
                endereco:null,
                bairro:null,
                complemento:null,
                cep:null,
                telefone:null,
                cidade:null,
            }
        }
    },
    defaultService: null,
    methods:{
        onSort(event) {
            this.lazyParams = event;
            this.getDataFornecedor();
        },
        onPage(event) {
            this.lazyParams = event;
            this.getDataFornecedor();
        },
        keyUpIdFilter(event){
            this.idFilter = event.value;
            this.getDataFornecedor();
        },
        async getCidades(){
            this.cidadesDb = await this.defaultService.get('cidade');
        },
        async getDataFornecedor(){
            // if(this.selectedTipoDespesa)
            //     url += '&tipoDespesa=' + this.selectedTipoDespesa.value;

            this.loading = true;
            let url = '';

            if(this.lazyParams.sortField)
                url += 'sort=' + (this.lazyParams.sortField)+','+(this.lazyParams.sortOrder==1 ? 'asc' : 'desc');
            else
                url += 'sort=nome,asc';

            if(this.lazyParams.page) {
                url += '&page=' + this.lazyParams.page + '&size=' + this.lazyParams.rows;
                this.rows = this.lazyParams.rows;
            }else
                url += '&page=0&size=' + (this.lazyParams.rows ? this.lazyParams.rows : this.rows);

            if(this.idFilter)
                url += '&id=' + this.idFilter;
            if(this.nomeFilter)
                url += '&nome=' + this.nomeFilter;
            if(this.cnpjFilter)
                url += '&cnpj=' + this.cnpjFilter;

            const res = await this.defaultService.get('fornecedor/page?'+url);
            this.data = await res.content;
            this.totalLinas =  await res.totalElements;

            this.loading = false;
        },
        async cadastroFornecedor(){
            this.fornecedorCadastro.cnpj = this.fornecedorCadastro.cnpj.replace(/[^0-9]+/g, '');
            this.fornecedorCadastro.cep = this.fornecedorCadastro.cep.replace(/[^0-9]+/g, '');
            this.fornecedorCadastro.telefone = this.fornecedorCadastro.telefone.replace(/[^0-9]+/g, '');

            await this.defaultService.post('fornecedor',this.fornecedorCadastro);
            this.getDataFornecedor();
            this.fornecedorCadastro = {
                id:null,
                nome:null,
                razaoSocial:null,
                cnpj:null,
                inscricaoEstadual:null,
                endereco:null,
                bairro:null,
                complemento:null,
                cep:null,
                telefone:null,
                cidade:null,
            };
        },
        async getCnpj(){
            this.fornecedorCadastro.cnpj = this.fornecedorCadastro.cnpj.replace(/\D/g, '');

            let result = await this.defaultService.get('fornecedor/consultacnpj?cnpj='+this.fornecedorCadastro.cnpj);
            if(result.status=="ERROR"){
                this.$toast.add({severity:'error', summary: 'Error Message', detail:result.message, life: 3000});
            }else{
                this.fornecedorCadastro.nome = this.util.capt(result.fantasia ? result.fantasia : result.nome);
                this.fornecedorCadastro.razaoSocial = this.util.capt(result.nome ? result.nome : result.fantasia);
                this.fornecedorCadastro.inscricaoEstadual = '';
                this.fornecedorCadastro.endereco = this.util.capt(result.logradouro + " " + result.numero);
                this.fornecedorCadastro.bairro = this.util.capt(result.bairro);
                this.fornecedorCadastro.complemento = this.util.capt(result.complemento);
                this.fornecedorCadastro.cep = result.cep;
                this.fornecedorCadastro.telefone = result.telefone;

                this.cidades = this.cidadesDb.filter((e) =>
                    e.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase()==result.municipio.toLocaleLowerCase()
                );
            }
        },
        async editFornecedor(id){
            this.fornecedorCadastro = await this.defaultService.get('fornecedor/'+id);
            this.cidades = this.cidadesDb;
        }
    },
    mounted() {
        this.loading = true;
        this.getDataFornecedor();
        this.getCidades()
    },
    created() {
        this.defaultService = new DefaultService();
        this.util = new Util();
    },
}