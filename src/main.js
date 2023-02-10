import { createApp } from 'vue'
import App from './App.vue'
import Panel from 'primevue/panel';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                //core css
import 'primeicons/primeicons.css'                        //icons

// import './assets/main.css'

import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(PrimeVue).mount('#app')
app.component('Panel', Panel);
