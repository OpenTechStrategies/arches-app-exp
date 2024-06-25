<template>
  <div class="search-list-item">
    <div class="header">
      <h1>{{ `${props.result._source.displayname}` }}</h1>
      <img v-if="imageUrl" class="thumbnail" :src="imageUrl" alt="thumbnail" />
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
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.details-button:hover {
  background-color: #0056b3;
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
