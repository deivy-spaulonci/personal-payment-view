import DefaultService from "@/service/DefaultService";


export default {
    data() {
        return {
            loading: false,
            selectedConta: null,
            expandedRows: [],
            totalLinas: 0,
            rows: 10,
            data: [],
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
        async getDataFornecedor(){
            this.loading = true;
            let url = '';

            const res = await this.defaultService.get('fornecedor/page?'+url);
            this.data = await res.content;
            this.totalLinas =  await res.totalElements;

            this.loading = false;
        },
        async onRowEditSave(event) {
            this.loading = true;
            let { newData, index } = event;
             console.log(newData)
             console.log(index)
            // // this.products2[index] = newData;
            // if(newData.data.toString().indexOf('-') == -1){//foi alterado
            //     newData.data = this.util.formatData(newData.data);
            // }
            // let result = await this.defaultService.post('despesa',newData);
            // console.log(result);
            // this.getDataDespesa();
        },


        onRowExpand(event) {
            this.$toast.add({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
        },
        onRowCollapse(event) {
            this.$toast.add({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
        },
        expandAll() {
            this.expandedRows = this.products.filter(p => p.id);
            this.$toast.add({severity: 'success', summary: 'All Rows Expanded', life: 3000});
        },
        collapseAll() {
            this.expandedRows = null;
            this.$toast.add({severity: 'success', summary: 'All Rows Collapsed', life: 3000});
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