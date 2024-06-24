<template>
  <div class="search-list-container">
    <div class="search-list">
      <SearchListItem
        v-for="result in props.searchResults.items"
        :key="result._id"
        :result="result"
        :graph-table="props.graphTable"
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
import SearchListItem from './SearchListItem.vue';
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
  gap: 10px;
  position: relative;
}

.search-list {
  overflow-y: auto;
  max-height: 70vh;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 10px 0;
}
</style>
