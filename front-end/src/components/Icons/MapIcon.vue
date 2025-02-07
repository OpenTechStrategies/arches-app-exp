<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 27 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.3159 12.9872C25.3159 22.0782 13.6275 29.8705 13.6275 29.8705C13.6275 29.8705 1.93909 22.0782 1.93909 12.9872C1.93909 9.88727 3.17054 6.91428 5.36254 4.72228C7.55454 2.53028 10.5275 1.29883 13.6275 1.29883C16.7274 1.29883 19.7004 2.53028 21.8924 4.72228C24.0844 6.91428 25.3159 9.88727 25.3159 12.9872Z"
      stroke="#1E1E1E"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.6275 16.8833C15.7793 16.8833 17.5236 15.139 17.5236 12.9872C17.5236 10.8354 15.7793 9.09109 13.6275 9.09109C11.4757 9.09109 9.73135 10.8354 9.73135 12.9872C9.73135 15.139 11.4757 16.8833 13.6275 16.8833Z"
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
    width: 27,
    height: 32
  }
);
</script>

<style scoped></style>
