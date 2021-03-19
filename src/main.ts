import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Icon from '@/components/Icon.vue';
import {Message} from 'element-ui';

Vue.config.productionTip = false;

Vue.component('Icon', Icon);
Vue.component('Message', Message);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
