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

<style scoped>
.home {
  display: flex;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
}

.column {
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
}

.map-placeholder {
  margin-top: 30vh;
  text-align: center;
  font-size: larger;
}

#search-list-container,
#map-container,
#resource-panel-container {
  padding: 10px;
}
</style>
