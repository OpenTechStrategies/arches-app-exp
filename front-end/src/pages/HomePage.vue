<script setup lang="ts">
import SearchListProvider from '../components/SearchListProvider.vue';
import SearchList from '../components/SearchList.vue';
import LeafletMapProvider from '../components/LeafletMapProvider.vue';
import LeafletMap from '../components/LeafletMap.vue';
</script>

<template>
  <div class="home">
    <div>
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
    <div id="map-container">
      <LeafletMapProvider v-slot="{ searchResults }">
        <LeafletMap :search-results="searchResults" v-if="searchResults" />
      </LeafletMapProvider>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
}
#map-container {
  margin: 100px;
  width: 50%;
}
</style>
