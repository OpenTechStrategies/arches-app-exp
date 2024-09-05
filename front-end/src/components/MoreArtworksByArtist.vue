<template>
  <div v-if="artist" class="more-artworks-by-artist-title">
    More artwork by
    <span class="resource-link" @click="setActiveResource(artist.resourceinstanceid)">{{
      artist.displayname
    }}</span>
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
import { useResourceStore } from '@/stores/resourceStore';
import MoreArtworksByArtistItem from './MoreArtworksByArtistItem.vue';
import { getImageTileDataForResource, getMoreArtworksByArtist } from '@/utils';
const props = defineProps<{
  resource: ApiResource;
  resourcesPrefetch: Array<Resource>;
  resourceRelations: Array<ApiResourceRelation>;
  idReferences: Prefetch['idReferences'];
  resourceRelationsPrefetch: Array<ResourceXResource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
}>();

const resourceStore = useResourceStore();

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

const setActiveResource = (newResourceId: string) => {
  resourceStore.$patch({
    resourceId: newResourceId
  });
};
</script>
<style scoped>
.more-artworks-by-artist-title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
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
