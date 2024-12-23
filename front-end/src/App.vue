<template>
  <div class="home">
    <header class="welcome">
      <div class="welcome-content">
        <h1>
          Explore Chicago’s <br />
          Wabash Arts Corridor
        </h1>
        <div class="welcome-credits">
          <div class="welcome-credit">
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
          <div class="welcome-credit">
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
import LeafletMap from '@/components/LeafletMap.vue';
import type {
  ImageTileData,
  Tile,
  CoordinatesTileData,
  Resource,
  Prefetch,
  ResourceXResource
} from './types';

const isProd = import.meta.env.PROD;

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
main {
  background-color: #fff8e0;
  padding-left: var(--wac--accessible-spacing--2x);
  border-radius: 32px;
}

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
  text-wrap: balance;
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

.welcome-credit {
  display: flex;
  align-items: center;
  gap: var(--wac--accessible-spacing--halfx);
}

.welcome-credits img {
  max-height: 25px;
  max-width: 150px;
  height: auto;
  object-fit: contain;
}

.welcome-credits p {
  font-weight: var(--wac--font-weight--normal);
  font-size: var(--wac--font-size);
  margin: 0;
  white-space: nowrap;
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
  .welcome-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .welcome h1 {
    flex: 1;
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

  main {
    flex-direction: row-reverse;
  }
}
</style>
