<script setup lang="ts">
import { ref } from 'vue';
import type { SearchResultArray } from '../types';
const searchResults = ref<SearchResultArray | null>();

async function fetchSearchResults() {
  const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/search/resources`);
  const params = new URLSearchParams({
    'paging-filter': '1',
    'resource-type-filter': `[{"graphid":"${import.meta.env.VITE_ARTWORK_GRAPH_ID}","name":"Artwork","inverted":false}]`
  });
  url.search = params.toString();

  const response = await fetch(url.toString()).then((res) => res.json());
  searchResults.value = { items: response.results.hits.hits };
}

fetchSearchResults();
</script>

<template>
  <slot :searchResults="searchResults" />
</template>

<style scoped></style>
