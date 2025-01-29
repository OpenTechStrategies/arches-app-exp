<template>
  <div class="map-container expanded chevron-expanded">
    <div>
      <div class="map-wrapper">
        <div id="map" ref="mapElement" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import 'leaflet/dist/leaflet.css';
import type { Marker } from 'leaflet';
import type { Tile, CoordinatesTileData, Resource, Prefetch, MapResource } from '@/types';
import L from 'leaflet';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const mapResources = ref<Array<MapResource>>([]);

const props = defineProps<{
  resourcesPrefetch: Array<Resource>;
  locationsPrefetch: Array<Tile<CoordinatesTileData>>;
  idReferences: Prefetch['idReferences'];
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

  mapResources.value.forEach((value) => {
    if (value.coordinates) {
      const coordinate = value.coordinates?.features[0].geometry.coordinates ?? undefined;
      if (coordinate) {
        const marker = L.marker([coordinate[1], coordinate[0]], { icon: defaultIcon });
        marker.bindPopup(`<b>${value.resource.descriptors.en.name}</b>`);
        marker.on('click', () => {
          router.push(`/wac/resource/${value.resource.resourceinstanceid}`);
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
  () => route.params.id,
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
</script>

<style scoped>
.map-container {
  display: flex;
  flex-direction: column;
  gap: var(--wac--semantic-spacing--tertiary);
}

#map {
  width: 100%;
  height: 100%;
}

.map-wrapper {
  --wac--map-expanded-height: 400px;
  overflow: hidden;
  height: var(--wac--map-expanded-height);
  transition: height 0.5s ease;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

@media screen and (min-width: 768px) and (max-width: 940px) {
  .map-wrapper {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }
}

@media screen and (min-width: 940px) {
  #map {
    border-radius: 0px;
  }
  .map-wrapper {
    --wac--map-expanded-height: 100vh;
  }
  .map-container {
    position: sticky;
    top: 0;
    overflow: hidden;
    gap: var(--wac--semantic-spacing--tertiary);

    &.collapsed .map-wrapper {
      height: var(--wac--map-expanded-height);
      pointer-events: all;
    }
  }
}
</style>
