<template>
  <div class="search-list-item">
    <h1>{{ `${props.result._source.displayname}` }}</h1>
    <button class="details-button" @click="setResource">details</button>
    <h3 class="resource-type">{{ resourceType }}</h3>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '../types';

const props = defineProps<{
  result: SearchResult;
  graphTable: Map<string, string>;
}>();
const emit = defineEmits(['set-resource']);

const setResource = () => {
  emit('set-resource', props.result._id);
};

const resourceType = props.graphTable.get(props.result._source.graph_id);
</script>

<style scoped>
.search-list-item {
  position: relative;
  padding: 15px;
  margin: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.search-list-item:hover {
  background-color: #f0f0f0;
}

.details-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.details-button:hover {
  background-color: #0056b3;
}

.resource-type {
  position: absolute;
  top: 10px;
  right: 10px;
}

@media (max-width: 768px) {
  .search-list-item {
    padding: 10px;
    margin: 5px;
  }

  .details-button {
    padding: 4px 8px;
  }
}
</style>
