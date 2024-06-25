<template>
  <button class="list-button" :class="{ disabled: !hasNext }" :disabled="!hasNext" @click="getPage">
    <div v-if="props.type === 'next'">
      <ArrowDownIcon class="icon" />
      <p>next page</p>
    </div>
    <div v-else>
      <ArrowUpIcon class="icon" />
      <p>previous page</p>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ArrowUpIcon } from '@heroicons/vue/24/solid';
import { ArrowDownIcon } from '@heroicons/vue/24/solid';
import type { Ref } from 'vue';
import { ref } from 'vue';
const props = defineProps<{
  type: string;
  flag: Ref<boolean>;
}>();
const hasNext = ref(props.flag);
const emit = defineEmits(['next', 'previous']);
const getPage = () => {
  if (props.type === 'next') {
    emit('next');
  } else {
    emit('previous');
  }
};
</script>

<style scoped>
.icon {
  width: 24px;
}
</style>
