import { createWebHistory, createRouter } from 'vue-router';

import SearchView from '@/views/SearchView.vue';
import ResourceDetailView from '@/views/ResourceDetailView.vue';

const routes = [
  { path: '/archesdataviewer/home/', component: SearchView },
  { path: '/', component: SearchView },
  {
    path: '/archesdataviewer/home/resource/:id',
    component: ResourceDetailView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
