import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    alias: '/notebooks',
    component: () => import('@/views/NotebookList.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/note',
    component: () => import('@/views/NoteDetail.vue')
  },
  {
    path: '/trash',
    component: () => import('@/views/TrashDetail.vue')
  },
  {
    path: '*',
    component: () => import('@/components/NotFound.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
