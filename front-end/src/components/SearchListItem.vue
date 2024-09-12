<template>
  <RouterLink :to="`/resource/${props.resourceId}`" class="search-result-container">
    <div class="search-result">
      <img
        v-if="imageUrl"
        class="search-result-image"
        loading="lazy"
        :src="imageUrl"
        alt="thumbnail image"
      />
      <img
        v-else
        class="search-result-image"
        :src="isProd ? '/archesdataviewer/noimage.png' : '/noimage.png'"
        alt="no image available"
        loading="lazy"
      />
      <div class="search-result-metadata">
        <div class="search-result-resource-type">{{ props.resourceType ?? 'Resource' }}</div>
        <div class="search-result-title">{{ props.resourceName }}</div>
        <div
          v-if="props.resourceDescription && props.resourceDescription !== 'Undefined'"
          class="search-result-resource-description"
        >
          {{ props.resourceDescription }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { ImageTileData } from '@/types';

const props = defineProps<{
  resourceName: string;
  resourceId: string;
  resourceDescription: string;
  resourceType: string | undefined;
  imageTileData: ImageTileData[] | undefined;
}>();

const isProd = import.meta.env.PROD;

const imageUrl = props.imageTileData
  ? import.meta.env.VITE_ARCHES_API_URL + props.imageTileData[0].url
  : undefined;
</script>

<style scoped>
.search-result {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  cursor: pointer;
}
.search-result-metadata {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
}
.search-result-title {
  font-style: normal;
  font-weight: 900;
  font-size: var(--wac-font-size--lg);
  line-height: 120%;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
}
.search-result-resource-type {
  font-style: normal;
  font-weight: 400;
  font-size: var(--wac-font-size--med);
  line-height: 100%;

  display: flex;
  align-items: center;
}

.search-result-resource-description {
  font-style: normal;
  font-weight: 400;
  font-size: var(--wac-font-size--small);
  line-height: 120%;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-result-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
}

.search-result-container {
  text-decoration: none;
}
@media (min-width: 940px) {
  .search-result-title {
    font-size: var(--wac-font-size--xxl);
  }
  .search-result-resource-type {
    font-size: var(--wac-font-size--med);
  }

  .search-result-resource-description {
    font-size: var(--wac-font-size--small);
  }
}
</style>
