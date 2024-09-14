<template>
  <Transition>
    <slot
      v-if="resource && resourceRelations"
      :resource="resource"
      :resource-relations="resourceRelations"
      :error="errorFetchingResource"
    />
  </Transition>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import type { ApiResource, ApiResourceRelation } from '@/types';
import { useRoute } from 'vue-router';

const props = defineProps<{
  id: string | string[];
}>();

const route = useRoute();

const resource = ref<ApiResource | undefined>();
const resourceRelations = ref<Array<ApiResourceRelation>>();

const errorFetchingResource = ref<boolean>(false);
async function fetchResource() {
  try {
    const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/resources/${props.id}`);
    const params = new URLSearchParams({
      format: 'json'
    });
    url.search = params.toString();
    const response = await fetch(url.toString());
    const data = await response.json();
    resource.value = data;
  } catch (err) {
    resource.value = undefined;
    errorFetchingResource.value = true;
  }
}

async function fetchRelatedResources() {
  const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/resource/related/${props.id}`);
  const response = await fetch(url.toString()).then((res) => res.json());
  resourceRelations.value = response.related_resources.related_resources;
}

async function fetchData() {
  fetchResource();
  fetchRelatedResources();
}

watch(() => route.params.id, fetchData, { immediate: true });
</script>
