<template>
  <div class="search-list-item">
    <h1>{{ `${props.result._source.displayname}` }}</h1>
    <h2>Description: {{ props.result._source.displaydescription }}</h2>
    <button @click="setResource" class="details-button">details</button>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '../types';

const props = defineProps<{
  result: SearchResult;
}>();
const emit = defineEmits(['set-resource']);

const setResource = () => {
  emit('set-resource', props.result._id);
};
</script>

<style scoped>
.search-list-item {
  padding: 10px;
  margin: 10px;
  background-color: #e0e0e0;
  box-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
  width: 80%;
  height: auto;

  h1 {
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }

  h2 {
    font-size: 1em;
    margin-bottom: 0.5em;
  }

  ul {
    padding-left: 20px;
    list-style-type: none;

    li {
      font-size: 0.9em;
      margin-bottom: 0.3em;
    }
  }

  a {
    font-size: 0.9em;
    color: #007bff;
    text-decoration: none;
  }
}
</style>
