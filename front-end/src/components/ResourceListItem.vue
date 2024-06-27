<template>
  <div class="resource-list-item">
    <div class="header">
      <div class="title">{{ props.resourceName }}</div>
      <img v-if="imageUrl" class="thumbnail" :src="imageUrl" alt="thumbnail" />
      <img v-else class="thumbnail" src="/noimage.png" alt="no image available" />
    </div>
    <button class="details-button" @click="setResource">details</button>
    <div class="resource-type">{{ props.resourceType ?? 'Resource' }}</div>
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

const imageUrl = ref<string | undefined>(undefined);

async function fetchImage() {
  const url = new URL(
    `${import.meta.env.VITE_ARCHES_API_URL}/archesdataviewer/getimage/${props.resourceId}`
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
.resource-list-item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  margin: 10px;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey);
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.header {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  font-weight: bold;
}

.title {
  font-size: 1.2rem;
  margin-right: 10px;
  flex: 1;
  text-align: left;
}

.details-button {
  position: absolute;
  bottom: 15px;
  left: 15px;
  padding: 10px 20px;
  background-color: var(--color-dark-green);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.details-button:hover {
  background-color: var(--color-light-green);
}

.resource-type {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1rem;
  font-weight: lighter;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20%;
}

@media (max-width: 768px) {
  .resource-list-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .title {
    font-size: 1rem;
    margin-right: 0;
  }

  .details-button {
    padding: 8px 16px;
    margin-bottom: 10px;
  }

  .thumbnail {
    width: 100%;
    height: auto;
    margin-left: 0;
  }

  .resource-type {
    position: static;
    margin-top: 10px;
  }
}
</style>
