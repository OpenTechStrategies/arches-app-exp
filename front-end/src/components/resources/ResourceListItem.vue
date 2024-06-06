<template>
  <div class="resource-list-item">
    <h1>{{ props.resource._source.displayname }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from '../../types';

const props = defineProps<{
  resource: Resource;
}>();
</script>
