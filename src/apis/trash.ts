import {friendlyDate} from '@/helpers/util';

const request = require('@/helpers/request.js').default;

const URL = {
  GET: 'notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
};

export default {
  getAll() {
    return new Promise<Note>((resolve, reject) => {
      request(URL.GET).then((res: Note) => {
        res.data.forEach(note => {
          note.friendlyCreatedAt = friendlyDate(note.createdAt);
          note.friendlyUpdatedAt = friendlyDate(note.updatedAt);
        });
        res.data.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1);
        resolve(res);
      }).catch((err: {}) => reject(err));
    });
  },
  revertNote(noteId: number) {
    return request(URL.REVERT.replace(':noteId', noteId.toString()), 'PATCH');
  },
  deleteNote(noteId: number) {
    return request(URL.DELETE.replace(':noteId', noteId.toString()), 'DELETE');
  }
};