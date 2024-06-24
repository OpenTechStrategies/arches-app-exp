<template>
  <div class="artist-detail">
    <h1>Artist Name: {{ props.artist.Name }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Artist } from '../types';

const props = defineProps<{
  artist: Artist;
}>();
</script>

<style scoped>
.artist-detail {
  padding: 20px;
  margin: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .artist-detail {
    padding: 15px;
    margin: 10px;
  }
}
</style>
