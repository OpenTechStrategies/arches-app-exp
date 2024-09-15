<template>
  <div class="resource-detail-item">
    <div class="resource-detail-item-header">
      <div v-if="$slots['item-header-title']" class="resource-detail-item-header-title">
        <slot name="item-header-title"></slot>
      </div>
      <div v-if="$slots['item-header-byline']" class="resource-detail-item-header-byline">
        <slot name="item-header-byline"></slot>
      </div>
    </div>
    <div class="resource-detail-item-image">
      <img v-if="imageUrl" loading="lazy" :src="imageUrl" alt="resource image" />
      <img
        v-else
        :src="isProd ? '/archesdataviewer/noimage.png' : '/noimage.png'"
        alt="no image available"
        loading="lazy"
      />
      <div v-if="$slots['item-credit']" class="resource-detail-item-credit">
        <slot name="item-credit"></slot>
      </div>
    </div>

    <div v-if="$slots['item-description']" class="resource-detail-item-description">
      <slot name="item-description"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const isProd = import.meta.env.PROD;

const props = defineProps<{
  imageUrl: string | undefined;
}>();

const imageUrl = props.imageUrl ? import.meta.env.VITE_ARCHES_API_URL + props.imageUrl : undefined;
</script>

<style scoped>
.resource-detail-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
}

.resource-detail-item-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
}

.resource-detail-item-header-byline {
  font-style: normal;
  font-weight: 700;
  font-size: var(--wac--font-size);
  line-height: 100%;

  color: #000000;
}

.resource-detail-item-header-title {
  font-style: normal;
  font-weight: 900;
  font-size: var(--wac--font-size--xxl);
  line-height: 120%;
  text-decoration-line: underline;

  color: #000000;
}

.resource-detail-item-credit {
  font-style: normal;
  font-weight: 400;
  font-size: var(--wac--font-size);
  line-height: 140%;

  color: #000000;
}

.resource-detail-item-image {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
}

.resource-detail-item-image img {
  width: 100%;
  height: 100%;
}
</style>
