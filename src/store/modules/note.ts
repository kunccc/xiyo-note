import Notes from '@/apis/notes';
import {ActionTree} from 'vuex';
import {Message} from 'element-ui';

const state = {
  notebook: [],
  curNote: {}
};
const getters = {
  notebook: (state: { notebook: [] }) => state.notebook,
  curNote: (state: { curNote: {} }) => state.curNote
};
const mutations = {
  setNotebook(state: { notebook: [] }, payload: { notebook: [] }) {
    state.notebook = payload.notebook;
  },
  addNote(state: { notebook: {}[] }, payload: { note: {} }) {
    state.notebook.unshift(payload.note);
  },
  updateNote(state: { curNote: { id: number }; notebook: { id: number }[] }, payload: { noteId: number }) {
    const note = state.notebook.find(note => note.id === payload.noteId);
    if (note) state.curNote = note;
  },
  deleteNote(state: { notebook: { id: number }[] }, payload: { noteId: number }) {
    state.notebook.filter(note => note.id !== payload.noteId);
  }
};
const actions: ActionTree<Function, {}> = {
  getNotebook({commit}, {notebookId}) {
    Notes.getAll(notebookId).then(res => {
      commit('setNotebook', {notebook: res.data});
    });
  },
  addNote({commit}, {notebookId, title, content}) {
    Notes.addNote(notebookId, {title, content}).then(res => {
      commit('addNote', {note: res.data});
      Message.success(res.msg);
    });
  },
  updateNote({commit}, {noteId, title, content}) {
    Notes.updateNote(noteId, title, content).then((res: { msg: string }) => {
      commit('updateNote', {noteId});
      Message.success(res.msg);
    });
  },
  deleteNote({commit}, {noteId}) {
    Notes.deleteNote(noteId).then((res: { msg: string }) => {
      commit('deleteNote', {noteId});
      Message.success(res.msg);
    });
  }
};

export default {state, getters, mutations, actions};