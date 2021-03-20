import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Icon from '@/components/Icon.vue';
import {Message, MessageBox} from 'element-ui';
import './assets/styles/element-variables.scss';

Vue.config.productionTip = false;

Vue.component('Icon', Icon);
Vue.component('Message', Message);
Vue.component('MessageBox', MessageBox);
Vue.prototype.$message = Message;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');