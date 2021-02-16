require('../src/css/main.css');
// Global Variables
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const token = localStorage.getItem('user-token')
if (token) {
  window.axios.defaults.headers.common['Authorization'] = token;
}
import Vue from 'vue'
import router from '@/router.js'
import store from './store/index.js'
import moment from 'moment'
import App from './App'
import FullCalendar from 'vue-full-calendar'
import './registerServiceWorker'
import CKEditor from '@ckeditor/ckeditor5-vue';
import "fullcalendar/dist/fullcalendar.min.css";
import VueHtmlToPaper from 'vue-html-to-paper';
import Print from 'vue-print-nb'
import { Api } from '@/services/api.js'

(async () => {
  await Api.init()
})()

Vue.prototype.$api = Api

Vue.use(Print);
Vue.use(FullCalendar);
Vue.use( CKEditor );
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
