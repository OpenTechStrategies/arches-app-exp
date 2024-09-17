<template>
  <div class="resource-detail-header">
    <div class="resource-detail-type">
      <slot name="header-label"></slot>
    </div>
    <div class="resource-detail-title">
      <slot name="header-title"></slot>
    </div>
  </div>

  <slot name="items"></slot>
  <div v-if="$slots['more-by-artist']" class="resource-detail-more-by-artist">
    <slot name="more-by-artist"></slot>
  </div>

  <div class="resource-detail-metadata">
    <div class="resource-detail-metadata-title">Arches metadata:</div>
    <div class="resource-detail-metadata-content">
      <slot name="metadata"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.resource-detail-header {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--quintary);
}

.resource-detail-type {
  font-size: var(--wac--font-size--lg);
  line-height: var(--wac--line-height--tight);
}

.resource-detail-title {
  font-weight: var(--wac--font-weight--xbold);
  font-size: var(--wac--font-size--xxl);
  line-height: var(--wac--line-height--tight);
}

.resource-detail-more-by-artist {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
}

.resource-detail-metadata {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--quartary);
  color: var(--wac--color--gray);
}

.resource-detail-metadata-title {
  font-weight: var(--wac--font-weight--bold);
}
</style>
