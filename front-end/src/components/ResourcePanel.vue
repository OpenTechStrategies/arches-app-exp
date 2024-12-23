<template>
  <div class="search-header">
    <button type="button" class="nav-button" @click="router.push(`/`)">
      <MagnifyingGlassIcon class="button-icon" />
      <span>Search</span>
    </button>
    <button type="button" class="nav-button" @click="router.push(`/artists`)">
      <PhotoIcon class="button-icon" />
      <span>Artworks</span>
    </button>
    <button type="button" class="nav-button" @click="router.push(`/artworks`)">
      <UserIcon class="button-icon" />
      <span>Artists</span>
    </button>
    <button type="button" class="nav-button" @click="router.push(`/about`)">
      <InformationCircleIcon class="button-icon" />
      <span>About</span>
    </button>
  </div>
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
        <div>{{ props.resource.displayname ?? '' }}</div>
      </div>
      <RouterLink :to="'/'" class="resource-detail-back-button">
        <button type="button" class="back-button">
          <ArrowLeftIcon class="back-button-icon" />
          <span>Back </span>
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
import {
  ArrowLeftIcon,
  PhotoIcon,
  UserIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import ResourceDetail from './ResourceDetail.vue';
import ArtworkDetailItem from './ArtworkDetailItem.vue';
import RelatedArtworkDetailItem from './RelatedArtworkDetailItem.vue';
import MoreArtworksByArtist from './MoreArtworksByArtist.vue';

const router = useRouter();

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
.search-header {
  --wac--search-header--internal-spacing: var(--wac--semantic-spacing--tertiary);
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-block: var(--wac--search-header--internal-spacing);

  background: linear-gradient(
    180deg,
    #fff8e0 calc(100% - var(--wac--search-header--internal-spacing)),
    rgba(255, 255, 255, 0) 100%
  );
}

.nav-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--wac--accessible-spacing--halfx);
  border: none;
  background: none;
  font-size: inherit;
  cursor: pointer;
  font-weight: var(--wac--font-weight--normal);
}

.resource-detail {
  display: flex;
  flex-direction: column;
  margin-left: var(--wac--accessible-spacing--2x);
  margin-right: var(--wac--accessible-spacing--2x);
  gap: var(--wac--accessible-spacing--1x);
}

.resource-detail-header {
  display: flex;
  justify-content: space-between;
}

.resource-detail-title {
  display: flex;
  font-size: var(--wac--font-size--xl);
  font-weight: var(--wac--font-weight--bold);
}

.resource-detail-back-button {
  text-decoration: none;
  font-size: var(--wac--font-size);
}
.resource-header-icon {
  width: calc(var(--wac--line-height) * 1em);
  height: calc(var(--wac--line-height) * 1em);
}
</style>
