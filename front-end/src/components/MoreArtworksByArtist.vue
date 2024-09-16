<template>
  <div v-if="relatedArtworks && relatedArtworks.length > 1">
    <div v-if="artist" class="more-artworks-by-artist-title">
      More artwork by
      <RouterLink
        :to="`/archesdataviewer/home/resource/${artist.resourceinstanceid}`"
        class="resource-link"
      >
        {{ artist.displayname }}
      </RouterLink>
    </div>
    <div class="more-artworks-by-artist-gallery">
      <MoreArtworksByArtistItem
        v-for="artwork in relatedArtworks"
        :key="artwork.resourceinstanceid"
        :artwork="artwork"
        :image-tile-data="
          getImageTileDataForResource(
            artwork,
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
import { computed } from 'vue';
import type {
  ApiResource,
  ApiResourceRelation,
  Resource,
  Prefetch,
  ResourceXResource,
  Tile,
  ImageTileData
} from '@/types';
import { getImageTileDataForResource, getMoreArtworksByArtist } from '@/utils';
import MoreArtworksByArtistItem from './MoreArtworksByArtistItem.vue';

const props = defineProps<{
  resource: ApiResource;
  resourcesPrefetch: Array<Resource>;
  resourceRelations: Array<ApiResourceRelation>;
  idReferences: Prefetch['idReferences'];
  resourceRelationsPrefetch: Array<ResourceXResource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
}>();

const artist = computed(() =>
  props.resourceRelations.find(
    (resource) => props.idReferences.graphIdToNameTable[resource.graph_id] === 'Artist'
  )
);

const relatedArtworks = computed(() => {
  if (!artist.value) return undefined;

  return getMoreArtworksByArtist(
    artist.value,
    props.resourcesPrefetch,
    props.resourceRelationsPrefetch,
    props.idReferences
  );
});
</script>

<style scoped>
.more-artworks-by-artist-title {
  font-style: normal;
  font-weight: 700;
  font-size: var(--wac--font-size);
  line-height: 100%;

  color: #000000;
}

.more-artworks-by-artist-gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0px;
  gap: 16px;
  isolation: isolate;
}
</style>
