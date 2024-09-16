<template>
  <RouterLink :to="`/resource/${props.artwork.resourceinstanceid}`">
    <div>
      <img
        v-if="imageUrl"
        :class="`more-artwork-image ${route.params?.id === props.artwork.resourceinstanceid ? 'blocked' : ''}`"
        loading="lazy"
        :src="imageUrl"
        alt="thumbnail image"
      />
      <img
        v-else
        :class="`more-artwork-image ${route.params?.id === props.artwork.resourceinstanceid ? 'blocked' : ''}`"
        :src="isProd ? '/archesdataviewer/noimage.png' : '/noimage.png'"
        alt="no image available"
        loading="lazy"
      />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { ImageTileData, Resource } from '@/types';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<{
  artwork: Resource;
  imageTileData: ImageTileData[] | undefined;
}>();

const isProd = import.meta.env.PROD;

const imageUrl = props.imageTileData
  ? import.meta.env.VITE_ARCHES_API_URL + props.imageTileData[0].url
  : undefined;
</script>

<style scoped>
.more-artwork-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
  cursor: pointer;
}

.more-artwork-image:hover {
  opacity: 0.5;
}

.blocked {
  filter: brightness(50%);
  pointer-events: none;
}
</style>
