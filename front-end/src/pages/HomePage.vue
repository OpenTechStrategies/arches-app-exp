<script setup lang="ts">
import SearchListProvider from '../components/SearchListProvider.vue';
import SearchList from '../components/SearchList.vue';
</script>

<template>
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
</template>
