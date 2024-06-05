<script setup lang="ts">
import { toRaw } from 'vue';
import type { Resource } from '../types'

const props = defineProps<{
  resource: Resource
}>()

</script>

<template>
  <div class="resource-list-item">
    <h1>{{ resource._source.displayname }}</h1>
  </div>
</template>

<style scoped></style>
