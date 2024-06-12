<template>
  <div class="artist-detail">
    <h1>{{ props.artist.displayname }}</h1>
    <h2>{{ props.artist.displaydescription }}</h2>
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
}
</style>
