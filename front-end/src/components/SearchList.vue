<script setup lang="ts">
import type { Ref } from 'vue';
import type { SearchResultArray } from '../types';
import SearchListItem from './SearchListItem.vue';
import SearchListButton from './SearchListButton.vue';

const props = defineProps<{
  pageValues: {
    has_next: Ref<boolean>;
    has_previous: Ref<boolean>;
  };
  searchResults: SearchResultArray;
}>();

const emit = defineEmits(['next-page', 'previous-page']);

const getNextPage = () => {
  emit('next-page');
};
const getPreviousPage = () => {
  emit('previous-page');
};
</script>

<template>
  <div class="search-list">
    <SearchListItem
      v-for="result in props.searchResults.items"
      :result="result"
      :key="result._id"
    />
    <div>
      <SearchListButton
        type="previous"
        @previous="getPreviousPage"
        :flag="props.pageValues.has_previous"
      />
      <SearchListButton type="next" @next="getNextPage" :flag="props.pageValues.has_next" />
    </div>
  </div>
</template>

<style scoped></style>
