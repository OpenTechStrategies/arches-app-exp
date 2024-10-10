<template>
  <RouterLink
    v-if="imageUrl !== undefined"
    :to="`/wac/resource/${props.resourceId}`"
    class="search-result-container"
  >
    <div class="search-result">
      <div class="metadata">
        <div v-if="props.resourceType === 'Artist'" class="resource-type">
          {{ props.resourceType }}
        </div>
        <div class="title">{{ props.resourceName }}</div>
        <div v-if="props.resourceType === 'Artwork'" class="artist-credit">
          {{ props.artist?.displayname ? `(${props.artist?.displayname})` : '' }}
        </div>
        <div
          v-if="props.resourceDescription && props.resourceDescription !== 'Undefined'"
          class="description"
        >
          {{ props.resourceDescription }}
        </div>
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
.search-result-container {
  text-decoration: none;
}

.search-result {
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
  gap: var(--wac--semantic-spacing--tertiary);
  cursor: pointer;
}

.metadata {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--wac--accessible-spacing--halfx);

  line-height: var(--wac--line-height--tight);
}

.title {
  font-size: var(--wac--font-size--lg);
  font-weight: var(--wac--font-weight--xbold);
  text-decoration: underline;
}

.description {
  font-size: var(--wac--font-size--sm);
  margin-top: var(--wac--accessible-spacing--1x);

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
}

.artist-credit {
  font-style: italic;
}

.image {
  width: var(--wac--image--thumbnail-size);
  height: var(--wac--image--thumbnail-size);
  object-fit: cover;
  flex-shrink: 0;
}

@media screen and (min-width: 940px) {
  .title {
    font-size: var(--wac--font-size--xl);
  }

  .description {
    font-size: var(--wac--font-size);
  }
}
</style>
