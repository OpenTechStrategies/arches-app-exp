<template>
  <div v-if="props.resourceName !== 'Rose McGowan'" class="resource-list-item">
    <div class="header">
      <div class="title">{{ props.resourceName }}</div>
      <img v-if="imageUrl" class="thumbnail" :src="imageUrl" alt="thumbnail" />
      <img
        v-else
        class="thumbnail"
        :src="isProd ? '/archesdataviewer/noimage.png' : '/noimage.png'"
        alt="no image available"
      />
    </div>

    <div class="resource-type">{{ props.resourceType ?? 'Resource' }}</div>
    <button class="details-button" @click="setResource">details</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  resourceName: string;
  resourceId: string;
  resourceType: string | undefined;
}>();
const emit = defineEmits(['set-resource']);

const setResource = () => {
  emit('set-resource', props.resourceId);
};

const isProd = import.meta.env.PROD;

const imageUrl = ref<string | undefined>(undefined);

async function fetchImage() {
  const url = new URL(
    `${import.meta.env.VITE_ARCHES_API_URL}/archesdataviewer/getimage/${props.resourceId}`
  );
  const response = await fetch(url.toString()).then((res) => res.json());
  const imagePath = response?.url;
  if (imagePath) {
    imageUrl.value = import.meta.env.VITE_ARCHES_API_URL + imagePath;
  }
}

fetchImage();
</script>

<style scoped>
</style>
