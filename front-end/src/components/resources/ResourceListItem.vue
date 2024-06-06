<template>
  <div class="resource-list-item">
    <h1>{{ `${props.resource._source.displayname}` }}</h1>
    <h2>Description: {{ props.resource._source.displaydescription }}</h2>
    <ul>
      <li>Language: {{ props.resource._source.displaydescription }}</li>
      <li>
        Root Ontology Class:
        <a :href="props.resource._source.root_ontology_class">{{
          props.resource._source.root_ontology_class
        }}</a>
      </li>
      <li>Instance Id: {{ props.resource._source.resourceinstanceid }}</li>
      <li>Graph Id: {{ props.resource._source.graph_id }}</li>
      <li>Is Provisional Resource?: {{ props.resource._source.provisional_resource }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from '../../types';

const props = defineProps<{
  resource: Resource;
}>();
</script>

<style scoped>
.resource-list-item {
  padding: 20px;
  margin: 20px;
  background-color: #c8c8c8cd;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
