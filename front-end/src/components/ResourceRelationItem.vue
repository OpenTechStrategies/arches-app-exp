<template>
  <div class="resource-relation-item" @click="setResource">
    <p>{{ props.resourceRelation.displayname }}</p>
    <h3>{{ props.graphTable.get(props.resourceRelation.graph_id) }}</h3>
  </div>
</template>

<script setup lang="ts">
import type { ResourceRelation } from '../types';
const emit = defineEmits(['set-resource']);

const props = defineProps<{
  resourceRelation: ResourceRelation;
  graphTable: Map<string, string>;
}>();

const setResource = () => {
  emit('set-resource', props.resourceRelation.resourceinstanceid);
};
</script>

<style scoped>
.resource-relation-item {
  padding: 15px;
  margin: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.resource-relation-item:hover {
  background-color: #f0f0f0;
}

@media (max-width: 768px) {
  .resource-relation-item {
    padding: 10px;
    margin: 5px;
  }
}
</style>
