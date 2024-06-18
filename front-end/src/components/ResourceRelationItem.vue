<template>
  <div class="resource-relation-item" @click="setResource">
    <p>Name: {{ props.resourceRelation.displayname }}</p>
    <p>Description: {{ props.resourceRelation.displaydescription }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ResourceRelation } from '../types';
const emit = defineEmits(['set-resource']);

const props = defineProps<{
  resourceRelation: ResourceRelation;
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
