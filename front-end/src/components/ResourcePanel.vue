<template>
  <div v-if="props.resource" class="resource-detail">
    <div class="resource-detail-back-button" @click="clearActiveResource">Back to search</div>
    <ResourceDetail>
      <template #header-label>
        {{ graphIdToNameTable[props.resource.graph_id] }}
      </template>
      <template #header-title>{{ props.resource.displayname ?? '' }} </template>
      <template #items>
        <ArtworkDetailItem
          v-if="
            validateArtworkSchema(props.resource.resource) &&
            graphIdToNameTable[props.resource.graph_id] === 'Artwork'
          "
          :artwork="props.resource.resource"
          :artwork-id="props.resource.resourceinstanceid"
          :resource-relations="props.resourceRelations"
          :id-references="props.idReferences"
          :panel-resource-type="PANEL_RESOURCE_TYPE.ARTWORK"
        />
        <RelatedArtworkDetailItem
          v-for="relatedArtwork in resourceRelations.filter(
            (resourceRelation) => graphIdToNameTable[resourceRelation.graph_id] === 'Artwork'
          )"
          v-else-if="
            validateArtistSchema(props.resource.resource) &&
            graphIdToNameTable[props.resource.graph_id] === 'Artist'
          "
          :key="relatedArtwork.graph_id"
          :related-artwork="relatedArtwork"
          :id-references="props.idReferences"
          :panel-resource-type="PANEL_RESOURCE_TYPE.ARTIST"
        />
        <RelatedArtworkDetailItem
          v-for="relatedArtwork in resourceRelations.filter(
            (resourceRelation) => graphIdToNameTable[resourceRelation.graph_id] === 'Artwork'
          )"
          v-else-if="
            validateStructureSchema(props.resource.resource) &&
            graphIdToNameTable[props.resource.graph_id] === 'Structure'
          "
          :key="relatedArtwork.resourceinstanceid"
          :related-artwork="relatedArtwork"
          :id-references="props.idReferences"
          :panel-resource-type="PANEL_RESOURCE_TYPE.STRUCTURE"
        />
        <RelatedArtworkDetailItem
          v-for="relatedArtwork in resourceRelations.filter(
            (resourceRelation) => graphIdToNameTable[resourceRelation.graph_id] === 'Artwork'
          )"
          v-else-if="
            validatePhotographerSchema(props.resource.resource) &&
            graphIdToNameTable[props.resource.graph_id] === 'Photographer'
          "
          :key="relatedArtwork.root_ontology_class"
          :related-artwork="relatedArtwork"
          :id-references="props.idReferences"
          :panel-resource-type="PANEL_RESOURCE_TYPE.PHOTOGRAPHER"
        />
      </template>
      <template
        v-if="
          validateArtworkSchema(props.resource.resource) &&
          graphIdToNameTable[props.resource.graph_id] === 'Artwork'
        "
        #more-by-artist
      >
        <MoreArtworksByArtist
          :resource="props.resource"
          :resource-relations="resourceRelations"
          :resource-relations-prefetch="props.resourceRelationsPrefetch"
          :resources-prefetch="props.resourcesPrefetch"
          :images-prefetch="props.imagesPrefetch"
          :id-references="props.idReferences"
        />
      </template>
      <template #metadata>
        <div>Graph ID: {{ props.resource.graph_id }}</div>
        <div>Resource Instance ID: {{ props.resource.resourceinstanceid }}</div>
      </template>
    </ResourceDetail>
  </div>
</template>

<script setup lang="ts">
import type {
  Prefetch,
  ApiResource,
  ApiResourceRelation,
  ResourceXResource,
  Tile,
  ImageTileData,
  Resource
} from '@/types';
import {
  validateArtistSchema,
  validateArtworkSchema,
  validateStructureSchema,
  validatePhotographerSchema,
  PANEL_RESOURCE_TYPE
} from '@/types';
import { useResourceStore } from '@/stores/resourceStore';
import ResourceDetail from './ResourceDetail.vue';
import ArtworkDetailItem from './ArtworkDetailItem.vue';
import RelatedArtworkDetailItem from './RelatedArtworkDetailItem.vue';
import MoreArtworksByArtist from './MoreArtworksByArtist.vue';

const resourceStore = useResourceStore();
const props = defineProps<{
  resource: ApiResource;
  resourceRelations: Array<ApiResourceRelation>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  idReferences: Prefetch['idReferences'];
  resourcesPrefetch: Array<Resource>;
}>();

const { graphIdToNameTable } = props.idReferences;

const clearActiveResource = () => {
  resourceStore.$patch({
    resourceId: undefined
  });
};
</script>

<style scoped>
.resource-detail-back-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0px;
  gap: 8px;
}

.resource-detail-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 64px;
}

.resource-detail-back-button {
  cursor: pointer;
}
</style>
