<script setup lang="ts">
import { ref } from 'vue';

const page = ref(1);
const resources = ref<any | null>([]);
const has_next = ref(true);
const has_previous = ref(false);

async function fetchResources() {
  const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/search/resources`);
  const params = new URLSearchParams({
    'paging-filter': page.value.toString()
  });
  url.search = params.toString();

  const response = await fetch(url.toString()).then((res) => res.json());
  has_next.value = response['paging-filter'].paginator.has_next;
  has_previous.value = response['paging-filter'].paginator.has_previous;
  resources.value = { items: response.results.hits.hits };
}
fetchResources();

const fetchNextPage = () => {
  if (has_next.value) {
    page.value++;
    fetchResources();
  } else {
    has_next.value = false;
  }
};

const fetchPreviousPage = () => {
  if (has_previous.value) {
    page.value--;
    fetchResources();
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
    :resources="resources"
    :fetchNextPage="fetchNextPage"
    :fetchPreviousPage="fetchPreviousPage"
    :pageValues="pageValues"
  />
</template>

<style scoped></style>
