<template>
  <div class="search-list-container">
    <div class="search-header">
      <div class="search-input-wrapper">
        <MagnifyingGlassIcon class="search-icon" />
        <input v-model="query" class="search-input" placeholder="Search" />
      </div>
      <button
        type="button"
        class="nav-button"
        :class="{ active: selectedResourceType === 'Artwork' }"
        @click="filterByType('Artwork')"
      >
        <PhotoIcon class="button-icon" />
        <span>Artworks</span>
      </button>
      <button
        type="button"
        class="nav-button"
        :class="{ active: selectedResourceType === 'Artist' }"
        @click="filterByType('Artist')"
      >
        <UserIcon class="button-icon" />
        <span>Artists</span>
      </button>
      <button type="button" class="nav-button" @click="redirectToAboutPage">
        <InformationCircleIcon class="button-icon" />
        <span>About</span>
      </button>
    </div>
    <div class="search-results">
      <SearchListItem
        v-for="result in filteredResources"
        :key="result.resourceinstanceid"
        :resource-name="result.descriptors.en.name"
        :resource-description="result.descriptors.en.description"
        :resource-id="result.resourceinstanceid"
        :resource-type="props.idReferences.graphIdToNameTable[result.graph_id]"
        :image-tile-data="
          getImageTileDataForResource(
            result,
            props.imagesPrefetch,
            props.resourceRelationsPrefetch,
            props.idReferences
          )
        "
        :artist="
          getArtistForArtwork(
            result,
            props.resourcesPrefetch,
            props.resourceRelationsPrefetch,
            props.idReferences
          )
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  PhotoIcon,
  UserIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline';
import type { Tile, ImageTileData, Resource, Prefetch, ResourceXResource } from '@/types';
import { getArtistForArtwork, getImageTileDataForResource } from '@/utils';
import SearchListItem from './SearchListItem.vue';

const query = ref<string>('');
const selectedResourceType = ref<string | null>('Artwork');

const props = defineProps<{
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
}>();

const filteredResources = computed(() =>
  props.resourcesPrefetch.filter((resource) => {
    const matchesQuery = resource.descriptors.en.name
      .toLowerCase()
      .includes(query.value.toLowerCase());

    const matchesType = selectedResourceType.value
      ? props.idReferences.graphIdToNameTable[resource.graph_id] === selectedResourceType.value
      : true;

    return matchesQuery && matchesType;
  })
);

const filterByType = (type: string) => {
  selectedResourceType.value = type;
};

const redirectToAboutPage = () => {
  window.location.href = '/about';
};
</script>

<style scoped>
.search-list-container {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--secondary);
  margin-left: 50px;
}

.search-header {
  --wac--search-header--internal-spacing: var(--wac--semantic-spacing--tertiary);
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--wac--search-header--internal-spacing);
  padding-block: var(--wac--search-header--internal-spacing);

  background: linear-gradient(
    180deg,
    #fff8e0 calc(100% - var(--wac--search-header--internal-spacing)),
    rgba(255, 255, 255, 0) 100%
  );
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: #ffd54f;
  max-height: 50px;
  width: 100%;
  border-radius: 32px;
  padding: var(--wac--accessible-spacing--2x);
  gap: var(--wac--accessible-spacing--halfx);
}

.search-input {
  width: 100%;
  border: none;
  font-size: inherit;
  background: transparent;
  outline: none;
}

.search-icon {
  width: 24px;
  height: 24px;
  color: black;
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

.button-icon {
  width: 24px;
  height: 24px;
}

span {
  font-size: 0.875rem;
  text-align: center;
}

.search-results {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 0;
  max-width: 650px;
}

@media screen and (min-width: 940px) {
  .search-list-container {
    gap: var(--wac--semantic-spacing--primary);
  }
  .search-input {
    padding: var(--wac--accessible-spacing--2x);
  }
}
</style>
