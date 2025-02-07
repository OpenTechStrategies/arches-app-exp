<template>
  <RouterLink
    v-if="imageUrl !== undefined"
    :to="`/wac/resource/${props.resourceId}`"
    class="search-item-container"
  >
    <div class="search-result">
      <div class="metadata">
        <div class="title-wrapper">
          <h3 class="title">
            {{ props.resourceName }}
          </h3>
        </div>
        <h3 v-if="props.resourceType === 'Artwork'" class="artist-credit h3-sub">
          {{ props.artist?.displayname ? ` by ${props.artist?.displayname}` : '' }}
        </h3>
      </div>
      <img v-if="imageUrl" class="image" :src="imageUrl" alt="thumbnail image" />
      <img
        v-else
        class="image"
        :src="
          isProd
            ? 'https://arches-app-demo.opentechstrategies.com/archesdataviewer/noimage.png'
            : '/noimage.png'
        "
        alt="no image available"
      />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { ImageTileData, Resource } from '@/types';

const props = defineProps<{
  resourceName: string;
  resourceId: string;
  resourceDescription: string;
  resourceType: string | undefined;
  imageTileData: ImageTileData[] | undefined;
  artist: Resource | undefined;
}>();

const isProd = import.meta.env.PROD;

const imageUrl = props.imageTileData
  ? import.meta.env.VITE_ARCHES_API_URL + props.imageTileData[0].url
  : undefined;
</script>

<style scoped>
.search-item-container {
  text-decoration: none;
}
.search-result {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--quartary);
  cursor: pointer;
}

.metadata {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: var(--wac--accessible-spacing--1x);
  gap: var(--wac--accessible-spacing--halfx);
  line-height: var(--wac--line-height--tight);
  text-overflow: ellipsis;
  max-width: var(--wac--image--thumbnail-size-x);
}

.title-wrapper {
  display: flex;
  gap: var(--wac--accessible-spacing--halfx);
}

.title {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
}

.image {
  width: var(--wac--image--thumbnail-size-x);
  height: var(--wac--image--thumbnail-size-y);
  object-fit: cover;
  flex-shrink: 0;
  background-color: white;
  padding: var(--wac--accessible-spacing--1x) var(--wac--accessible-spacing--1x)
    var(--wac--accessible-spacing--4x) var(--wac--accessible-spacing--1x);
  box-shadow: 4px 4px 8px #ccc;
}
</style>
