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
    <div class="column" id="search-list-container">
      <SearchListProvider v-slot="{ searchResults, fetchNextPage, fetchPreviousPage, pageValues }">
        <SearchList
          :searchResults="searchResults"
          :pageValues="pageValues"
          :graphTable="props.graphTable"
          @next-page="fetchNextPage"
          @previous-page="fetchPreviousPage"
          v-if="searchResults"
        />
      </SearchListProvider>
    </div>
    <div class="column" id="map-container">
      <LeafletMapProvider v-slot="{ artworks }">
        <LeafletMap :artworks="artworks" v-if="artworks" />
        <div class="map-placeholder" v-else>Loading Map...</div>
      </LeafletMapProvider>
    </div>
    <div class="column" id="resource-panel-container">
      <ResourcePanelProvider v-slot="{ resource, resourceRelations }">
        <ResourcePanel
          :graphTable="props.graphTable"
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
