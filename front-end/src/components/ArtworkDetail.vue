<template>
  <div class="artwork-detail">
    <h1>{{ props.artwork.displayname }}</h1>
    <h2>{{ props.artwork.displaydescription }}</h2>
    <img :src="imagesrc" alt="artwork image" />
    <h3>Photographer: {{ props.artwork.resource?.Image?.Photographer }}</h3>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Artwork } from '../types';

const props = defineProps<{
  artwork: Artwork;
}>();

const imagesrc = computed(() => {
  if (props.artwork.resource.Image) {
    return `${import.meta.env.VITE_ARCHES_API_URL}${props.artwork.resource.Image['@value']}`;
  } else {
    return '';
  }
});
</script>
<style scoped>
.artwork-detail {
  padding: 20px;
  margin: 20px;
  img {
    width: 100%;
  }
}
</style>
