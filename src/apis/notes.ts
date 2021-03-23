import {friendlyDate} from '@/helpers/util';

const request = require('@/helpers/request.js').default;

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
};

export default {
  getAll(notebookId: number) {
    return new Promise<Note>((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId.toString()))
        .then((res: Note) => {
          res.data.forEach(note => {
            note.friendlyCreatedAt = friendlyDate(note.createdAt);
            note.friendlyUpdatedAt = friendlyDate(note.updatedAt);
          });
          res.data.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1);
          resolve(res);
        }).catch((err: {}) => reject(err));
    });
  },
  addNote(notebookId: number, {title = '', content = ''} = {title: '', content: ''}) {
    return new Promise<NewNote>((resolve, reject) => {
      request(URL.ADD.replace(':notebookId', notebookId.toString()), 'POST', {title, content})
        .then((res: NewNote) => {
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
          res.data.friendlyUpdatedAt = friendlyDate(res.data.updatedAt);
          resolve(res);
        }).catch((err: {}) => reject(err));
    });
  },
  updateNote(noteId: number, title: string, content: string) {
    return request(URL.UPDATE.replace(':noteId', noteId.toString()), 'PATCH', {title, content});
  },
  deleteNote(noteId: number) {
    return request(URL.DELETE.replace(':noteId', noteId.toString()), 'DELETE');
  }
};