import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import GAuth from 'vue-google-oauth2';
import { guest, api } from './axios';
import { cookie } from './cookies';

import PrimeVue  from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';


import 'primevue/resources/themes/saga-blue/theme.css';      //theme
import 'primevue/resources/primevue.min.css';                //core css
import 'primeicons/primeicons.css';                          // icons
import 'primeflex/primeflex.css';

Vue.config.productionTip = false 

const gauthOption = {
  clientId: `${process.env.VUE_APP_GOOGLE_CLIENT_ID}`,
  scope: 'profile email',
  prompt: 'consent'
}
Vue.use(GAuth, gauthOption);

Vue.use(PrimeVue);
Vue.use(ConfirmationService);
Vue.component('Button', Button);
Vue.component('Card', Card);
Vue.component('FileUpload', FileUpload);
Vue.component('Dialog', Dialog);
Vue.component('InputText', InputText);
Vue.component('Textarea', Textarea);
Vue.component('ConfirmDialog', ConfirmDialog);

new Vue({
  router,
  guest,
  api,
  cookie,
  render: h => h(App),
}).$mount('#app')
