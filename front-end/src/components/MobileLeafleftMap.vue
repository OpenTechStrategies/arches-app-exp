<template>
  <div class="map-container expanded">
    <div>
      <div class="map-wrapper">
        <div id="map" ref="mapElement" />
      </div>
    </div>
    <Transition name="slide-up">
      <div v-if="filteredResource && flip" class="search-list-item-wrapper">
        <SearchListItem
          :key="filteredResource.resourceinstanceid"
          :resource-name="filteredResource.descriptors.en.name"
          :resource-description="filteredResource.descriptors.en.description"
          :resource-id="filteredResource.resourceinstanceid"
          :resource-type="props.idReferences.graphIdToNameTable[filteredResource.graph_id]"
          class="search-list-item"
          :image-tile-data="
            getImageTileDataForResource(
              filteredResource,
              props.imagesPrefetch,
              props.resourceRelationsPrefetch,
              props.idReferences
            )
          "
          :artist="
            getArtistForArtwork(
              filteredResource,
              props.resourcesPrefetch,
              props.resourceRelationsPrefetch,
              props.idReferences
            )
          "
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import 'leaflet/dist/leaflet.css';
import type { Marker } from 'leaflet';
import type {
  Tile,
  CoordinatesTileData,
  Resource,
  Prefetch,
  MapResource,
  ImageTileData,
  ResourceXResource
} from '@/types';
import L from 'leaflet';
import { getArtistForArtwork, getImageTileDataForResource } from '@/utils';
import { useRoute } from 'vue-router';
import SearchListItem from './SearchListItem.vue';

const route = useRoute();

const mapResources = ref<Array<MapResource>>([]);
const activeResourceId = ref<string | undefined>(undefined);
const flip = ref<boolean>(false);

const props = defineProps<{
  resourcesPrefetch: Array<Resource>;
  locationsPrefetch: Array<Tile<CoordinatesTileData>>;
  idReferences: Prefetch['idReferences'];
  imagesPrefetch: Array<Tile<ImageTileData[]>>;
  resourceRelationsPrefetch: Array<ResourceXResource>;
}>();

const DEFAULT_LAT = 41.87213786;
const DEFAULT_LONG = -87.62576558;
const DEFAULT_ZOOM_LEVEL = 14;
const HIGHLIGHT_ZOOM_LEVEL = 18;

const isProd = import.meta.env.PROD;

mapResources.value = props.resourcesPrefetch.map((resource) => ({
  resource,
  coordinates:
    props.locationsPrefetch.find(
      (location) => location.resourceinstance_id === resource.resourceinstanceid
    )?.data[props.idReferences.coordinatesNodeId] ?? undefined
}));

const mapElement = ref<HTMLElement | null>(null);

let leaflet: L.Map | undefined;

const markerTable = new Map<string, Marker<null>>();

const defaultIcon = L.icon({
  iconUrl: isProd
    ? `${import.meta.env.VITE_ARCHES_API_URL}/archesdataviewer/marker-icon.png`
    : '/marker-icon.png',
  iconSize: [22, 34],
  popupAnchor: [0, -32]
});

const activeIcon = L.icon({
  iconUrl: isProd
    ? `${import.meta.env.VITE_ARCHES_API_URL}/archesdataviewer/marker-icon-active.png`
    : '/marker-icon-active.png',
  iconSize: [33, 51],
  popupAnchor: [0, -32]
});

const initMap = (element: HTMLElement) => {
  const map = L.map(element).setView([DEFAULT_LAT, DEFAULT_LONG], DEFAULT_ZOOM_LEVEL);
  leaflet = map;

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  map.attributionControl.setPosition('topright');
  mapResources.value.forEach((value) => {
    if (value.coordinates) {
      const coordinate = value.coordinates?.features[0].geometry.coordinates ?? undefined;
      if (coordinate) {
        const marker = L.marker([coordinate[1], coordinate[0]], { icon: defaultIcon });
        marker.bindPopup(`<b>${value.resource.descriptors.en.name}</b>`);
        marker.on('click', () => {
          flip.value = false;
          setTimeout(() => {
            activeResourceId.value = value.resource.resourceinstanceid;
            flip.value = true;
          }, 200);
        });
        markerTable.set(value.resource.resourceinstanceid, marker);
        marker.addTo(map);
      }
    }
  });

  return leaflet;
};

onMounted(() => {
  if (mapElement.value) {
    leaflet = initMap(mapElement.value);
    if (route.params.id) {
      const marker = markerTable.get(route.params.id as string);
      if (marker) {
        marker.openPopup();
        leaflet?.flyTo(marker.getLatLng(), HIGHLIGHT_ZOOM_LEVEL);
      }
    }
  }
});

watch(
  () => activeResourceId.value,
  (newId) => {
    markerTable.forEach((marker) => {
      marker.setIcon(defaultIcon);
      marker.setZIndexOffset(0);
    });
    if (newId) {
      const marker = markerTable.get(newId as string);
      if (marker) {
        marker.setIcon(activeIcon);
        marker.setZIndexOffset(1000);
        marker.openPopup();
        leaflet?.flyTo(marker.getLatLng(), HIGHLIGHT_ZOOM_LEVEL);
      } else {
        leaflet?.closePopup();
      }
    } else {
      leaflet?.closePopup();
      leaflet?.setView([DEFAULT_LAT, DEFAULT_LONG], DEFAULT_ZOOM_LEVEL);
    }
  },
  { immediate: true }
);

const filteredResource = computed(() =>
  props.resourcesPrefetch.find((resource) => resource.resourceinstanceid === activeResourceId.value)
);
</script>

<style scoped>
.map-container {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--tertiary);
  z-index: -1;
}

#map {
  width: 100%;
  height: 100%;
}

.map-wrapper {
  --wac--map-expanded-height: 600px;
  overflow: hidden;
  z-index: 1;
  height: var(--wac--map-expanded-height);
  transition: height 0.5s ease;
}
.search-list-item-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #fff8e0;
  z-index: 999;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: center;
  padding-top: var(--wac--accessible-spacing--1x);
}
.search-list-item {
  margin: auto;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(120%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
