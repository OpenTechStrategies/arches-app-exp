<script setup lang="ts">
import { validateArtistSchema, validateArtworkSchema } from '@/types';
import ResourceDetailProvider from './ResourcePanelProvider.vue';
import ArtworkDetail from './ArtworkDetail.vue';
import ArtistDetail from './ArtistDetail.vue';
import type { Resource } from '@/types';

const props = defineProps<{
  resource: Resource | undefined;
}>();
</script>

<template>
  <div id="resource-panel">
    <div v-if="props.resource">
      <ArtworkDetail
        :artwork="props.resource.resource"
        v-if="validateArtworkSchema(props.resource?.resource)"
      />
      <ArtistDetail
        :artist="props.resource.resource"
        v-else-if="validateArtistSchema(props.resource?.resource)"
      />
    </div>
    <div v-else>
      <p>Click on a resource on the map or search list to display details</p>
    </div>
  </div>
</template>

<style scoped>
#resource-panel {
  margin: 100px;
  background-color: #c8c8c8cd;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 80%;
  height: 50%;
}
</style>
