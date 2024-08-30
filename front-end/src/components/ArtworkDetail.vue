<template>
  <div>
    <h1>Title: {{ props.artwork.Title }}</h1>
    <h2>Artist: {{ props.artwork.Artist }}</h2>
    <h4>Description: {{ props.artwork?.Description }}</h4>
    <a :href="imagesrc"><img :src="imagesrc" alt="artwork image" /></a>
    <h4>Photographer: {{ props.artwork.Photograph?.Photographer }}</h4>
    <div v-if="props.artwork.Location">
      <h4>Address: {{ props.artwork.Location['Located On'] }}</h4>
    </div>
    <img :src="imagesrc" alt="Expanded artwork image" @click="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Artwork } from '../types';

const props = defineProps<{
  artwork: Artwork;
}>();

const showModal = ref(false);

const imagesrc = computed(() => {
  if (props.artwork.Photograph) {
    return `${import.meta.env.VITE_ARCHES_API_URL}${props.artwork.Photograph.Image}`;
  } else {
    return '';
  }
});
</script>

<style scoped></style>
