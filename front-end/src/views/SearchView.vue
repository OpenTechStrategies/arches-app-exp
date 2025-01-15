<template>
  <SearchList
    :resource-relations-prefetch="props.resourceRelationsPrefetch"
    :images-prefetch="props.imagesPrefetch"
    :resources-prefetch="props.resourcesPrefetch"
    :id-references="props.idReferences"
    :route-query="props.routeQuery"
    :query="query"
  />
</template>

<script setup lang="ts">
import SearchList from '@/components/SearchList.vue';
import type { Tile, ImageTileData, Resource, Prefetch, ResourceXResource } from '@/types';

const props = defineProps<{
  routeQuery?: string;
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
  query: string;
}>();
</script>
