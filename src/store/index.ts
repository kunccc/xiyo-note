import Vue from 'vue';
import Vuex from 'vuex';
import notebook from './modules/notebook';
import note from '@/store/modules/note';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notebook,
    note,
  }
});