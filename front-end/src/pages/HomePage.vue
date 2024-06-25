<template>
  <div class="home">
    <div id="search-list-container" class="column">
      <SearchListProvider v-slot="{ searchResults, fetchNextPage, fetchPreviousPage, pageValues }">
        <SearchList
          v-if="searchResults"
          :search-results="searchResults"
          :page-values="pageValues"
          :graph-table="props.graphTable"
          @next-page="fetchNextPage"
          @previous-page="fetchPreviousPage"
        />
      </SearchListProvider>
    </div>
    <div id="map-container" class="column">
      <LeafletMapProvider v-slot="{ artworks }">
        <LeafletMap v-if="artworks" :artworks="artworks" />
        <div v-else class="map-placeholder">Loading Map...</div>
      </LeafletMapProvider>
    </div>
    <div id="resource-panel-container" class="column">
      <ResourcePanelProvider v-slot="{ resource, resourceRelations }">
        <ResourcePanel
          :graph-table="props.graphTable"
          :resource="resource"
          :resource-relations="resourceRelations"
        />
      </ResourcePanelProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchListProvider from '../components/SearchListProvider.vue';
import SearchList from '../components/SearchList.vue';
import LeafletMapProvider from '../components/LeafletMapProvider.vue';
import LeafletMap from '../components/LeafletMap.vue';
import ResourcePanel from '../components/ResourcePanel.vue';
import ResourcePanelProvider from '@/components/ResourcePanelProvider.vue';

const props = defineProps<{
  graphTable: Map<string, string>;
}>();
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  height: 100vh;
}

.column {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.map-placeholder {
  margin-top: 30vh;
  text-align: center;
  font-size: larger;
}

@media (max-width: 1200px) {
  .home {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  #map-container {
    order: 1;
  }

  #search-list-container {
    order: 2;
  }

  #resource-panel-container {
    order: 3;
  }
}
</style>
