<script setup lang="ts">
import ResourceListProvider from '../components/ResourceListProvider.vue'
import ResourceList from '../components/ResourceList.vue'

</script>

<template>
  <div>
    <ResourceListProvider v-slot="{resources}">
      <ResourceList :resources="resources" v-if="resources"/>
    </ResourceListProvider>
  </div>
</template>



