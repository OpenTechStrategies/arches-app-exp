<template>
  <ResourceDetailItem
    v-if="props.panelResourceType !== undefined"
    :image-url="props.artwork.Photograph?.Image"
  >
    <template v-if="props.panelResourceType !== PanelResourceEnum.ARTWORK" #item-header-title>
      <p>
        <span class="resource-link" @click="setActiveResource(props.artworkId)">{{
          artwork.Title
        }}</span>
      </p>
    </template>
    <template v-if="artist && structure" #item-header-byline>
      <p>
        <span v-if="props.panelResourceType !== PanelResourceEnum.ARTIST"
          >by
          <span class="resource-link" @click="setActiveResource(artist.resourceinstanceid)">{{
            artist.displayname
          }}</span></span
        >
        <span v-if="props.panelResourceType !== PanelResourceEnum.STRUCTURE">
          at
          <span class="resource-link" @click="setActiveResource(structure.resourceinstanceid)">{{
            structure.displayname
          }}</span></span
        >
      </p>
    </template>
    <template
      v-if="photographer && props.panelResourceType !== PanelResourceEnum.PHOTOGRAPHER"
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
import useResourceStore from '@/stores/resourceStore';
import ResourceDetailItem from './ResourceDetailItem.vue';

const props = defineProps<{
  artwork: Artwork;
  artworkId: string;
  panelResourceType: PanelResourceEnum;
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
