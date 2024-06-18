<script setup lang="ts">
import { onMounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import { useResourceStore } from '@/stores/resourceStore';
import type { MapArtwork } from '@/types';
import L, { Map } from 'leaflet';
import { coordinatesStringToObject } from '@/utils';
const store = useResourceStore();
const props = defineProps<{
  artworks: Array<MapArtwork>;
}>();

const mapElement = ref<HTMLElement | null>(null);
let leaflet: Map | undefined;

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
            coordinate.features[0].geometry.coordinates[1], // Latitude
            coordinate.features[0].geometry.coordinates[0] // Longitude
          ]);
          marker.bindPopup(`<b>Artwork Title: ${value.Title}</b><br>
        By: ${value.Artist}<br> ${value.Location.Address}`);
          marker.on('click', () => {
            store.$patch({
              resourceId: value['@resource_id']
            });
          });
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
</script>

<template>
  <div id="map" ref="mapElement" v-if="props.artworks" />
</template>
<style scoped>
#map {
  height: 80%;
}
</style>
