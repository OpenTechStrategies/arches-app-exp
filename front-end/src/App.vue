<template>
  <div class="home">
    <header class="welcome">
      <div class="toggle-top-text">
        <button
          type="button"
          :class="showTopText ? 'top-text-button expanded' : 'top-text-button collapsed'"
          @click="toggleTopText"
        >
          <h1>Explore Chicago’s Wabash Arts Corridor</h1>
          <InformationCircleIcon class="button-icon" />
        </button>
        <button type="button" class="top-text-button x-button" @click="toggleTopText">
          <XMarkIcon :class="showTopText ? 'button-icon shown' : 'button-icon hidden'" />
        </button>
      </div>
      <p :class="showTopText ? 'top-text expanded' : 'top-text collapsed'">
        In 2013, Columbia College Chicago launched the Wabash Arts Corridor to immerse students in
        the creative spirit by using urban spaces and reclaimable resources to revitalize and
        transform the South Loop business district into one of the city’s major cultural assets. The
        heart of WAC is Wabash Avenue from Van Buren to Roosevelt and is framed to the east by
        Michigan Avenue and to the west by State Street. The corridor is regarded as an “living
        urban canvas” due to its ever-growing number of large-scale mural installations and
        collaborative projects.
      </p>
    </header>
    <main>
      <div id="map-container">
        <LeafletMap
          v-if="resourcesPrefetch && idReferences && locationsPrefetch"
          :resources-prefetch="resourcesPrefetch"
          :id-references="idReferences"
          :locations-prefetch="locationsPrefetch"
        />
        <div v-else class="map-placeholder">Loading map…</div>
      </div>
      <div id="search-list-container">
        <RouterView v-slot="{ Component }">
          <Transition
            v-if="resourcesPrefetch && resourceRelationsPrefetch && idReferences && imagesPrefetch"
          >
            <component
              :is="Component"
              :resources-prefetch="resourcesPrefetch"
              :resource-relations-prefetch="resourceRelationsPrefetch"
              :id-references="idReferences"
              :images-prefetch="imagesPrefetch"
            />
          </Transition>
        </RouterView>
      </div>
    </main>
    <footer class="footer">
      <div class="footer-blurb">
        <h2>About / Credit</h2>
        <p>
          This site is a project of
          <a href="https://opentechstrategies.com/">Open Tech Strategies, LLC</a>. Our thanks to the
          artists and curators who created and continue to build the
          <a href="https://students.colum.edu/deps/wabash-arts-corridor">Wabash Arts Corridor</a> in
          Chicago. Please write us at
          <a
            href="mailto:info@opentechstrategies.com?subject=Explore%20Wabash%20Arts%20Corridor%20site"
            >info@opentechstrategies.com</a
          >
          to suggest changes or improvements to this site.
        </p>
        <p>
          This site is free &amp; open source software, based on the
          <a href="https://www.archesproject.org/">Arches</a> heritage data management platform. See
          the <a href="https://github.com/OpenTechStrategies/arches-app-exp">application code</a>,
          the
          <a href="https://code.librehq.com/ots/arches/arches-demo-data/-/tree/main/wac">data</a>,
          and our
          <a href="https://code.librehq.com/ots/arches/arches-sites/-/tree/main/ots/wac"
            >data import scripts</a
          >. Contributions welcome.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import LeafletMap from '@/components/LeafletMap.vue';
import type {
  ImageTileData,
  Tile,
  CoordinatesTileData,
  Resource,
  Prefetch,
  ResourceXResource
} from './types';

const showTopText = ref<boolean>(false);

const toggleTopText = () => {
  showTopText.value = !showTopText.value;
};

const idReferences = ref<Prefetch['idReferences'] | undefined>(undefined);
const imagesPrefetch = ref<Array<Tile<ImageTileData[]>> | undefined>(undefined);
const locationsPrefetch = ref<Array<Tile<CoordinatesTileData>> | undefined>(undefined);
const resourceRelationsPrefetch = ref<Array<ResourceXResource> | undefined>(undefined);
const resourcesPrefetch = ref<Array<Resource> | undefined>(undefined);

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
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--primary);
}

.welcome {
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--halfx);
  font-size: var(--wac--font-size);
  line-height: var(--wac--line-height--tight);
  font-size: var(--wac--font-size--lg);
  max-width: var(--wac--text--sensible-max-width);
  text-wrap: balance;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--2x);
  max-width: calc(var(--wac--text--sensible-max-width) * 1.5);
  text-wrap: balance;
}

.footer-blurb {
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--1x);
}

main {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--primary);
}

#map-container,
#search-list-container {
  flex-basis: 50%;
}

.top-text {
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 500ms ease-in-out,
    padding 300ms ease;
}

.top-text.expanded {
  max-height: 350px;
  padding-top: 10px;
}

.top-text.collapsed {
  max-height: 0;
  padding-top: 0;
}

.top-text-button {
  border: none;
}

.toggle-top-text {
  display: flex;
  flex-direction: row;
}

.x-button {
  opacity: 1;
  margin-left: auto;
}

.hidden {
  opacity: 0;
}

@media screen and (min-width: 940px) {
  .welcome {
    font-size: var(--wac--font-size--xxl);
  }

  main {
    flex-direction: row-reverse;
  }
}
</style>
