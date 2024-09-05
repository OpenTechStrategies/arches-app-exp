<template>
  <div @click="setActiveResource(props.artwork.resourceinstanceid)">
    <img
      v-if="imageUrl"
      :class="`more-artwork-image ${resourceStore.resourceId === props.artwork.resourceinstanceid ? 'blocked' : ''}`"
      loading="lazy"
      :src="imageUrl"
      alt="thumbnail image"
    />
    <img
      v-else
      :class="`more-artwork-image ${resourceStore.resourceId === props.artwork.resourceinstanceid ? 'blocked' : ''}`"
      :src="isProd ? '/archesdataviewer/noimage.png' : '/noimage.png'"
      alt="no image available"
      loading="lazy"
    />
  </div>
</template>

<script setup lang="ts">
import { useResourceStore } from '@/stores/resourceStore';
import type { ImageTileData, Resource } from '@/types';

const resourceStore = useResourceStore();
const props = defineProps<{
  artwork: Resource;
  imageTileData: ImageTileData[] | undefined;
}>();

console.log(props.artwork);
const isProd = import.meta.env.PROD;

const imageUrl = props.imageTileData
  ? import.meta.env.VITE_ARCHES_API_URL + props.imageTileData[0].url
  : undefined;

const setActiveResource = (newResourceId: string) => {
  resourceStore.$patch({
    resourceId: newResourceId
  });
};
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
