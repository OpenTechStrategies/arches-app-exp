<template>
  <ArtworkDetailItem
    v-if="
      validateArtworkSchema(resource?.resource) &&
      graphIdToNameTable[resource.graph_id] === 'Artwork' &&
      resourceRelations &&
      resource !== undefined
    "
    :artwork="resource.resource"
    :artwork-id="resource.resourceinstanceid"
    :resource-relations="resourceRelations"
    :id-references="props.idReferences"
    :panel-resource-type="props.panelResourceType"
  />
</template>

<script setup lang="ts">
import type { ApiResource, Prefetch, ApiResourceRelation } from '@/types';
import { ref } from 'vue';
import { PanelResourceEnum, validateArtworkSchema } from '@/types';
import ArtworkDetailItem from './ArtworkDetailItem.vue';

const props = defineProps<{
  relatedArtwork: ApiResourceRelation;
  idReferences: Prefetch['idReferences'];
  panelResourceType: PanelResourceEnum;
}>();

const { graphIdToNameTable } = props.idReferences;
const resource = ref<ApiResource>();
const resourceRelations = ref<Array<ApiResourceRelation>>();

async function fetchResource() {
  const url = new URL(
    `${import.meta.env.VITE_ARCHES_API_URL}/resources/${props.relatedArtwork.resourceinstanceid}`
  );
  const params = new URLSearchParams({
    format: 'json'
  });
  url.search = params.toString();
  const response = await fetch(url.toString());
  const data = await response.json();
  resource.value = data;
}

async function fetchRelatedResources() {
  const url = new URL(
    `${import.meta.env.VITE_ARCHES_API_URL}/resource/related/${props.relatedArtwork.resourceinstanceid}`
  );
  const response = await fetch(url.toString()).then((res) => res.json());
  resourceRelations.value = response.related_resources.related_resources;
}

fetchResource();
fetchRelatedResources();
</script>
