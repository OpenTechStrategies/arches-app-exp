<template>
  <div class="home">
    <div class="welcome">
      <h2>Wabash Arts Corridor</h2>
      <p>
        In 2013, Columbia College Chicago launched the Wabash Arts Corridor to immerse students in
        the creative spirit by using urban spaces and reclaimable resources to revitalize and
        transform the South Loop business district into one of the city’s major cultural assets. The
        heart of WAC is Wabash Avenue from Van Buren to Roosevelt and is framed to the east by
        Michigan Avenue and to the west by State Street. The corridor is regarded as an “living
        urban canvas” due to its ever-growing number of large-scale mural installations and
        collaborative projects.
      </p>
    </div>
    <div id="map-container">
      <LeafletMapProvider v-slot="{ artworks }">
        <LeafletMap v-if="artworks" :artworks="artworks" />
        <div v-else class="map-placeholder">Loading Map...</div>
      </LeafletMapProvider>
    </div>
    <div id="search-list-container">
      <SearchListProvider
        v-slot="{ searchResults, pageValues, searchQuery }"
        :graph-table="props.graphTable"
      >
        <SearchList
          v-if="searchResults"
          :search-results="searchResults"
          :page-values="pageValues"
          :graph-table="props.graphTable"
          :search-query="searchQuery"
        />
      </SearchListProvider>
    </div>
    <div class="footer">
      <div class="footer-blurb">
        <h2>About / Credit</h2>
        <p>
          This site is a project of XYZ and ABC in association with DEF. All artwork is courtesy of
          the respective artist. You can email contact@example.org to suggest changes or pat our
          collective back.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchListProvider from '../components/SearchListProvider.vue';
import SearchList from '../components/SearchList.vue';
import LeafletMapProvider from '../components/LeafletMapProvider.vue';
import LeafletMap from '../components/LeafletMap.vue';

const props = defineProps<{
  graphTable: Map<string, string>;
}>();
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 16px;
  gap: 64px;
  position: relative;
  overflow-y: scroll;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  .footer-blurb {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
  }
}

#map-container {
  width: 100%;
}
</style>
