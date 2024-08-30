<template>
  <div>
    <div>
      <input
        v-model="props.searchQuery.resourceName"
      
        placeholder="Search by name..."
      />
      <select v-model="props.searchQuery.resourceGraphId">
        <option disabled value="">Please select one</option>
        <option v-for="(value, id) in props.graphTable" :key="id" :value="value[0]">
          {{ value[1] }}
        </option>
      </select>
    </div>
    <div>
      <ResourceListItem
        v-for="result in props.searchResults.items"
        :key="result._id"
        :resource-name="result._source.displayname"
        :resource-id="result._source.resourceinstanceid"
        :resource-type="props.graphTable.get(result._source.graph_id)"
        @set-resource="setResource"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { useResourceStore } from '@/stores/resourceStore';
import type { SearchResultArray } from '../types';
import ResourceListItem from './ResourceListItem.vue';

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

<style scoped></style>
