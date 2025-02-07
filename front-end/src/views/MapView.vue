<template>
  <div class="mobile-map-container">
    <MobileLeafleftMap
      v-if="
        resourcesPrefetch &&
        idReferences &&
        locationsPrefetch &&
        imagesPrefetch &&
        resourceRelationsPrefetch
      "
      :resources-prefetch="props.resourcesPrefetch"
      :id-references="props.idReferences"
      :locations-prefetch="props.locationsPrefetch"
      :images-prefetch="props.imagesPrefetch"
      :resource-relations-prefetch="props.resourceRelationsPrefetch"
    />
    <div v-else class="map-placeholder">Loading map…</div>
  </div>
</template>

<script setup lang="ts">
import MobileLeafleftMap from '@/components/MobileLeafleftMap.vue';
import type {
  Tile,
  ImageTileData,
  Resource,
  Prefetch,
  ResourceXResource,
  CoordinatesTileData
} from '@/types';

const props = defineProps<{
  routeQuery?: string;
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
  locationsPrefetch: Array<Tile<CoordinatesTileData>>;
  query: string;
}>();
</script>

<style scoped>
@media screen and (min-width: 1460px) {
  .mobile-map-container {
    display: none;
  }
}
</style>
