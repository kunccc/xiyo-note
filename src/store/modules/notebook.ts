import Notebooks from '@/apis/notebooks';
import {ActionTree} from 'vuex';
import {Message} from 'element-ui';

const state = {
  notebooks: []
};
const getters = {
  notebooks: (state: { notebooks: [] }) => state.notebooks
};
const mutations = {
  setNotebooks(state: { notebooks: [] }, payload: { notebooks: [] }) {
    state.notebooks = payload.notebooks;
  },
  addNotebook(state: { notebooks: {}[] }, payload: { notebook: {} }) {
    state.notebooks.unshift(payload.notebook);
  },
  updateNotebook(state: { notebooks: { id: number; title: string }[] }, payload: { notebookId: number; title: string }) {
    const notebook = state.notebooks.find(notebook => notebook.id === payload.notebookId) || {title: ''};
    notebook.title = payload.title;
  },
  deleteNotebook(state: { notebooks: { id: number }[] }, payload: { notebookId: number }) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id !== payload.notebookId);
  }
};
const actions: ActionTree<Function, {}> = {
  getNotebooks({commit}) {
    Notebooks.getAll().then(res => {
      commit('setNotebooks', {notebooks: res.data});
    });
  },
  addNotebook({commit}, payload) {
    Notebooks.addNotebook({title: payload.title}).then(res => {
      commit('addNotebook', {notebook: res.data});
      Message.success(res.msg);
    });
  },
  updateNotebook({commit}, payload) {
    Notebooks.updateNotebook(payload.notebookId, {title: payload.title}).then((res: { msg: string }) => {
      commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title});
      Message.success(res.msg);
    });
  },
  deleteNotebook({commit}, payload) {
    Notebooks.deleteNotebook(payload.notebookId).then((res: { msg: string }) => {
      commit('deleteNotebook', {notebookId: payload.notebookId});
      Message.success(res.msg);
    });
  }
};

export default {state, getters, mutations, actions};