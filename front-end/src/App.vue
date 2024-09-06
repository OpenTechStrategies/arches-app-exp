<template>
  <main>
    <Home
      :id-references="idReferences"
      :images-prefetch="imagesPrefetch"
      :locations-prefetch="locationsPrefetch"
      :resource-relations-prefetch="resourceRelationsPrefetch"
      :resources-prefetch="resourcesPrefetch"
      :loading="loading"
    />
  </main>
</template>

<script setup lang="ts">
import Home from '@/pages/HomePage.vue';
import { ref } from 'vue';
import type {
  ImageTileData,
  Tile,
  CoordinatesTileData,
  Resource,
  Prefetch,
  ResourceXResource
} from './types';

const idReferences = ref<Prefetch['idReferences'] | undefined>(undefined);
const imagesPrefetch = ref<Array<Tile<ImageTileData[]>> | undefined>(undefined);
const locationsPrefetch = ref<Array<Tile<CoordinatesTileData>> | undefined>(undefined);
const resourceRelationsPrefetch = ref<Array<ResourceXResource> | undefined>(undefined);
const resourcesPrefetch = ref<Array<Resource> | undefined>(undefined);

const loading = ref(true);

async function prefetchResources() {
  try {
    const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/archesdataviewer/prefetch`);
    const response = await fetch(url.toString());
    const data: Prefetch = await response.json();
    idReferences.value = data.idReferences;
    imagesPrefetch.value = data.images;
    locationsPrefetch.value = data.locations;
    resourceRelationsPrefetch.value = data.resourceRelations;
    resourcesPrefetch.value = data.resources;
  } catch (error) {
    idReferences.value = undefined;
    imagesPrefetch.value = undefined;
    locationsPrefetch.value = undefined;
    resourceRelationsPrefetch.value = undefined;
    resourcesPrefetch.value = undefined;
  } finally {
    loading.value = false;
  }
}

prefetchResources();
</script>

<style scoped>
main {
  background-color: var(--color-background);
  color: var(--color-text);
  padding: 20px;
}
</style>
