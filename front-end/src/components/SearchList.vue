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

<template>
  <div class="search-list-container">
    <div class="search-list">
      <SearchListItem
        v-for="result in props.searchResults.items"
        :result="result"
        :graphTable="props.graphTable"
        :key="result._id"
        @set-resource="setResource"
      />
    </div>
    <div class="button-container">
      <SearchListButton
        type="previous"
        @previous="getPreviousPage"
        :flag="props.pageValues.has_previous"
      />
      <SearchListButton type="next" @next="getNextPage" :flag="props.pageValues.has_next" />
    </div>
  </div>
</template>

<style scoped>
.search-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
}

.search-list {
  flex: 1;
  overflow-y: auto;
}

.button-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
