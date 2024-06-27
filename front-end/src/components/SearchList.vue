<template>
  <div class="search-list-container">
    <div class="search-list">
      <ResourceListItem
        v-for="result in props.searchResults.items"
        :key="result._id"
        :resource-name="result._source.displayname"
        :resource-id="result._source.resourceinstanceid"
        :resource-type="props.graphTable.get(result._source.graph_id)"
        @set-resource="setResource"
      />
    </div>
    <div class="button-container">
      <SearchListButton
        type="previous"
        :flag="props.pageValues.has_previous"
        @previous="getPreviousPage"
      />
      <SearchListButton type="next" :flag="props.pageValues.has_next" @next="getNextPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { useResourceStore } from '@/stores/resourceStore';
import type { SearchResultArray } from '../types';
import ResourceListItem from './ResourceListItem.vue';
import SearchListButton from './SearchListButton.vue';
const store = useResourceStore();
const props = defineProps<{
  pageValues: {
    has_next: Ref<boolean>;
    has_previous: Ref<boolean>;
  };
  searchResults: SearchResultArray;
  graphTable: Map<string, string>;
}>();

const emit = defineEmits(['next-page', 'previous-page']);

const getNextPage = () => {
  emit('next-page');
};
const getPreviousPage = () => {
  emit('previous-page');
};

const setResource = (resourceId: string) => {
  store.$patch({
    resourceId: resourceId
  });
};
</script>

<style scoped>
.search-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-list {
  flex-grow: 1;
  overflow-y: auto;
}

.button-container {
  display: flex;
  justify-content: space-between;
  background-color: var(--color-white);
  padding: 10px 0;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.button-container button {
  background-color: var(--color-dark-green);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.button-container button:hover {
  background-color: var(--color-light-green);
  transform: translateY(-2px);
}

.button-container button:disabled {
  background-color: var(--color-grey);
  cursor: not-allowed;
}
</style>
