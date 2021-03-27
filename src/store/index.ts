import Vue from 'vue';
import Vuex from 'vuex';
import notebook from './modules/notebook';
import note from '@/store/modules/note';
import user from '@/store/modules/user';
import trash from '@/store/modules/trash';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notebook,
    note,
    user,
    trash
  }
});