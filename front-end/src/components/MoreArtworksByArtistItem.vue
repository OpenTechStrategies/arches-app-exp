<template>
  <RouterLink :to="`/resource/${props.artwork.resourceinstanceid}`">
    <div>
      <img
        :class="['more-artwork-image', { blocked: isBlocked }]"
        :src="resolvedImageUrl || fallbackImageUrl"
        :alt="resolvedImageUrl ? 'Thumbnail image' : 'No image available'"
      />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ImageTileData, Resource } from '@/types';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<{
  artwork: Resource;
  imageTileData: ImageTileData[] | undefined;
}>();

const isProd = import.meta.env.PROD;

const resolvedImageUrl = computed(() =>
  props.imageTileData?.length
    ? import.meta.env.VITE_ARCHES_API_URL + props.imageTileData[0].url
    : undefined
);

const fallbackImageUrl = computed(() =>
  isProd ? '/archesdataviewer/noimage.png' : '/noimage.png'
);

const isBlocked = computed(() => route.params?.id === props.artwork.resourceinstanceid);
</script>

<style scoped>
.more-artwork-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
  cursor: pointer;
  transition:
    opacity 0.3s ease,
    filter 0.3s ease;
}

.more-artwork-image:hover {
  opacity: 0.5;
}

.blocked {
  filter: brightness(50%);
  pointer-events: none;
}
</style>
