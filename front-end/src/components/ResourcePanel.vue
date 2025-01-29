<template>
  <div v-if="props.resource" class="resource-detail">
    <div class="resource-detail-header">
      <div class="resource-detail-title">
        <PhotoIcon
          v-if="graphIdToNameTable[props.resource.graph_id] === 'Artwork'"
          class="resource-header-icon"
        />
        <UserIcon
          v-if="graphIdToNameTable[props.resource.graph_id] === 'Artist'"
          class="resource-header-icon"
        />
        <h1>{{ props.resource.displayname ?? '' }}</h1>
      </div>

      <RouterLink :to="'/'" class="resource-detail-back-button">
        <button type="button" class="back-button">
          <ArrowLeftIcon class="back-button-icon" />
          BACK
        </button>
      </RouterLink>
    </div>

    <ResourceDetail>
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
import { ArrowLeftIcon, PhotoIcon, UserIcon } from '@heroicons/vue/24/outline';
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
</script>

<style scoped>
.resource-detail {
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--1x);
  background-color: #fff8e0;
  padding: var(--wac--accessible-spacing--1x);
  height: 100vh;
}

.resource-detail-header {
  display: flex;
  justify-content: space-between;
}

.resource-detail-title {
  display: flex;
  gap: var(--wac--accessible-spacing--1x);
}

.resource-detail-back-button {
  text-decoration: none;
  justify-content: flex-end;
}
.resource-header-icon {
  width: var(--wac--line-height--h1);
  height: var(--wac--line-height--h1);
}

@media screen and (min-width: 768px) and (max-width: 940px) {
  .resource-detail {
    height: 100%;
  }
}

@media screen and (min-width: 940px) {
  .resource-detail {
    display: flex;
    flex-direction: column;
    margin-left: var(--wac--accessible-spacing--2x);
    margin-right: var(--wac--accessible-spacing--2x);
    gap: var(--wac--accessible-spacing--1x);
    background-color: #fff8e0;
    padding: none;
  }

  .resource-detail-back-button {
    font-size: var(--wac--font-size);
  }
}
</style>
