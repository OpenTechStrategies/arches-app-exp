<template>
  <div class="resource-detail-header"></div>

  <slot name="items"></slot>

  <div v-if="$slots['more-by-artist']" class="resource-detail-more-by-artist">
    <slot name="more-by-artist"></slot>
  </div>
  <div></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.resource-detail-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: var(--wac--semantic-spacing--quintary);
}

.resource-detail-more-by-artist {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
}
</style>
