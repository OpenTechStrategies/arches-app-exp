<template>
  <div v-if="artist" class="more-artworks-by-artist-title">
    More artwork by
    <RouterLink :to="`/resource/${artist.resourceinstanceid}`" class="resource-link">
      {{ artist.displayname }}
    </RouterLink>
  </div>
  <div v-if="relatedArtworks" class="more-artworks-by-artist-gallery">
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
</template>

<script setup lang="ts">
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

const artist = props.resourceRelations.find(
  (resource) => props.idReferences.graphIdToNameTable[resource.graph_id] === 'Artist'
);

const relatedArtworks = artist
  ? getMoreArtworksByArtist(
      artist,
      props.resourcesPrefetch,
      props.resourceRelationsPrefetch,
      props.idReferences
    )
  : undefined;
</script>
<style scoped>
.more-artworks-by-artist-title {
  font-style: normal;
  font-weight: 700;
  font-size: var(--wac-font-size--med);
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
