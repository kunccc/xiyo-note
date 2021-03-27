import Notes from '@/apis/notes';
import {ActionTree} from 'vuex';
import {Message} from 'element-ui';

const state = {
  notebook: null,
  curNoteId: null
};
const getters = {
  notebook: (state: { notebook: [] }) => state.notebook || [],
  curNote: (state: { notebook: { id: number }[]; curNoteId: number }) => {
    if (!Array.isArray(state.notebook)) return {};
    if (!state.curNoteId) return state.notebook[0] || {};
    return state.notebook.find(note => note.id === state.curNoteId);
  }
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
  },
  setCurNote(state: { curNoteId: number }, payload: { curNoteId: string }) {
    state.curNoteId = parseInt(payload.curNoteId);
  }
};
const actions: ActionTree<Function, {}> = {
  getNotebook({commit}, {notebookId}) {
    return Notes.getAll(notebookId).then(res => {
      commit('setNotebook', {notebook: res.data});
    });
  },
  addNote({commit}, {notebookId, title, content}) {
    return Notes.addNote(notebookId, {title, content}).then(res => {
      commit('addNote', {note: res.data});
    });
  },
  updateNote({commit}, {noteId, title, content}) {
    return Notes.updateNote(noteId, title, content).then(() => {
      commit('updateNote', {noteId});
    });
  },
  deleteNote({commit}, {noteId}) {
    return Notes.deleteNote(noteId).then((res: { msg: string }) => {
      commit('deleteNote', {noteId});
      Message.success(res.msg);
    });
  }
};

export default {state, getters, mutations, actions};