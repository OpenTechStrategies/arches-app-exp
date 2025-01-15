<template>
  <div class="search-results-container">
    <div class="search-results-header">
      <div class="search-results-header-title">
        <UserIcon class="search-results-header-icon" />
        <h1>Artists</h1>
      </div>
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
import { UserIcon } from '@heroicons/vue/24/outline';
import type { Tile, ImageTileData, Resource, Prefetch, ResourceXResource } from '@/types';
import { getArtistForArtwork, getImageTileDataForResource } from '@/utils';
import SearchListItem from '../components/SearchListItem.vue';

const selectedResourceType = ref<string | null>(null);

const props = defineProps<{
  routeQuery?: string;
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
  query: string;
}>();

if (props.routeQuery) {
  if (props.routeQuery === 'artworks') {
    selectedResourceType.value = 'Artwork';
  } else if (props.routeQuery === 'artists') {
    selectedResourceType.value = 'Artist';
  } else if (props.routeQuery === 'about') {
    selectedResourceType.value = 'About';
  }
}

const filteredResources = computed(() =>
  props.resourcesPrefetch.filter((resource) => {
    const matchesQuery = resource.descriptors.en.name
      .toLowerCase()
      .includes(props.query.toLowerCase());

    const matchesType = selectedResourceType.value
      ? props.idReferences.graphIdToNameTable[resource.graph_id] === selectedResourceType.value
      : true;

    return matchesQuery && matchesType;
  })
);
</script>

<style scoped>
.search-results-container {
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--1x);
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: auto;
  max-width: 650px;
  overflow-x: scroll;
}

.search-results-header {
  display: flex;
  justify-content: space-between;
}

.search-results-header-icon {
  width: calc(var(--wac--line-height) * 1em);
  height: calc(var(--wac--line-height) * 1em);
}

.search-results-header-title {
  display: flex;
  font-size: var(--wac--font-size--xxl);
  gap: var(--wac--accessible-spacing--2x);
}

@media screen and (min-width: 940px) {
  .search-results {
    display: grid;
    flex-direction: column;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: auto;
    max-width: 650px;
    overflow-x: scroll;
  }
}
</style>
