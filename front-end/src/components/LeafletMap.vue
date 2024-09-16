<template>
  <div :class="expandMap ? 'map-container expanded' : 'map-container collapsed'">
    <button type="button" class="toggle-map" @click="expandMap = !expandMap">
      <span>Explore the artwork geographically</span>
      <ChevronRightIcon class="button-icon" />
    </button>
    <div @click="expandMap = true">
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
import { ChevronRightIcon } from '@heroicons/vue/24/solid';

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
  const map = L.map(element).setView([41.87213786, -87.62576558], 15);
  leaflet = map;

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const customIcon = L.icon({
    iconUrl: 'https://arches-app-demo.opentechstrategies.com/archesdataviewer/marker-icon-2x.png',
    iconSize: [16, 30],
    popupAnchor: [0, -32]
  });

  mapResources.value.forEach((value) => {
    if (value.coordinates) {
      const coordinate = value.coordinates?.features[0].geometry.coordinates ?? undefined;
      if (coordinate) {
        const marker = L.marker([coordinate[1], coordinate[0]], { icon: customIcon });
        marker.bindPopup(`<b>${value.resource.descriptors.en.name}</b>`);
        marker.on('click', () => {
          router.push(`/archesdataviewer/home/resource/${value.resource.resourceinstanceid}`);
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
.map-container {
  display: flex;
  flex-direction: column;
}

.toggle-map {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.4ch;
}

.button-icon {
  width: calc(var(--wac--line-height) * 1em);
  height: calc(var(--wac--line-height) * 1em);
  transition: transform 100ms ease;

  .expanded & {
    transform: rotate(90deg);
  }
}

#map {
  width: 100%;
  height: 100%;
}

.map-wrapper {
  --wac--map-collapsed-height: 90px;
  --wac--map-expanded-height: 600px;

  height: var(--wac--map-expanded-height);
  transition: height 0.5s ease;

  .collapsed & {
    height: var(--wac--map-collapsed-height);
    pointer-events: none;
  }
}

@media screen and (min-width: 940px) {
  .toggle-map {
    display: none;
  }

  .map-container {
    position: sticky;
    top: 0;

    padding-top: var(--wac--semantic-spacing--tertiary);
    gap: var(--wac--semantic-spacing--tertiary);

    &.collapsed .map-wrapper {
      height: var(--wac--map-expanded-height);
      pointer-events: all;
    }
  }
}
</style>
