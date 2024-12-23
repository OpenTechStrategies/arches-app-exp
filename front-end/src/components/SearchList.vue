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
        @click="router.push('/artworks')"
      >
        <PhotoIcon class="button-icon" />
        <span>Artworks</span>
      </button>
      <button
        type="button"
        class="nav-button"
        :class="{ active: selectedResourceType === 'Artist' }"
        @click="router.push('/artists')"
      >
        <UserIcon class="button-icon" />
        <span>Artists</span>
      </button>
      <button
        type="button"
        class="nav-button"
        :class="{ active: selectedResourceType === 'About' }"
        @click="router.push('/about')"
      >
        <InformationCircleIcon class="button-icon" />
        <span>About</span>
      </button>
    </div>
    <Transition>
      <div v-if="query === '' && selectedResourceType === null" class="search-results-container">
        <div class="search-results-header">
          <div class="search-results-header-title">
            <PhotoIcon class="search-results-header-icon" />
            <h1>Artworks</h1>
          </div>
          <button type="button" class="see-all-button" @click="router.push('/artworks')">
            SEE ALL
          </button>
        </div>
        <div class="search-results">
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
      <div v-if="query === '' && selectedResourceType === null" class="search-results-container">
        <div class="search-results-header">
          <div class="search-results-header-title">
            <UserIcon class="search-results-header-icon" />
            <h1>Artists</h1>
          </div>
          <button type="button" class="see-all-button" @click="router.push('/artists')">
            SEE ALL
          </button>
        </div>
        <div class="search-results">
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
      <div v-if="query !== '' && selectedResourceType === null" class="search-results-container">
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
    <Transition>
      <div v-if="selectedResourceType === 'Artwork'" class="search-results-container">
        <div class="search-results-header">
          <div class="search-results-header-title">
            <PhotoIcon class="search-results-header-icon" />
            <h1>Artworks</h1>
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
    <Transition>
      <div v-if="selectedResourceType === 'Artist'" class="search-results-container">
        <div class="search-results-header">
          <div class="search-results-header-title">
            <UserIcon class="search-results-header-icon" />
            <h1>Artists</h1>
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
    <Transition>
      <div v-if="query === '' && selectedResourceType === 'About'" class="search-results-container">
        <div class="search-results-header">
          <div class="search-results-header-title">
            <h1>WAC: A Visual Journey</h1>
          </div>
          <button type="button" class="back-button" @click="router.push('/')">
            <div class="back-button-icon">
              <ArrowLeftIcon />
            </div>
            <span>Back</span>
          </button>
        </div>
        <p>
          In 2013, Columbia College Chicago launched the Wabash Arts Corridor to immerse students in
          the creative spirit by using urban spaces and reclaimable resources to revitalize and
          transform the South Loop business district into one of the city's major cultural assets.
          The heart of WAC is Wabash Avenue from Van Buren to Roosevelt and is framed to the east by
          Michigan Avenue and to the west by State Street. The corridor is regarded as an “living
          urban canvas” due to its ever-growing number of large-scale mural installations and
          collaborative projects.
        </p>
        <br />
        <p>See Columbia College's page about the Wabash Arts Corridor for more information.</p>
        <br />
        <p>
          About / Credit This site is a project of Open Tech Strategies, LLC. Our thanks to the
          artists and curators who created and continue to build the Wabash Arts Corridor in
          Chicago. Please write us at info@opentechstrategies.com to suggest changes or improvements
          to this site.
        </p>
        <br />
        <p>
          This site is free & open source software, based on the Arches heritage data management
          platform. See the application code, the data, and our data import scripts. Contributions
          welcome.
        </p>
        <br />
        <div class="credits">
          <div class="credit">
            <p>Designed by</p>
            <img
              :src="
                isProd
                  ? 'https://arches-app-demo.opentechstrategies.com/archesdataviewer/ots_logo.png'
                  : '/ots_logo.png'
              "
              alt="no image available"
              loading="lazy"
            />
          </div>
          <div class="credit">
            <p>Powered by</p>
            <img
              :src="
                isProd
                  ? 'https://arches-app-demo.opentechstrategies.com/archesdataviewer/arches_logo.png'
                  : '/arches_logo.png'
              "
              alt="no image available"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  PhotoIcon,
  UserIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon
} from '@heroicons/vue/24/outline';
import type { Tile, ImageTileData, Resource, Prefetch, ResourceXResource } from '@/types';
import { getArtistForArtwork, getImageTileDataForResource } from '@/utils';
import SearchListItem from './SearchListItem.vue';

const router = useRouter();

const isProd = import.meta.env.PROD;

const query = ref<string>('');
const selectedResourceType = ref<string | null>(null);

const props = defineProps<{
  routeQuery?: string;
  resourcesPrefetch: Array<Resource>;
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
  idReferences: Prefetch['idReferences'];
}>();

if (props.routeQuery) {
  if (props.routeQuery === 'artworks') {
    selectedResourceType.value = 'Artwork';
  } else if (props.routeQuery === 'artists') {
    selectedResourceType.value = 'Artist';
  } else if (props.routeQuery === 'about') {
    selectedResourceType.value = 'About';
  }
}

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
      .includes(query.value.toLowerCase());

    const matchesType = selectedResourceType.value
      ? props.idReferences.graphIdToNameTable[resource.graph_id] === selectedResourceType.value
      : true;

    return matchesQuery && matchesType;
  })
);

watch(
  () => props.routeQuery,
  (newRouteQuery) => {
    if (newRouteQuery === 'artworks') {
      selectedResourceType.value = 'Artwork';
    } else if (newRouteQuery === 'artists') {
      selectedResourceType.value = 'Artist';
    } else if (newRouteQuery === 'about') {
      selectedResourceType.value = 'About';
    } else {
      selectedResourceType.value = null;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.search-list-container {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--quartary);
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

  &.active {
    background: var(--wac--color--highlight);
  }
}

span {
  font-size: 0.875rem;
  text-align: center;
}

.search-results-container {
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--1x);
}

.search-results {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 0;
  max-width: 650px;
}

.search-results-header {
  display: flex;
  justify-content: space-between;
}

.search-results-header-icon {
  width: calc(var(--wac--line-height) * 1em);
  height: calc(var(--wac--line-height) * 1em);
}

.search-results-header-title {
  display: flex;
  font-size: var(--wac--font-size--xxl);
  gap: var(--wac--accessible-spacing--2x);
}

.see-all-button {
  border-radius: 32px;
  font-size: var(--wac--font-size--sm);
}

.credits {
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--2x);
  flex-wrap: wrap;
}

.credit {
  display: flex;
  align-items: center;
  gap: var(--wac--accessible-spacing--halfx);
}

.credits img {
  max-height: 50px;
  max-width: 150px;
  height: auto;
  object-fit: contain;
}

@media screen and (min-width: 940px) {
  .search-input {
    padding: var(--wac--accessible-spacing--2x);
  }
}
</style>
