<script setup lang="ts">
import SearchListProvider from '../components/SearchListProvider.vue';
import SearchList from '../components/SearchList.vue';
import LeafletMapProvider from '../components/LeafletMapProvider.vue';
import LeafletMap from '../components/LeafletMap.vue';
import ResourcePanel from '../components/ResourcePanel.vue';
import ResourcePanelProvider from '@/components/ResourcePanelProvider.vue';
</script>

<template>
  <div class="home">
    <div class="column" id="search-list-container">
      <SearchListProvider v-slot="{ searchResults, fetchNextPage, fetchPreviousPage, pageValues }">
        <SearchList
          :searchResults="searchResults"
          :pageValues="pageValues"
          @next-page="fetchNextPage"
          @previous-page="fetchPreviousPage"
          v-if="searchResults"
        />
      </SearchListProvider>
    </div>
    <div class="column" id="map-container">
      <LeafletMapProvider v-slot="{ searchResults }">
        <LeafletMap :search-results="searchResults" v-if="searchResults" />
      </LeafletMapProvider>
    </div>
    <div class="column" id="resource-panel-container">
      <ResourcePanelProvider v-slot="{resource }">
        <ResourcePanel :resource="resource" />
      </ResourcePanelProvider>
      </div
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

#search-list-container,
#map-container,
#resource-panel-container {
  padding: 10px;
}
</style>
