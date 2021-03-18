import {friendlyDate} from '@/helpers/util';

const request = require('@/helpers/request.js').default;

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
};

export default {
  getAll() {
    return new Promise<BookList>((resolve, reject) => {
      request(URL.GET).then((res: BookList) => {
        res.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
        res.data.forEach(notebook => notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt));
        resolve(res);
      }).catch((err: {}) => reject(err));
    });
  },
  addNotebook({title = ''} = {title: ''}) {
    return new Promise<NewNotebook>((resolve, reject) => {
      request(URL.ADD, 'POST', {title}).then((res: NewNotebook) => {
        res.data.noteCounts = 0;
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
        resolve(res);
      }).catch((err: {}) => reject(err));
    });
  },
  updateNotebook(notebookId: string, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title});
  },
  deleteNotebook(notebookId: string) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE');
  }
};