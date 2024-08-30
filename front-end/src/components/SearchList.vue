<template>
  <div class="search-header">
    <div>Explore the artwork as a list</div>
    <div class="resource-selection-menu">
      <div>Everything</div>
      <div>Artists</div>
      <div>Artworks</div>
      <div>Photographs</div>
      <div>Structures</div>
    </div>
    <div>
      <input v-model="props.searchQuery.resourceName" placeholder="Search names..." />
    </div>
  </div>
  <div class="search-results">
    <SearchListItem
      v-for="result in props.searchResults.items"
      :key="result._id"
      :resource-name="result._source.displayname"
      :resource-description="result._source.displaydescription"
      :resource-id="result._source.resourceinstanceid"
      :resource-type="props.graphTable.get(result._source.graph_id)"
      @set-resource="setResource"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { useResourceStore } from '@/stores/resourceStore';
import type { SearchResultArray } from '../types';
import SearchListItem from './SearchListItem.vue';

const store = useResourceStore();
const props = defineProps<{
  pageValues: {
    has_next: Ref<boolean>;
    has_previous: Ref<boolean>;
  };
  searchResults: SearchResultArray;
  graphTable: Map<string, string>;
  searchQuery: {
    resourceName: string;
    resourceGraphId: string;
  };
}>();

const setResource = (resourceId: string) => {
  store.$patch({
    resourceId: resourceId
  });
};
</script>

<style scoped>
.search-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  background: linear-gradient(180deg, #ffffff 0%, #ffffff 75%, rgba(255, 255, 255, 0) 100%);
}
.search-results {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  max-width: 640px;
}
.resource-selection-menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  padding: 0px;
  gap: 8px;
}
</style>
