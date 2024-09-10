<template>
  <div
    class="expand-map-button"
    @click="
      {
        expandMap = !expandMap;
      }
    "
  >
    Explore the artwork geographically
  </div>
  <div :class="expandMap ? 'map-container-expanded' : 'map-container-collapsed'">
    <div id="map" ref="mapElement" />
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
const expandMap = ref<boolean>(false);

const props = defineProps<{
  resourcesPrefetch: Array<Resource>;
  locationsPrefetch: Array<Tile<CoordinatesTileData>>;
  idReferences: Prefetch['idReferences'];
}>();

const mapResources = ref<Array<MapResource>>([]);

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

const initMap = (element: HTMLElement) => {
  const map = L.map(element).setView([41.87213786, -87.62576558], 13);
  leaflet = map;
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  mapResources.value.forEach((value) => {
    if (value.coordinates) {
      const coordinate = value.coordinates?.features[0].geometry.coordinates ?? undefined;
      if (coordinate) {
        const marker = L.marker([coordinate[1], coordinate[0]]);
        marker.bindPopup(`<b>${value.resource.descriptors.en.name}</b>`);
        marker.on('click', () => {
          router.push(`/resource/${value.resource.resourceinstanceid}`);
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
  }
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      const marker = markerTable.get(newId as string);
      if (marker) {
        marker.openPopup();
      } else {
        leaflet?.closePopup();
      }
    } else {
      leaflet?.closePopup();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.expand-map-button {
  cursor: pointer;
  font-weight: 700;
  padding-bottom: 16px;
}

#map {
  width: 100%;
  height: 100%;
}

.map-container-collapsed {
  height: 100px;
  transition: height 0.5s ease;
}

.map-container-collapsed * {
  pointer-events: none;
}

.map-container-expanded {
  height: 400px;
  transition: height 0.5s ease;
}

@media (min-width: 940px) {
  .map-container-expanded,
  .map-container-collapsed {
    height: 100%;
    transition: none;
  }

  .map-container-collapsed * {
    pointer-events: all;
  }

  .expand-map-button {
    display: none;
  }
}
</style>
