<template>
  <div class="search-list-container">
    <div class="search-header">
      <div>Explore the artwork as a list</div>
      <div class="resource-selection-menu">
        <button :class="{ active: selectedResourceType === null }" @click="clearFilter">
          Everything
        </button>
        <button
          :class="{ active: selectedResourceType === 'Artist' }"
          @click="filterByType('Artist')"
        >
          Artists
        </button>
        <button
          :class="{ active: selectedResourceType === 'Artwork' }"
          @click="filterByType('Artwork')"
        >
          Artworks
        </button>
        <button
          :class="{ active: selectedResourceType === 'Photographer' }"
          @click="filterByType('Photographer')"
        >
          Photographers
        </button>
        <button
          :class="{ active: selectedResourceType === 'Structure' }"
          @click="filterByType('Structure')"
        >
          Structures
        </button>
      </div>
      <input v-model="query" class="search-bar" placeholder="Search names..." />
    </div>
    <div class="search-results">
      <SearchListItem
        v-for="result in filteredResources"
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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Tile, ImageTileData, Resource, Prefetch, ResourceXResource } from '@/types';

import SearchListItem from './SearchListItem.vue';
import { getImageTileDataForResource } from '@/utils';

const query = ref<string>('');
const selectedResourceType = ref<string | null>(null);

const props = defineProps<{
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
}>();

const filteredResources = computed(() => {
  return props.resourcesPrefetch.filter((resource) => {
    const matchesQuery = resource.descriptors.en.name
      .toLowerCase()
      .includes(query.value.toLowerCase());

    const matchesType = selectedResourceType.value
      ? props.idReferences.graphIdToNameTable[resource.graph_id] === selectedResourceType.value
      : true;

    return matchesQuery && matchesType;
  });
});

const clearFilter = () => {
  selectedResourceType.value = null;
};

const filterByType = (type: string) => {
  selectedResourceType.value = type;
};
</script>

<style scoped>
.search-list-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  isolation: isolate;
}

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

button {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 8px;
  border: none;
  background: none;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  transition: background-color 300ms ease;
}

button.active {
  background: #ffe16a;
  transition: background-color 300ms ease;
}

.search-bar {
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 5px;
}
</style>
