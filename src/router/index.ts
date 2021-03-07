import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Login from '@/views/Login.vue';
import NotebookList from '@/views/NotebookList.vue';
import NoteDetail from '@/views/NoteDetail.vue';
import TrashDetail from '@/views/TrashDetail.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/notebooks',
    component: NotebookList
  },
  {
    path: '/note/:noteId',
    component: NoteDetail
  },
  {
    path: '/trash/:noteId',
    component: TrashDetail
  }
];

const router = new VueRouter({
  routes
});

export default router;
