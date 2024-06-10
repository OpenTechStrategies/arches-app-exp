<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { onMounted, ref } from 'vue';
import L, { Map } from 'leaflet';

const mapElement = ref<HTMLElement | null>(null);
let leaflet: Map | undefined;

const initMap = (element: HTMLElement) => {
  const map = L.map(element).setView([51.505, -0.09], 13);
  leaflet = map;
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
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
