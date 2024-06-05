<script setup lang="ts">
import type { ResourceArray } from '../types'
import ResourceListItem from './ResourceListItem.vue'

const props= defineProps<{
  resources: ResourceArray
}>();
console.log(props.resources)

</script>

<template>
  <div class="resource-list">
    <ResourceListItem
      v-for="resource in props.resources.items"
      :resource="resource"
      :key="resource._id"
    />
  </div>
</template>

<style scoped></style>
