import { createWebHistory, createRouter } from 'vue-router';

import SearchView from '@/views/SearchView.vue';
import ResourceDetailView from '@/views/ResourceDetailView.vue';
import AboutView from '@/views/AboutView.vue';
import ArtistsView from './views/ArtistsView.vue';
import ArtworksView from './views/ArtworksView.vue';

const routes = [
  { path: '/', component: SearchView },
  {
    path: '/wac/resource/:id',
    component: ResourceDetailView
  },
  {
    path: '/artists',
    component: ArtistsView,
    props: { routeQuery: 'artists' }
  },
  {
    path: '/artworks',
    component: ArtworksView,
    props: { routeQuery: 'artworks' }
  },
  {
    path: '/about',
    component: AboutView,
    props: { routeQuery: 'about' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
