<script setup lang="ts">
import { computed } from 'vue';

const isProd = import.meta.env.PROD;

const props = defineProps<{
  imageUrl: string | undefined;
}>();

const resolvedImageUrl = computed(() =>
  props.imageUrl ? import.meta.env.VITE_ARCHES_API_URL + props.imageUrl : undefined
);
</script>

<template>
  <div class="resource-detail-item">
    <div class="resource-detail-item-header">
      <div v-if="$slots['item-header-title']" class="resource-detail-item-title">
        <slot name="item-header-title"></slot>
      </div>
      <div v-if="$slots['item-header-byline']" class="resource-detail-item-byline">
        <slot name="item-header-byline"></slot>
      </div>
    </div>
    <figure class="resource-detail-item-image">
      <img v-if="resolvedImageUrl" :src="resolvedImageUrl" alt="resource image" />
      <img
        v-else
        :src="
          isProd
            ? 'https://arches-app-demo.opentechstrategies.com/archesdataviewer/noimage.png'
            : '/noimage.png'
        "
        alt="no image available"
        loading="lazy"
      />
      <figcaption v-if="$slots['item-credit']" class="resource-detail-item-credit">
        <slot name="item-credit"></slot>
      </figcaption>
    </figure>

    <div v-if="$slots['item-description']" class="resource-detail-item-description">
      <slot name="item-description"></slot>
    </div>
  </div>
</template>

<style scoped>
.resource-detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--tertiary);
}

.resource-detail-item-header {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--quartary);

  line-height: var(--wac--line-height--tight);
}

.resource-detail-item-title {
  font-weight: var(--wac--font-weight--xbold);
  font-size: var(--wac--font-size--lg);
  text-decoration-line: underline;
}

.resource-detail-item-byline {
  font-weight: var(--wac--font-weight--bold);
}

.resource-detail-item-image {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--quartary);
}

.resource-detail-item-image > img {
  width: 100%;
  height: 100%;
}

.resource-detail-item-credit {
  color: var(--wac--color--gray);
}

.resource-detail-item-description {
  font-size: var(--wac--font-size--lg);
}
</style>
