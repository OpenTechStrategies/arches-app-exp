<template>
  <div class="search-list-item">
    <div class="header">
      <h1>{{ `${props.result._source.displayname}` }}</h1>
      <img v-if="imageUrl" class="thumbnail" :src="imageUrl" alt="thumbnail" />
      <img v-else class="thumbnail" src="/noimage.png" alt="no image available">
    </div>
    <button class="details-button" @click="setResource">details</button>
    <h3 class="resource-type">{{ resourceType }}</h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SearchResult } from '../types';

const props = defineProps<{
  result: SearchResult;
  graphTable: Map<string, string>;
}>();
const emit = defineEmits(['set-resource']);

const setResource = () => {
  emit('set-resource', props.result._id);
};

const resourceType = props.graphTable.get(props.result._source.graph_id);
const imageUrl = ref<string | undefined>(undefined);

async function fetchImage() {
  const url = new URL(
    `${import.meta.env.VITE_ARCHES_API_URL}/archesdataviewer/getimage/${props.result._id}`
  );
  const response = await fetch(url.toString()).then((res) => res.json());
  const imagePath = response[0]?.data[response[0]?.nodegroup_id][0].url;
  if (imagePath) {
    imageUrl.value = import.meta.env.VITE_ARCHES_API_URL + imagePath;
  }
}

fetchImage();
</script>

<style scoped>
.search-list-item {
  position: relative;
  padding: 15px;
  margin: 10px;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey);
  border-radius: 8px;
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.details-button {
  position: absolute;
  bottom: 15px;
  left: 15px;
  padding: 5px 10px;
  background-color: var(--color-dark-green);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.details-button:hover {
  background-color: var(--color-light-green);
  transform: translateY(-2px);
}

.resource-type {
  position: absolute;
  top: 10px;
  right: 10px;
}

.thumbnail {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 100px;
}

@media (max-width: 768px) {
  .search-list-item {
    padding: 10px;
    margin: 5px;
  }

  .details-button {
    padding: 4px 8px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .thumbnail {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
}
</style>
