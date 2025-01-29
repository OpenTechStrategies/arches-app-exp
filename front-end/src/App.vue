<template>
  <div class="home">
    <header class="welcome">
      <div class="welcome-content">
        <h1 class="welcome-text">
          <a href="/">
            Explore Chicago’s <br />
            Wabash Arts Corridor
          </a>
        </h1>
        <div class="welcome-credits">
          <a class="welcome-credit" href="https://opentechstrategies.com/">
            <p>Designed by</p>
            <img
              id="ots-logo"
              :src="
                isProd
                  ? 'https://arches-app-demo.opentechstrategies.com/archesdataviewer/ots_logo.png'
                  : '/ots_logo.png'
              "
              alt="no image available"
              loading="lazy"
            />
          </a>

          <a class="welcome-credit" href="https://www.archesproject.org/">
            <p>Powered by</p>
            <img
              id="arches-logo"
              :src="
                isProd
                  ? 'https://arches-app-demo.opentechstrategies.com/archesdataviewer/arches_logo.png'
                  : '/arches_logo.png'
              "
              alt="no image available"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </header>
    <main>
      <div id="map-container">
        <DesktopLeafletMap
          v-if="resourcesPrefetch && idReferences && locationsPrefetch"
          :resources-prefetch="resourcesPrefetch"
          :id-references="idReferences"
          :locations-prefetch="locationsPrefetch"
        />
        <div v-else class="map-placeholder">Loading map…</div>
      </div>
      <div id="search-list-container">
        <div class="search-header">
          <div class="search-input-wrapper">
            <MagnifyingGlassIcon class="search-icon" />
            <input v-model="query" class="search-input" placeholder="Search" />
          </div>
          <button
            type="button"
            class="nav-button"
            :class="{ active: activePage === '/artworks' }"
            @click="router.push('/artworks')"
          >
            <PhotoIcon class="button-icon" />
            <p>Artworks</p>
          </button>
          <button
            type="button"
            class="nav-button"
            :class="{ active: activePage === '/artists' }"
            @click="router.push('/artists')"
          >
            <UserIcon class="button-icon" />
            <p>Artists</p>
          </button>
          <button
            id="map-icon"
            type="button"
            class="nav-button map-icon"
            :class="{ active: activePage === '/map' }"
            @click="router.push('/map')"
          >
            <MapPinIcon class="button-icon" />
            <p>Map</p>
          </button>
          <button
            type="button"
            class="nav-button"
            :class="{ active: activePage === '/about' }"
            @click="router.push('/about')"
          >
            <InformationCircleIcon class="button-icon" />
            <p>About</p>
          </button>
        </div>
        <RouterView v-slot="{ Component }">
          <Transition
            v-if="
              resourcesPrefetch &&
              resourceRelationsPrefetch &&
              idReferences &&
              imagesPrefetch &&
              locationsPrefetch
            "
          >
            <component
              :is="Component"
              :resources-prefetch="resourcesPrefetch"
              :resource-relations-prefetch="resourceRelationsPrefetch"
              :id-references="idReferences"
              :images-prefetch="imagesPrefetch"
              :locations-prefetch="locationsPrefetch"
              :query="query"
            />
          </Transition>
        </RouterView>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import DesktopLeafletMap from '@/components/DesktopLeafletMap.vue';
