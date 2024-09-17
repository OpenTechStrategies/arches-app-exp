<template>
  <div v-if="props.resource" class="resource-detail">
    <div>
      <RouterLink :to="'/archesdataviewer/home/'" class="button">
        <ChevronLeftIcon class="button-icon" />
        <span>Back to search</span>
      </RouterLink>
    </div>
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
          :panel-resource-type="PanelResourceEnum.ARTWORK"
        />
        <RelatedArtworkDetailItem
          v-for="relatedArtwork in resourceRelations.filter(
            (resourceRelation) => graphIdToNameTable[resourceRelation.graph_id] === 'Artwork'
          )"
          v-else-if="graphIdToNameTable[props.resource.graph_id] === 'Artist'"
          :key="relatedArtwork.graph_id"
          :related-artwork="relatedArtwork"
          :id-references="props.idReferences"
          :panel-resource-type="PanelResourceEnum.ARTIST"
        />
        <RelatedArtworkDetailItem
          v-for="relatedArtwork in resourceRelations.filter(
            (resourceRelation) => graphIdToNameTable[resourceRelation.graph_id] === 'Artwork'
          )"
          v-else-if="graphIdToNameTable[props.resource.graph_id] === 'Structure'"
          :key="relatedArtwork.resourceinstanceid"
          :related-artwork="relatedArtwork"
          :id-references="props.idReferences"
          :panel-resource-type="PanelResourceEnum.STRUCTURE"
        />
        <RelatedArtworkDetailItem
          v-for="relatedArtwork in resourceRelations.filter(
            (resourceRelation) => graphIdToNameTable[resourceRelation.graph_id] === 'Artwork'
          )"
          v-else-if="graphIdToNameTable[props.resource.graph_id] === 'Photographer'"
          :key="relatedArtwork.root_ontology_class"
          :related-artwork="relatedArtwork"
          :id-references="props.idReferences"
          :panel-resource-type="PanelResourceEnum.PHOTOGRAPHER"
        />
      </template>
      <template v-if="graphIdToNameTable[props.resource.graph_id] === 'Artwork'" #more-by-artist>
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
        <div>
          Resource Instance ID:
          <a :href="`${archesUrl}/report/${props.resource.resourceinstanceid}`">{{
            props.resource.resourceinstanceid
          }}</a>
        </div>
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
import { validateArtworkSchema, PanelResourceEnum } from '@/types';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import ResourceDetail from './ResourceDetail.vue';
import ArtworkDetailItem from './ArtworkDetailItem.vue';
import RelatedArtworkDetailItem from './RelatedArtworkDetailItem.vue';
import MoreArtworksByArtist from './MoreArtworksByArtist.vue';

const props = defineProps<{
  resource: ApiResource;
  resourceRelations: Array<ApiResourceRelation>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  idReferences: Prefetch['idReferences'];
  resourcesPrefetch: Array<Resource>;
}>();

const { graphIdToNameTable } = props.idReferences;

const archesUrl = import.meta.env.VITE_ARCHES_API_URL;
</script>

<style scoped>
.resource-detail {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--secondary);
}
</style>
