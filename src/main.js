import { createApp } from 'vue'
import App from './App.vue'
import 'v3-easyui/dist/themes/material/easyui.css';
import 'v3-easyui/dist/themes/icon.css';
import 'v3-easyui/dist/themes/vue.css';

import './assets/main.css'

import EasyUI from 'v3-easyui';

createApp(App).use(EasyUI).mount('#app')
