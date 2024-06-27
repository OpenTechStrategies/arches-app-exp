<template>
  <div v-if="props.artworks" id="map" ref="mapElement" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import 'leaflet/dist/leaflet.css';
import type { Marker } from 'leaflet';
import { useResourceStore } from '@/stores/resourceStore';
import type { MapArtwork } from '@/types';
import L from 'leaflet';
import { coordinatesStringToObject } from '@/utils';

const store = useResourceStore();
const props = defineProps<{
  artworks: Array<MapArtwork>;
}>();

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
  props.artworks.forEach((value) => {
    if (value.Location?.Coordinates) {
      try {
        const coordinate = coordinatesStringToObject(value.Location.Coordinates);
        if (coordinate) {
          const marker = L.marker([
            coordinate.features[0].geometry.coordinates[1],
            coordinate.features[0].geometry.coordinates[0]
          ]);
          marker.bindPopup(`<b>Artwork Title: ${value.Title}</b><br>
          By: ${value.Artist}<br> ${value.Location.Address}`);
          marker.on('click', () => {
            store.$patch({
              resourceId: value['@resource_id']
            });
          });
          markerTable.set(value['@resource_id'], marker);
          marker.addTo(map);
        }
      } catch (err) {
        console.error(`Error processing coordinates for artwork ${value.Title}:`, err);
      }
    } else {
      console.warn(`Coordinates not found for artwork ${value.Title}`);
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
  () => store.resourceId,
  async (newResourceId) => {
    if (newResourceId) {
      if (markerTable.get(newResourceId)) {
        markerTable.get(newResourceId)?.openPopup();
      } else {
        leaflet?.closePopup();
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  #map {
    height: 300px;
  }
}
</style>
