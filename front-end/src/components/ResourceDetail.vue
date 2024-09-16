<template>
  <div class="resource-detail-header">
    <div class="resource-detail-header-label">
      <slot name="header-label"></slot>
    </div>
    <div class="resource-detail-header-title">
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
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
}

.resource-detail-metadata {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
}

.resource-detail-more-by-artist {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
}

.resource-detail-metadata-title {
  font-style: normal;
  font-weight: 700;
  font-size: var(--wac--font-size);
  line-height: 100%;

  color: #999999;
}

.resource-detail-metadata-content {
  font-style: normal;
  font-weight: 400;
  font-size: var(--wac--font-size);
  line-height: 140%;

  color: #999999;
}

.resource-detail-header-label {
  font-style: normal;
  font-weight: 400;
  font-size: var(--wac--font-size--lg);
  line-height: 100%;
}

.resource-detail-header-title {
  font-style: normal;
  font-weight: 900;
  font-size: var(--wac--font-size--xxl);
  line-height: 100%;
}
</style>
