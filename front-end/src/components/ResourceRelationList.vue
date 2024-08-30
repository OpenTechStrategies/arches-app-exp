<template>
  <div>
    <h4>Related Resources:</h4>
    <div v-if="props.resourceRelations">
      <ResourceListItem
        v-for="resourceRelation in props.resourceRelations"
        :key="resourceRelation.resourceinstanceid"
        :resource-name="resourceRelation.displayname"
        :resource-id="resourceRelation.resourceinstanceid"
        :resource-type="graphTable.get(resourceRelation.graph_id)"
        @set-resource="setResource"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResourceListItem from './ResourceListItem.vue';
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
</style>
