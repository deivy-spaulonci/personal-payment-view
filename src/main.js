import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Paginator from 'primevue/paginator';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Fieldset from 'primevue/fieldset';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Tooltip from 'primevue/tooltip';
import FocusTrap from 'primevue/focustrap';

import 'primevue/resources/themes/nano/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css'

import './assets/main.css'

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component('Button', Button);
app.component('TabMenu', TabMenu);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Panel', Panel);
app.component('Paginator', Paginator);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('InputNumber', InputNumber);
app.component('Fieldset', Fieldset);
app.component('InputMask', InputMask);
app.directive('tooltip', Tooltip);
app.directive('focustrap', FocusTrap);

app.mount('#app')
