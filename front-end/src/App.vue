<script setup lang="ts">
import Home from '@/pages/HomePage.vue';
import { ref } from 'vue';
import type { Graph } from './types';

const graphTable = ref<Map<string, string>>(new Map());

async function fetchGraphTable() {
  const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/archesdataviewer/graphs`);
  const response: Graph[] = await fetch(url.toString()).then((res) => res.json());

  const map = new Map<string, string>();
  response.forEach((item) => {
    map.set(item.graphid, item.name);
  });

  graphTable.value = map;
}

fetchGraphTable();
</script>

<template>
  <main>
    <Home :graph-table="graphTable" />
  </main>
</template>
