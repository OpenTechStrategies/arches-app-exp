<template>
  <ResourceDetailItem
    v-if="props.panelResourceType !== undefined"
    :image-url="props.artwork.Photograph?.Image"
  >
    <template v-if="props.panelResourceType !== PANEL_RESOURCE_TYPE.ARTWORK" #item-header-title>
      <p>
        <span class="resource-link" @click="setActiveResource(props.artworkId)">{{
          artwork.Title
        }}</span>
      </p>
    </template>
    <template v-if="artist && structure" #item-header-byline>
      <p>
        <span v-if="props.panelResourceType !== PANEL_RESOURCE_TYPE.ARTIST"
          >by
          <span class="resource-link" @click="setActiveResource(artist.resourceinstanceid)">{{
            artist.displayname
          }}</span></span
        >
        <span v-if="props.panelResourceType !== PANEL_RESOURCE_TYPE.STRUCTURE">
          at
          <span class="resource-link" @click="setActiveResource(structure.resourceinstanceid)">{{
            structure.displayname
          }}</span></span
        >
      </p>
    </template>
    <template
      v-if="photographer && props.panelResourceType !== PANEL_RESOURCE_TYPE.PHOTOGRAPHER"
      #item-credit
    >
      <p>
        Photographer
        <span class="resource-link" @click="setActiveResource(photographer.resourceinstanceid)">{{
          photographer.displayname
        }}</span>
      </p>
    </template>
    <template
      v-if="props.artwork.Description && props.panelResourceType === PANEL_RESOURCE_TYPE.ARTWORK"
      #item-description
    >
      <p>{{ props.artwork.Description }}</p></template
    >
  </ResourceDetailItem>
</template>

<script setup lang="ts">
import type { Artwork, Prefetch, ApiResourceRelation } from '@/types';
import { PANEL_RESOURCE_TYPE } from '@/types';
import ResourceDetailItem from './ResourceDetailItem.vue';
import { useResourceStore } from '@/stores/resourceStore';

const props = defineProps<{
  artwork: Artwork;
  artworkId: string;
  panelResourceType: PANEL_RESOURCE_TYPE;
  resourceRelations: Array<ApiResourceRelation>;
  idReferences: Prefetch['idReferences'];
}>();

const resourceStore = useResourceStore();
const { graphIdToNameTable } = props.idReferences;

const setActiveResource = (newResourceId: string) => {
  resourceStore.$patch({
    resourceId: newResourceId
  });
};

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
