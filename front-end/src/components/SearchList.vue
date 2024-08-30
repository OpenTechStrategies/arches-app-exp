<template>
  <div class="search-list-container">
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
        <input v-model="query" placeholder="Search names..." />
      </div>
    </div>
    <div class="search-results">
      <SearchListItem
        v-for="result in props.resourcesPrefetch"
        :key="result.resourceinstanceid"
        :resource-name="result.descriptors.en.name"
        :resource-description="result.descriptors.en.description"
        :resource-id="result.resourceinstanceid"
        :resource-type="props.idReferences.graphIdToNameTable[result.graph_id]"
        :image-tile-data="
          getImageTileDataForResource(
            result,
            props.imagesPrefetch,
            props.resourceRelationsPrefetch,
            props.idReferences
          )
        "
        @set-resource="setResource"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useResourceStore } from '@/stores/resourceStore';
import type { Tile, ImageTileData, Resource, Prefetch, ResourceRelation } from '@/types';

import SearchListItem from './SearchListItem.vue';
import { getImageTileDataForResource } from '@/utils';

const resourceStore = useResourceStore();
const query = ref<string>('');

const props = defineProps<{
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceRelation>;
  idReferences: Prefetch['idReferences'];
}>();

const setResource = (resourceId: string) => {
  resourceStore.$patch({
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
