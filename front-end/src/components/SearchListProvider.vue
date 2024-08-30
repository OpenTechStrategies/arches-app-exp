<template>
  <Transition>
    <slot :search-results="searchResults" :page-values="pageValues" :search-query="searchQuery" />
  </Transition>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { SearchResultArray } from '../types';

const page = ref(1);
const searchResults = ref<SearchResultArray | null>();
const has_next = ref(true);
const has_previous = ref(false);
const searchQuery = reactive({ resourceName: '', resourceGraphId: '' });

const props = defineProps<{
  graphTable: Map<string, string>;
}>();

interface fetchSearchResultsProps {
  resourceName?: string;
  resourceGraphId?: string;
}

async function fetchSearchResults({ resourceName, resourceGraphId }: fetchSearchResultsProps = {}) {
  const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/search/resources`);

  const params = new URLSearchParams({
    'paging-filter': page.value.toString()
  });

  if (resourceName) {
    params.append(
      'term-filter',
      `[{"inverted":false,"type":"string","context":"","context_label":"","id":"${resourceName}","text":"${resourceName}","value":"${resourceName}","selected":true}]`
    );
  }

  if (resourceGraphId) {
    params.append(
      'resource-type-filter',
      `[{"graphid":"${resourceGraphId}","name":"${props.graphTable.get(resourceGraphId)}","inverted":false}]`
    );
  }

  url.search = params.toString();

  const response = await fetch(url.toString()).then((res) => res.json());
  has_next.value = response['paging-filter'].paginator.has_next;
  has_previous.value = response['paging-filter'].paginator.has_previous;
  searchResults.value = { items: response.results.hits.hits };
}

fetchSearchResults(searchQuery);

watch(
  () => ({ resourceGraphId: searchQuery.resourceGraphId, resourceName: searchQuery.resourceName }),
  async (newQuery) => {
    try {
      await fetchSearchResults(newQuery);
    } catch (error) {
      console.error('Unhandled error during execution of watcher callback', error);
    }
  },
  { deep: true, immediate: true }
);

const pageValues = {
  has_next: has_next,
  has_previous: has_previous
};
</script>

<style scoped></style>
