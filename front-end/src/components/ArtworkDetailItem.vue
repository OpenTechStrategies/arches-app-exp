<template>
  <ResourceDetailItem
    v-if="props.panelResourceType !== undefined"
    :image-url="props.artwork.Photograph?.Image"
  >
    <template v-if="props.panelResourceType !== PanelResourceEnum.ARTWORK" #item-header-title>
      <p>
        <RouterLink :to="`/resource/${props.artworkId}`" class="resource-link">{{
          artwork.Title
        }}</RouterLink>
      </p>
    </template>
    <template v-if="artist && structure" #item-header-byline>
      <p>
        <span v-if="props.panelResourceType !== PanelResourceEnum.ARTIST"
          >by
          <RouterLink :to="`/resource/${artist.resourceinstanceid}`" class="resource-link">{{
            artist.displayname
          }}</RouterLink></span
        >
        <span v-if="props.panelResourceType !== PanelResourceEnum.STRUCTURE">
          at
          {{ structure.displayname }}</span
        >
      </p>
    </template>
    <template
      v-if="photographer && props.panelResourceType !== PanelResourceEnum.PHOTOGRAPHER"
      #item-credit
    >
      <p>
        Photographer

        {{ photographer.displayname }}
      </p>
    </template>
    <template
      v-if="props.artwork.Description && props.panelResourceType === PanelResourceEnum.ARTWORK"
      #item-description
    >
      <p>{{ props.artwork.Description }}</p></template
    >
  </ResourceDetailItem>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import type { Artwork, Prefetch, ApiResourceRelation } from '@/types';
import { PanelResourceEnum } from '@/types';
import ResourceDetailItem from './ResourceDetailItem.vue';

const photographer = ref<ApiResourceRelation>();
const structure = ref<ApiResourceRelation>();
const artist = ref<ApiResourceRelation>();

const props = defineProps<{
  artwork: Artwork;
  artworkId: string;
  panelResourceType: PanelResourceEnum;
  resourceRelations: Array<ApiResourceRelation>;
  idReferences: Prefetch['idReferences'];
}>();

const { graphIdToNameTable } = props.idReferences;

watch(
  () => props.resourceRelations,
  (newRelations) => {
    photographer.value = newRelations.find(
      (resource) => graphIdToNameTable[resource.graph_id] === 'Photographer'
    );
    structure.value = newRelations.find(
      (resource) => graphIdToNameTable[resource.graph_id] === 'Structure'
    );
    artist.value = newRelations.find(
      (resource) => graphIdToNameTable[resource.graph_id] === 'Artist'
    );
  },
  { immediate: true }
);
</script>
