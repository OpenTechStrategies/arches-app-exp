<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import type { SearchResultArray } from '@/types';
import { onMounted, ref } from 'vue';
import L, { Map } from 'leaflet';

const props = defineProps<{
  searchResults: SearchResultArray;
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
  props.searchResults.items.map((value) => {
    if (value._source?.points[0]?.point) {
      const marker = L.marker([
        value._source.points[0].point.lat,
        value._source.points[0].point.lon
      ]);
      marker.bindPopup(`<b>Artwork Title: ${value._source.displayname}</b><br>
      By: ${value._source.displaydescription}`);
      marker.addTo(map);
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
  <div id="map" ref="mapElement" />
</template>
<style scoped>
#map {
  height: 100%;
}
</style>
