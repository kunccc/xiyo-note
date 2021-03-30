import Trash from '@/apis/trash';
import {ActionTree} from 'vuex';
import {Message} from 'element-ui';

const state = {
  trashNotes: null,
  curTrashNoteId: null
};
const getters = {
  trashNotes: (state: { trashNotes: [] }) => state.trashNotes || [],
  curTrashNote: (state: { trashNotes: []; curTrashNoteId: number }, getters: { trashNotes: {}[] }) => {
    if (!state.curTrashNoteId) return getters.trashNotes[0] || {};
    return state.trashNotes.find((note: { id: number }) => note.id === state.curTrashNoteId) || {};
  },
  belongTo: (state: {}, getters: { curTrashNote: { notebookId: number } }, rootState: {}, rootGetters: { notebooks: { id: number; title: string }[] }) => {
    const notebook = rootGetters.notebooks.find(notebook => notebook.id === getters.curTrashNote.notebookId) || {title: ''};
    return notebook.title;
  }
};
const mutations = {
  setTrashNotes(state: { trashNotes: [] }, payload: { trashNotes: [] }) {
    state.trashNotes = payload.trashNotes;
  },
  deleteTrashNote(state: { trashNotes: { id: number }[] }, payload: { noteId: number }) {
    state.trashNotes = state.trashNotes.filter(note => note.id !== payload.noteId);
  },
  setCurTrashNote(state: { curTrashNoteId: number }, payload: { noteId: string } = {noteId: ''}) {
    state.curTrashNoteId = parseInt(payload.noteId);
  }
};
const actions: ActionTree<any, {}> = {
  getTrashNotes({commit}) {
    return Trash.getAll().then(res => {
      commit('setTrashNotes', {trashNotes: res.data});
    });
  },
  deleteTrashNote({commit}, {noteId}) {
    return Trash.deleteNote(noteId).then((res: { msg: string }) => {
      commit('deleteTrashNote', {noteId});
      Message.success(res.msg);
    });
  },
  revertTrashNote({commit}, {noteId}) {
    return Trash.revertNote(noteId).then((res: { msg: string }) => {
      commit('deleteTrashNote', {noteId});
      Message.success(res.msg);
    });
  }
};
export default {state, getters, mutations, actions};