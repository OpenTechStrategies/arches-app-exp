<template>
  <div>
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
</style>
