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
  <div>
    <button
      type="button"
      :class="showMetadata ? 'toggle-metadata expanded' : 'toggle-metadata collapsed'"
      @click="toggleMetadata"
    >
      <span>{{ showMetadata ? 'Hide arches metadata' : 'Show arches metadata' }}</span>
      <ChevronRightIcon class="button-icon" />
    </button>
  </div>
  <div :class="['resource-detail-metadata', { collapsed: !showMetadata }]">
    <div class="resource-detail-metadata-title">Arches metadata:</div>
    <div class="resource-detail-metadata-content">
      <slot name="metadata"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/solid';

const showMetadata = ref<boolean>(false);

const toggleMetadata = () => {
  showMetadata.value = !showMetadata.value;
};
</script>

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
  overflow: hidden;
  max-height: 50px;
  transition: max-height 0.5s ease;
  color: var(--wac--color--gray);
}

.resource-detail-metadata.collapsed {
  max-height: 0px;
}

.resource-detail-metadata-title {
  font-weight: var(--wac--font-weight--bold);
}
</style>
