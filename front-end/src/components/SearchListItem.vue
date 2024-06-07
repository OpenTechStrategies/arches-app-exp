<template>
  <div class="search-list-item">
    <h1>{{ `${props.result._source.displayname}` }}</h1>
    <h2>Description: {{ props.result._source.displaydescription }}</h2>
    <ul>
      <li>Language: {{ props.result._source.displaydescription }}</li>
      <li>
        Root Ontology Class:
        <a :href="props.result._source.root_ontology_class">{{
          props.result._source.root_ontology_class
        }}</a>
      </li>
      <li>Instance Id: {{ props.result._source.resourceinstanceid }}</li>
      <li>Graph Id: {{ props.result._source.graph_id }}</li>
      <li>Is Provisional Resource?: {{ props.result._source.provisional_resource }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '../types';

const props = defineProps<{
  result: SearchResult;
}>();
</script>

<style scoped>
.search-list-item {
  padding: 20px;
  margin: 20px;
  background-color: #c8c8c8cd;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
