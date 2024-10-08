<template>
  <div class="search-list-container">
    <div class="search-header">
      <div class="resource-selection-menu">
        <button
          type="button"
          :class="{ active: selectedResourceType === 'Artwork' }"
          @click="filterByType('Artwork')"
        >
          Artworks
        </button>
        <button
          type="button"
          :class="{ active: selectedResourceType === 'Artist' }"
          @click="filterByType('Artist')"
        >
          Artists
        </button>
      </div>
      <input v-model="query" class="search-input" :placeholder="placeholderText" />
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
        :artist="
          getArtistForArtwork(
            result,
            props.resourcesPrefetch,
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
import { getArtistForArtwork, getImageTileDataForResource } from '@/utils';
import SearchListItem from './SearchListItem.vue';

const query = ref<string>('');
const selectedResourceType = ref<string | null>('Artwork');

const props = defineProps<{
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
}>();

const filteredResources = computed(() =>
  props.resourcesPrefetch.filter((resource) => {
    const matchesQuery = resource.descriptors.en.name
      .toLowerCase()
      .includes(query.value.toLowerCase());

    const matchesType = selectedResourceType.value
      ? props.idReferences.graphIdToNameTable[resource.graph_id] === selectedResourceType.value
      : true;

    return matchesQuery && matchesType;
  })
);

const filterByType = (type: string) => {
  selectedResourceType.value = type;
};

const placeholderText = computed(() => {
  if (selectedResourceType.value === 'Artwork') {
    return 'Search artworks by name...';
  }
  if (selectedResourceType.value === 'Artist') {
    return 'Search artists by name...';
  }
  return '';
});
</script>

<style scoped>
.search-list-container {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--secondary);
}

.search-header {
  --wac--search-header--internal-spacing: var(--wac--semantic-spacing--tertiary);
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--wac--search-header--internal-spacing);
  padding-block: var(--wac--search-header--internal-spacing);

  background: linear-gradient(
    180deg,
    white calc(100% - var(--wac--search-header--internal-spacing)),
    rgba(255, 255, 255, 0) 100%
  );
}

.resource-selection-menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  gap: var(--wac--accessible-spacing--halfx);

  button {
    --wac--button--padding: var(--wac--accessible-spacing--halfx);

    &.active {
      background: var(--wac--color--highlight);
    }
  }
}

.search-input {
  width: 100%;
  padding: var(--wac--accessible-spacing--1x);
  border: 2px solid black;
  border-radius: var(--wac--fixed-spacing--halfx);
  font-size: inherit;

  &:focus {
    outline: var(--wac--outline);
    border-color: blue;
  }
}

.search-results {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--wac--semantic-spacing--tertiary);
}

@media screen and (min-width: 940px) {
  .search-list-container {
    gap: var(--wac--semantic-spacing--primary);
  }
  .search-input {
    padding: var(--wac--accessible-spacing--2x);
  }
}
</style>
