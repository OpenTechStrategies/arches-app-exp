<template>
  <div class="search-list-container">
    <div class="search-content-container">
      <Transition>
        <div
          v-if="props.query === '' && selectedResourceType === null"
          class="search-results-container"
        >
          <div class="search-results-header">
            <div class="search-results-header-title">
              <ArtworksIcon class="search-results-header-icon" />
              <h1>Artworks</h1>
            </div>
            <button type="button" class="see-all-button" @click="router.push('/artworks')">
              SEE ALL
            </button>
          </div>
          <div class="search-results-landing">
            <SearchListItem
              v-for="result in artworksArray"
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
      </Transition>
      <Transition>
        <div
          v-if="props.query === '' && selectedResourceType === null"
          class="search-results-container"
        >
          <div class="search-results-header">
            <div class="search-results-header-title">
              <ArtistsIcon class="search-results-header-icon" />
              <h1>Artists</h1>
            </div>
            <button type="button" class="see-all-button" @click="router.push('/artists')">
              SEE ALL
            </button>
          </div>
          <div class="search-results-landing">
            <SearchListItem
              v-for="result in artistsArray"
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
      </Transition>
      <Transition>
        <div
          v-if="props.query !== '' && selectedResourceType === null"
          class="search-results-container"
        >
          <div class="search-results-header">
            <div class="search-results-header-title">
              <MagnifyingGlassIcon class="search-results-header-icon" />
              <h1>Search Results</h1>
            </div>
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
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import type { Tile, ImageTileData, Resource, Prefetch, ResourceXResource } from '@/types';
import { getArtistForArtwork, getImageTileDataForResource } from '@/utils';
import SearchListItem from './SearchListItem.vue';
import ArtistsIcon from './Icons/ArtistsIcon.vue';
import ArtworksIcon from './Icons/ArtworksIcon.vue';

const router = useRouter();

const selectedResourceType = ref<string | null>(null);

const props = defineProps<{
  routeQuery?: string;
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
  query: string;
}>();

const artworksArray = props.resourcesPrefetch
  .filter((resource) => props.idReferences.graphIdToNameTable[resource.graph_id] === 'Artwork')
  .slice(0, 4);

const artistsArray = props.resourcesPrefetch
  .filter((resource) => props.idReferences.graphIdToNameTable[resource.graph_id] === 'Artist')
  .reverse()
  .slice(0, 8);

const filteredResources = computed(() =>
  props.resourcesPrefetch.filter((resource) => {
    const matchesQuery = resource.descriptors.en.name
      .toLowerCase()
      .includes(props.query.toLowerCase());

    const matchesType = selectedResourceType.value
      ? props.idReferences.graphIdToNameTable[resource.graph_id] === selectedResourceType.value
      : true;

    return matchesQuery && matchesType;
  })
);
</script>

<style scoped>
.search-list-container {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--quartary);
  height: 100vh;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: auto;
  max-width: 650px;
  overflow-x: scroll;
}

.search-results-landing {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0;
  max-width: 650px;
  overflow-x: scroll;
  scrollbar-width: none;
}

.search-results-header {
  display: flex;
  justify-content: space-between;
}

.search-results-header-icon {
  width: var(--wac--line-height--h1);
  height: var(--wac--line-height--h1);
}

.see-all-button {
  border-radius: 32px;
}

.search-content-container {
  background-color: #fff8e0;
  width: 100vw;
  padding: var(--wac--accessible-spacing--2x);
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--2x);
}

@media screen and (min-width: 768px) and (max-width: 1460px) {
  .search-content-container {
    background-color: none;
    width: auto;
  }
  .search-results-landing {
    max-width: none;
  }
}

@media screen and (min-width: 1460px) {
  .search-content-container {
    background-color: none;
    width: auto;
  }

  .search-results {
    display: grid;
    flex-direction: column;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: auto;
    max-width: 650px;
    overflow-x: scroll;
  }

  .search-results-landing {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 0;
    max-width: 650px;
  }
  .search-list-container {
    height: auto;
  }
}
</style>
