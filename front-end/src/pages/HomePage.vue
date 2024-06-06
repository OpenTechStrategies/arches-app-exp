<script setup lang="ts">
import ResourceListProvider from '../components/resources/ResourceListProvider.vue';
import ResourceList from '../components/resources/ResourceList.vue';
</script>

<template>
  <div>
    <ResourceListProvider v-slot="{ resources, fetchNextPage, fetchPreviousPage, pageValues }">
      <ResourceList
        :resources="resources"
        :pageValues="pageValues"
        @next-page="fetchNextPage"
        @previous-page="fetchPreviousPage"
        v-if="resources"
      />
    </ResourceListProvider>
  </div>
</template>