import { useRouter } from 'vue-router';
import {
  PhotoIcon,
  UserIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline';
import type {
  ImageTileData,
  Tile,
  CoordinatesTileData,
  Resource,
  Prefetch,
  ResourceXResource
} from './types';

const router = useRouter();

const isProd = import.meta.env.PROD;

const idReferences = ref<Prefetch['idReferences'] | undefined>(undefined);
const imagesPrefetch = ref<Array<Tile<ImageTileData[]>> | undefined>(undefined);
const locationsPrefetch = ref<Array<Tile<CoordinatesTileData>> | undefined>(undefined);
const resourceRelationsPrefetch = ref<Array<ResourceXResource> | undefined>(undefined);
const resourcesPrefetch = ref<Array<Resource> | undefined>(undefined);
const query = ref<string>('');
const activePage = ref<string>('');

async function prefetchResources() {
  try {
    const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/archesdataviewer/prefetch/`);
    const response = await fetch(url.toString());
    const data: Prefetch = await response.json();
    idReferences.value = data.idReferences;
    imagesPrefetch.value = data.images;
    locationsPrefetch.value = data.locations;
    resourceRelationsPrefetch.value = data.resourceRelations;
    resourcesPrefetch.value = data.resources;
  } catch (error) {
    idReferences.value = undefined;
    imagesPrefetch.value = undefined;
    locationsPrefetch.value = undefined;
    resourceRelationsPrefetch.value = undefined;
    resourcesPrefetch.value = undefined;
  }
}

prefetchResources();

watch(
  () => router.currentRoute.value,
  (newValue) => {
    activePage.value = newValue.path;
    return true;
  }
);
</script>

<style scoped>
main {
  border-radius: 20px;
}

.home {
  display: flex;
  flex-direction: column;
}

.welcome {
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--halfx);
  font-size: var(--wac--font-size);
  line-height: var(--wac--line-height--tight);
  font-size: var(--wac--font-size--lg);
  text-wrap: balance;
  margin: var(--wac--accessible-spacing--2x);
}

.welcome-content {
  display: flex;
  flex-direction: column;
}

.welcome-credits {
  display: flex;
  gap: var(--wac--accessible-spacing--halfx);
  flex-wrap: wrap;
}

.welcome-text {
  font-size: 32px;
  line-height: 38.4px;
}

.welcome-credit {
  display: flex;
  align-items: center;
  gap: var(--wac--accessible-spacing--halfx);
  text-decoration: none;
}

.welcome-credits img {
  max-height: 20px;
  max-width: 150px;
  height: auto;
  object-fit: contain;
}

.welcome-text a {
  text-decoration: none;
}

.welcome-credits p {
  font-weight: var(--wac--font-weight--normal);
  font-size: var(--wac--font-size);
  margin: 0px;
  white-space: nowrap;
}

main {
  display: flex;
  flex-direction: column;
}

#map-container,
#search-list-container {
  flex-basis: 50%;
}

#search-list-container {
  order: -1;
  background: #fff8e0;
}

#map-container {
  display: none;
}

.search-header {
  --wac--search-header--internal-spacing: var(--wac--semantic-spacing--tertiary);
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    white calc(100% - var(--wac--search-header--internal-spacing)),
    rgba(255, 255, 255, 0) 100%
  );
  width: 100vw;
  gap: var(--wac--semantic-spacing--tertiary);
  z-index: 999;
  margin-bottom: var(--wac--semantic-spacing--tertiary);
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
  grid-column-start: 1;
  grid-column-end: 5;
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

@media screen and (min-width: 768px) and (max-width: 940px) {
  main {
    background-color: #fff8e0;
  }
  .welcome-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .welcome h1 {
    flex: 1;
  }
  #arches-logo,
  #ots-logo {
    max-height: 26px;
  }
  .welcome-credits {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-end;
    gap: var(--wac--accessible-spacing--halfx);
    flex-wrap: wrap;
  }

  .welcome-credit {
    display: flex;
    align-items: center;
    gap: var(--wac--accessible-spacing--halfx);
  }

  .welcome-credits img {
    max-height: 50px;
    max-width: 150px;
    height: auto;
    object-fit: contain;
  }

  .welcome {
    font-size: var(--wac--font-size--xxl);
  }

  #search-list-container {
    order: 0;
    padding: var(--wac--accessible-spacing--2x);
    background: none;
  }

  main {
    flex-direction: column;
  }

  #map-container {
    display: block;
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
    width: 100%;

    background: linear-gradient(
      180deg,
      #fff8e0 calc(100% - var(--wac--search-header--internal-spacing)),
      rgba(255, 255, 255, 0) 100%
    );
    margin-bottom: 0px;
  }
  #map-icon {
    display: none;
  }
}

@media screen and (min-width: 940px) {
  main {
    padding-left: var(--wac--accessible-spacing--2x);
    background-color: #fff8e0;
  }
  .welcome-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .welcome h1 {
    flex: 1;
  }
  #arches-logo,
  #ots-logo {
    max-height: 26px;
  }
  .welcome-credits {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--wac--accessible-spacing--halfx);
    flex-wrap: wrap;
  }

  .welcome-credit {
    display: flex;
    align-items: center;
    gap: var(--wac--accessible-spacing--halfx);
  }

  .welcome-credits img {
    max-height: 50px;
    max-width: 150px;
    height: auto;
    object-fit: contain;
  }

  .welcome {
    font-size: var(--wac--font-size--xxl);
  }

  #search-list-container {
    order: 0;
    padding: var(--wac--accessible-spacing--2x);
    background: none;
  }

  main {
    flex-direction: row-reverse;
  }

  #map-container {
    display: block;
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
    width: 100%;

    background: linear-gradient(
      180deg,
      #fff8e0 calc(100% - var(--wac--search-header--internal-spacing)),
      rgba(255, 255, 255, 0) 100%
    );
  }
  #map-icon {
    display: none;
  }
}
</style>
