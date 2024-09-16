import { createWebHistory, createRouter } from 'vue-router';

import SearchView from '@/views/SearchView.vue';
import ResourceDetailView from '@/views/ResourceDetailView.vue';

const routes = [
  { path: import.meta.env.PROD ? '/archesdataviewer/' : '/', component: SearchView },
  { path: import.meta.env.PROD ? '/archesdataviewer/resource/:id' : '/resource/:id', component: ResourceDetailView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
