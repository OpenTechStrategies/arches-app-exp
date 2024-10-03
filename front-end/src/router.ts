import { createWebHistory, createRouter } from 'vue-router';

import SearchView from '@/views/SearchView.vue';
import ResourceDetailView from '@/views/ResourceDetailView.vue';

const routes = [
  { path: '/', component: SearchView },
  {
    path: '/wac/resource/:id',
    component: ResourceDetailView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
