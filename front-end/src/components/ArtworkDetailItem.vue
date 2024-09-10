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
          <RouterLink :to="`/resource/${structure.resourceinstanceid}`" class="resource-link">
            {{ structure.displayname }}</RouterLink
          ></span
        >
      </p>
    </template>
    <template
      v-if="photographer && props.panelResourceType !== PanelResourceEnum.PHOTOGRAPHER"
      #item-credit
    >
      <p>
        Photographer
        <RouterLink :to="`/resource/${photographer.resourceinstanceid}`" class="resource-link">
          {{ photographer.displayname }}
        </RouterLink>
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
import type { Artwork, Prefetch, ApiResourceRelation } from '@/types';
import { PanelResourceEnum } from '@/types';
import ResourceDetailItem from './ResourceDetailItem.vue';

const props = defineProps<{
  artwork: Artwork;
  artworkId: string;
  panelResourceType: PanelResourceEnum;
  resourceRelations: Array<ApiResourceRelation>;
  idReferences: Prefetch['idReferences'];
}>();

const { graphIdToNameTable } = props.idReferences;

const photographer = props.resourceRelations.find(
  (resource) => graphIdToNameTable[resource.graph_id] === 'Photographer'
);

const structure = props.resourceRelations.find(
  (resource) => graphIdToNameTable[resource.graph_id] === 'Structure'
);

const artist = props.resourceRelations.find(
  (resource) => graphIdToNameTable[resource.graph_id] === 'Artist'
);
</script>
