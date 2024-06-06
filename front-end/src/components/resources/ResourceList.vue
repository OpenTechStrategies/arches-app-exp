<script setup lang="ts">
import type { Ref } from 'vue';
import type { ResourceArray } from '../../types';
import ResourceListItem from './ResourceListItem.vue';
import ResourceListButton from './ResourceListButton.vue';

const props = defineProps<{
  pageValues: {
    has_next: Ref<boolean>;
    has_previous: Ref<boolean>;
  };
  resources: ResourceArray;
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
  <div class="resource-list">
    <ResourceListItem
      v-for="resource in props.resources.items"
      :resource="resource"
      :key="resource._id"
    />
    <div>
      <ResourceListButton
        type="previous"
        @previous="getPreviousPage"
        :flag="props.pageValues.has_previous"
      />
      <ResourceListButton type="next" @next="getNextPage" :flag="props.pageValues.has_next" />
    </div>
  </div>
</template>

<style scoped>

</style>
