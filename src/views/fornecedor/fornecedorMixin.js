import DefaultService from "@/service/DefaultService";


export default {
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
            c:null,
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
            this.getDataDespesa();
        },
        onPage(event) {
            this.lazyParams = event;
            this.getDataFornecedor();
        },
        keyUpIdFilter(event){
            this.idFilter = event.value;
            this.getDataFornecedor();
        },
        async getCidades(nome){
            this.cidades = await this.defaultService.get('cidade?nome='+nome);
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
            // this.despesaCadastro.data = this.util.formatData(this.despesaCadastro.data);
            // this.despesaCadastro.valor = this.despesaCadastro.valor.replaceAll('.','').replaceAll(',', '.');
            //
            // await this.defaultService.post('despesa',this.despesaCadastro);
            // this.getDataDespesa();
        },
        async getCnpj(){
            // this.fornecedorCadastro.cnpj = this.fornecedorCadastro.cnpj.replace(/\D/g, '');
            //
            // let result = await this.defaultService.get('fornecedor/consultacnpj?cnpj='+this.fornecedorCadastro.cnpj);
            // this.fornecedorCadastro.nome = result.fantasia ? result.fantasia : result.nome;
            // this.fornecedorCadastro.razaoSocial = result.nome ? result.nome : result.fantasia;
            // this.fornecedorCadastro.inscricaoEstadual = '';
            // this.fornecedorCadastro.endereco = result.logradouro + " " + result.numero;
            // this.fornecedorCadastro.bairro = result.bairro;
            // this.fornecedorCadastro.complemento = result.complemento;
            // this.fornecedorCadastro.cep = result.cep;
            // this.fornecedorCadastro.telefone = result.telefone;
            // this.getCidades(result.municipio)

            // console.log(JSON.stringify(result))

        }
    },
    mounted() {
        this.loading = true;
        this.getDataFornecedor();
    },
    created() {
        this.defaultService = new DefaultService();
    }
}