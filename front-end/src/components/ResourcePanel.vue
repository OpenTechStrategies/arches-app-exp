<script setup lang="ts">
import { validateArtistSchema, validateArtworkSchema } from '@/types';
import ResourceDetailProvider from './ResourceDetailProvider.vue';
import ArtworkDetail from './ArtworkDetail.vue';
import ArtistDetail from './ArtistDetail.vue';
</script>

<template>
  <div id="resource-panel">
    <ResourceDetailProvider v-slot="{ resource }">
      <ArtworkDetail :artwork="resource" v-if="validateArtworkSchema(resource)" />
      <ArtistDetail :artist="resource" v-else-if="validateArtistSchema(resource)" />
    </ResourceDetailProvider>
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
