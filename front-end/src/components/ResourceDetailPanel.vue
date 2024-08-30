<template>
  <div v-if="props.resource" class="resource-detail">
    <div class="resource-detail-back-button" @click="clearActiveResource">Back to search</div>
    <div class="resource-detail-header">
      <div class="resource-detail-header-label">
        {{ props.resource?.graph_id ? graphTable.get(props.resource?.graph_id) : '' }}
      </div>
      <div class="resource-detail-header-title">{{ props.resource?.displayname ?? '' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Resource, ResourceRelation } from '@/types';
import { useResourceStore } from '@/stores/resourceStore';
const resourceStore = useResourceStore();
const props = defineProps<{
  resource: Resource | undefined;
  resourceRelations: Array<ResourceRelation> | undefined;
  graphTable: Map<string, string>;
}>();

const clearActiveResource = () => {
  resourceStore.$patch({
    resourceId: undefined
  });
};
</script>

<style scoped>
.resource-detail-back-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0px;
  gap: 8px;
}

.resource-detail-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 64px;
}

.resource-detail-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
}

.resource-detail-header-label {
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 100%;
}

.resource-detail-header-title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 100%;
}
</style>
