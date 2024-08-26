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

<style scoped>
.structure-detail {
  padding: 20px;
  margin: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .structure-detail {
    padding: 15px;
    margin: 10px;
  }
}
</style>
