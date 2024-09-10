<template>
  <ResourcePanelProvider :id="route.params.id" v-slot="{ resource, resourceRelations, error }">
    <ResourcePanel
      v-if="resource && resourceRelations && !error"
      :resource="resource"
      :resource-relations="resourceRelations"
      :id-references="props.idReferences"
      :resource-relations-prefetch="props.resourceRelationsPrefetch"
      :images-prefetch="props.imagesPrefetch"
      :resources-prefetch="props.resourcesPrefetch"
    />
    <div v-else-if="error">
      <p>No Resource found with id {{ route.params.id }}</p>
    </div>
  </ResourcePanelProvider>
</template>

<script setup lang="ts">
import ResourcePanelProvider from '@/components/ResourcePanelProvider.vue';
import ResourcePanel from '@/components/ResourcePanel.vue';
import type { Tile, ImageTileData, Resource, Prefetch, ResourceXResource } from '@/types';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<{
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
}>();
</script>
