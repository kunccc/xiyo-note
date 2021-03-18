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
        res.data.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf());
        res.data.forEach(notebook => notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt));
        resolve(res);
      }).catch((err: {}) => reject(err));
    });
  },
  addNotebook({title = ''} = {title: ''}) {
    return request(URL.ADD, 'POST', {title});
  },
  updateNotebook(notebookId: string, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title});
  },
  deleteNotebook(notebookId: string) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE');
  }
};