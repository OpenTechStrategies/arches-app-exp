<script setup lang="ts">
import ResourceRelationItem from './ResourceRelationItem.vue';
import type { ResourceRelation } from '../types';
import { useResourceStore } from '@/stores/resourceStore';

const store = useResourceStore();

const props = defineProps<{
  resourceRelations: Array<ResourceRelation>;
}>();

const setResource = (resourceId: string) => {
  store.$patch({
    resourceId: resourceId
  });
};
</script>

<template>
  <div class="resource-relation-list-container">
    <h4>Related Resources:</h4>
    <div class="resource-relation-list" v-if="props.resourceRelations">
      <ResourceRelationItem
        v-for="resourceRelation in props.resourceRelations"
        :resource-relation="resourceRelation"
        :key="resourceRelation.resourceinstanceid"
        @set-resource="setResource"
      />
    </div>
  </div>
</template>

<style scoped></style>
