<script setup lang="ts">
import { ref } from 'vue';
import type { SearchResultArray } from '../types';
const page = ref(1);
const searchResults = ref<SearchResultArray | null>();
const has_next = ref(true);
const has_previous = ref(false);

async function fetchSearchResults() {
  const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/search/resources`);
  const params = new URLSearchParams({
    'paging-filter': page.value.toString()
  });
  url.search = params.toString();

  const response = await fetch(url.toString()).then((res) => res.json());
  has_next.value = response['paging-filter'].paginator.has_next;
  has_previous.value = response['paging-filter'].paginator.has_previous;
  searchResults.value = { items: response.results.hits.hits };
}

fetchSearchResults();

const fetchNextPage = () => {
  if (has_next.value) {
    page.value++;
    fetchSearchResults();
  } else {
    has_next.value = false;
  }
};

const fetchPreviousPage = () => {
  if (has_previous.value) {
    page.value--;
    fetchSearchResults();
  } else {
    has_previous.value = false;
  }
};

const pageValues = {
  has_next: has_next,
  has_previous: has_previous
};
</script>

<template>
  <slot
    :search-results="searchResults"
    :fetch-next-page="fetchNextPage"
    :fetch-previous-page="fetchPreviousPage"
    :page-values="pageValues"
  />
</template>

<style scoped></style>
