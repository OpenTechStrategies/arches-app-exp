<script setup lang="ts">
import { ref } from 'vue';
import type { MapArtwork } from '../types';
const artworks = ref<Array<MapArtwork> | null>();

async function fetchSearchResults() {
  const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/archesdataviewer/artworks`);

  const response = await fetch(url.toString()).then((res) => res.json());
  artworks.value = response;
}
fetchSearchResults();
</script>

<template>
  <slot :artworks="artworks" />
</template>

<style scoped></style>
