<template>
  <div class="artwork-detail">
    <h1>Title: {{ props.artwork.Title || 'N/A' }}</h1>
    <h2>Artist: {{ props.artwork.Artist || 'N/A' }}</h2>
    <h4>Description: {{ props.artwork?.Description || 'N/A' }}</h4>
    <img v-if="imagesrc" :src="imagesrc" alt="artwork image" @click="showModal = true" />
    <h4>Photographer: {{ props.artwork.Image?.Photographer || 'N/A' }}</h4>
    <div v-if="props.artwork.Location">
      <h4>Address: {{ props.artwork.Location.Address || 'N/A' }}</h4>
    </div>
    <Modal :visible="showModal" @update:visible="showModal = $event">
      <img :src="imagesrc" alt="Expanded artwork image" class="expanded-image" @click="showModal = false" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Modal from './Modal.vue';
import type { Artwork } from '../types';

const props = defineProps<{
  artwork: Artwork;
}>();

const showModal = ref(false);

const imagesrc = computed(() => {
  if (props.artwork.Image) {
    return `${import.meta.env.VITE_ARCHES_API_URL}${props.artwork.Image['@value']}`;
  } else {
    return '';
  }
});
</script>

<style scoped>
.artwork-detail {
  padding: 20px;
  margin: 20px;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
  object-fit: contain;
  cursor: pointer;
}

.expanded-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}
</style>
