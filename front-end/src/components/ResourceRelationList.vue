<template>
  <div class="resource-relation-list-container">
    <h4>Related Resources:</h4>
    <div v-if="props.resourceRelations" class="resource-relation-list">
      <ResourceRelationItem
        v-for="resourceRelation in props.resourceRelations"
        :key="resourceRelation.resourceinstanceid"
        :resource-relation="resourceRelation"
        :graph-table="props.graphTable"
        @set-resource="setResource"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResourceRelationItem from './ResourceRelationItem.vue';
import type { ResourceRelation } from '../types';
import { useResourceStore } from '@/stores/resourceStore';

const store = useResourceStore();

const props = defineProps<{
  resourceRelations: Array<ResourceRelation>;
  graphTable: Map<string, string>;
}>();

const setResource = (resourceId: string) => {
  store.$patch({
    resourceId: resourceId
  });
};
</script>

<style scoped>
.resource-relation-list-container {
  padding: 20px;
  margin: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .resource-relation-list-container {
    padding: 15px;
    margin: 10px;
  }
}
</style>
