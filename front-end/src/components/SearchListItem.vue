<template>
  <div class="search-result" @click="setActiveResource(props.resourceId)">
    <img v-if="imageUrl" class="search-result-image" :src="imageUrl" alt="thumbnail image" />
    <img
      v-else
      class="search-result-image"
      :src="isProd ? '/archesdataviewer/noimage.png' : '/noimage.png'"
      alt="no image available"
    />
    <div class="search-result-metadata">
      <div class="search-result-resource-type">{{ props.resourceType ?? 'Resource' }}</div>
      <div class="search-result-title">{{ props.resourceName }}</div>
      <div v-if="props.resourceDescription" class="search-result-resource-description">
        {{ props.resourceDescription }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResourceStore } from '@/stores/resourceStore';
import { ref } from 'vue';

const resourceStore = useResourceStore();
const props = defineProps<{
  resourceName: string;
  resourceId: string;
  resourceDescription: string;
  resourceType: string | undefined;
}>();

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

const setActiveResource = (resourceId: string) => {
  resourceStore.$patch({
    resourceId: resourceId
  });
};

fetchImage();
</script>

<style scoped>
.search-result {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
}
.search-result-metadata {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
}
.search-result-title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 120%;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
}
.search-result-resource-type {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;

  display: flex;
  align-items: center;
}
.search-result-description {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 110%;
}
.search-result-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
}
</style>
