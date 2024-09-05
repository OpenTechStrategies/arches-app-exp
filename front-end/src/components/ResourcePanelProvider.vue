<template>
  <Transition>
    <slot v-if="resource" :resource="resource" :resource-relations="resourceRelations" />
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useResourceStore } from '../stores/resourceStore';
import type { ApiResource, ApiResourceRelation } from '@/types';
const store = useResourceStore();
const resource = ref<ApiResource>();
const resourceRelations = ref<Array<ApiResourceRelation>>();

async function fetchResource() {
  if (!store.resourceId) return;
  const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/resources/${store.resourceId}`);
  const params = new URLSearchParams({
    format: 'json'
  });
  url.search = params.toString();
  const response = await fetch(url.toString());
  const data = await response.json();
  resource.value = data;
}

async function fetchRelatedResources() {
  if (!store.resourceId) return;
  const url = new URL(
    `${import.meta.env.VITE_ARCHES_API_URL}/resource/related/${store.resourceId}`
  );
  const response = await fetch(url.toString()).then((res) => res.json());
  resourceRelations.value = response.related_resources.related_resources;
}

watch(
  () => store.resourceId,
  async (newResourceId) => {
    if (newResourceId) {
      fetchResource();
      fetchRelatedResources();
    }
  },
  { immediate: true }
);
</script>
