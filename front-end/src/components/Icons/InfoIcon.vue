<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9283 19.7796V14.5848M14.9283 9.38992H14.9413M27.9154 14.5848C27.9154 21.7573 22.1008 27.5719 14.9283 27.5719C7.75569 27.5719 1.94116 21.7573 1.94116 14.5848C1.94116 7.41218 7.75569 1.59766 14.9283 1.59766C22.1008 1.59766 27.9154 7.41218 27.9154 14.5848Z"
      stroke="#1E1E1E"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    width?: string | number;
    height?: string | number;
  }>(),
  {
    width: 30,
    height: 30
  }
);
</script>

<style scoped></style>
