<script setup lang="ts">
import SearchListProvider from '../components/SearchListProvider.vue';
import SearchList from '../components/SearchList.vue';
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
      <LeafletMap />
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
}
#map-container {
  width: 800px;
  height: 600px;
}
</style>
