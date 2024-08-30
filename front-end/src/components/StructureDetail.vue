<template>
  <div class="structure-detail">
    <h1>Structure Location: {{ props.structure.Location.Address }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Structure } from '../types';

const props = defineProps<{
  structure: Structure;
}>();
</script>

<style scoped></style>
