<template>
  <div class="artwork-detail">
    <h1>Title: {{ props.artwork.Title }}</h1>
    <h2>Artist: {{ props.artwork.Artist }}</h2>
    <h4>Description: {{ props.artwork?.Description }}</h4>
    <a :href="imagesrc"><img :src="imagesrc" alt="artwork image" /></a>
    <h4>Photographer: {{ props.artwork.Image?.Photographer }}</h4>
    <div v-if="props.artwork.Location">
      <h4>Address: {{ props.artwork.Location.Address }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Artwork } from '../types';

const props = defineProps<{
  artwork: Artwork;
}>();

const imagesrc = computed(() => {
  if (props.artwork.Image) {
    return `${import.meta.env.VITE_ARCHES_API_URL}${props.artwork.Image['@value']}`;
  } else {
    return '';
  }
});
</script>

<style scoped>
.artwork-detail {
  padding: 20px;
  margin: 20px;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .artwork-detail {
    padding: 15px;
    margin: 10px;
  }
}
</style>
