<template>
  <div class="search-results-container">
    <div class="search-results-header">
      <div class="search-results-header-title">
        <PhotoIcon class="search-results-header-icon" />
        <h1>Artworks</h1>
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
import { PhotoIcon } from '@heroicons/vue/24/outline';
import type { Tile, ImageTileData, Resource, Prefetch, ResourceXResource } from '@/types';
import { getArtistForArtwork, getImageTileDataForResource } from '@/utils';
import SearchListItem from '../components/SearchListItem.vue';

const selectedResourceType = 'Artist'

const props = defineProps<{
  routeQuery?: string;
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
  query: string;
}>();


const filteredResources = computed(() =>
  props.resourcesPrefetch.filter((resource) => {
    const matchesQuery = resource.descriptors.en.name
      .toLowerCase()
      .includes(props.query.toLowerCase());

    const matchesType = selectedResourceType
      ? props.idReferences.graphIdToNameTable[resource.graph_id] === selectedResourceType
      : true;

    return matchesQuery && matchesType;
  })
);
</script>
