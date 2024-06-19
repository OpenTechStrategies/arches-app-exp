<template>
  <div class="resource-relation-item" @click="setResource">
    <p>Name: {{ props.resourceRelation.displayname }}</p>
    <p>Description: {{ props.resourceRelation.displaydescription }}</p>
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
  border: 2px solid black;
  margin: 10px;
}
.resource-relation-item:hover {
  opacity: 50%;
}
</style>
