import { createWebHistory, createRouter } from 'vue-router';

import SearchView from '@/views/SearchView.vue';
import ResourceDetailView from '@/views/ResourceDetailView.vue';
import AboutView from '@/views/AboutView.vue';
import ArtistsView from './views/ArtistsView.vue';
import ArtworksView from './views/ArtworksView.vue';
import MapView from './views/MapView.vue';

const routes = [
  { path: '/', component: SearchView },
  {
    path: '/wac/resource/:id',
    component: ResourceDetailView
  },
  {
    path: '/artists',
    component: ArtistsView
  },
  {
    path: '/artworks',
    component: ArtworksView
  },
  {
    path: '/about',
    component: AboutView
  },
  {
    path: '/map',
    component: MapView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
