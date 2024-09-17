<template>
  <div class="home">
    <header class="welcome">
      <h1>Explore Chicago’s Wabash Arts Corridor</h1>
      <p>
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
          This site is a project of XYZ and ABC in association with DEF. All artwork is courtesy of
          the respective artist. You can email contact@example.org to suggest changes or pat our
          collective back.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LeafletMap from '@/components/LeafletMap.vue';
import type {
  ImageTileData,
  Tile,
  CoordinatesTileData,
  Resource,
  Prefetch,
  ResourceXResource
} from './types';

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

@media screen and (min-width: 940px) {
  .welcome {
    font-size: var(--wac--font-size--xxl);
  }

  main {
    flex-direction: row-reverse;
  }
}
</style>
