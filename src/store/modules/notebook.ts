import Notebooks from '@/apis/notebooks';
import {ActionTree} from 'vuex';
import {Message} from 'element-ui';

const state = {
  notebooks: null,
  curBookId: null
};
const getters = {
  notebooks: (state: { notebooks: [] }) => state.notebooks || [],
  curBook: (state: { notebooks: { id: number }[]; curBookId: number }) => {
    if (!Array.isArray(state.notebooks)) return {};
    if (!state.curBookId) return state.notebooks[0] || {};
    return state.notebooks.find(notebook => notebook.id === state.curBookId);
  }
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
  },
  setCurBook(state: { curBookId: number }, payload: { curBookId: number }) {
    state.curBookId = payload.curBookId;
  }
};
const actions: ActionTree<Function, {}> = {
  getNotebooks({commit}) {
    return Notebooks.getAll().then(res => {
      commit('setNotebooks', {notebooks: res.data});
    });
  },
  addNotebook({commit}, {title}) {
    return Notebooks.addNotebook({title}).then(res => {
      commit('addNotebook', {notebook: res.data});
      Message.success(res.msg);
    });
  },
  updateNotebook({commit}, {notebookId, title}) {
    return Notebooks.updateNotebook(notebookId, {title}).then((res: { msg: string }) => {
      commit('updateNotebook', {notebookId, title});
      Message.success(res.msg);
    });
  },
  deleteNotebook({commit}, {notebookId}) {
    return Notebooks.deleteNotebook(notebookId).then((res: { msg: string }) => {
      commit('deleteNotebook', {notebookId});
      Message.success(res.msg);
    });
  }
};

export default {state, getters, mutations, actions};