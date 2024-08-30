<template>
  <div class="home">
    <div class="welcome">
      <h2>Wabash Arts Corridor</h2>
      <p>
        In 2013, Columbia College Chicago launched the Wabash Arts Corridor to immerse students in
        the creative spirit by using urban spaces and reclaimable resources to revitalize and
        transform the South Loop business district into one of the city’s major cultural assets. The
        heart of WAC is Wabash Avenue from Van Buren to Roosevelt and is framed to the east by
        Michigan Avenue and to the west by State Street. The corridor is regarded as an “living
        urban canvas” due to its ever-growing number of large-scale mural installations and
        collaborative projects.
      </p>
    </div>
    <div id="map-container">
      <LeafletMap
        v-if="props.resourcesPrefetch && props.idReferences && props.locationsPrefetch"
        :resources-prefetch="props.resourcesPrefetch"
        :id-references="props.idReferences"
        :locations-prefetch="props.locationsPrefetch"
      />
      <div v-else class="map-placeholder">Loading Map...</div>
    </div>
    <div id="search-list-container">
      <Transition
        v-if="
          resourceStore.resourceId === undefined &&
          props.resourcesPrefetch &&
          props.resourceRelationsPrefetch &&
          props.idReferences &&
          props.imagesPrefetch
        "
      >
        <SearchList
          :resources-prefetch="props.resourcesPrefetch"
          :resource-relations-prefetch="props.resourceRelationsPrefetch"
          :id-references="props.idReferences"
          :images-prefetch="props.imagesPrefetch"
        />
      </Transition>
      <ResourcePanelProvider v-else v-slot="{ resource }">
        <ResourceDetailPanel
          v-if="props.resourceRelationsPrefetch && props.idReferences"
          :resource="resource"
          :id-references="props.idReferences"
          :resource-relations-prefetch="props.resourceRelationsPrefetch"
        />
      </ResourcePanelProvider>
    </div>
    <div class="footer">
      <div class="footer-blurb">
        <h2>About / Credit</h2>
        <p>
          This site is a project of XYZ and ABC in association with DEF. All artwork is courtesy of
          the respective artist. You can email contact@example.org to suggest changes or pat our
          collective back.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchList from '../components/SearchList.vue';
import LeafletMap from '../components/LeafletMap.vue';
import { useResourceStore } from '@/stores/resourceStore';
import ResourcePanelProvider from '@/components/ResourcePanelProvider.vue';
import ResourceDetailPanel from '@/components/ResourceDetailPanel.vue';
import type {
  ImageTileData,
  Tile,
  CoordinatesTileData,
  Resource,
  ResourceRelation,
  Prefetch
} from '@/types';
const resourceStore = useResourceStore();

const props = defineProps<{
  idReferences: Prefetch['idReferences'] | undefined;
  imagesPrefetch: Array<Tile<ImageTileData[]>> | undefined;
  locationsPrefetch: Array<Tile<CoordinatesTileData>> | undefined;
  resourceRelationsPrefetch: Array<ResourceRelation> | undefined;
  resourcesPrefetch: Array<Resource> | undefined;
  loading: boolean;
}>();
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 16px;
  gap: 64px;
  position: relative;
  overflow-y: scroll;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
}

.footer-blurb {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
}
#map-container {
  width: 100%;
}
</style>
