<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 28 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.93495 25.2728H23.1169C24.5514 25.2728 25.7143 24.1099 25.7143 22.6754V4.49342C25.7143 3.0589 24.5514 1.896 23.1169 1.896H4.93495C3.50043 1.896 2.33752 3.0589 2.33752 4.49342V22.6754C2.33752 24.1099 3.50043 25.2728 4.93495 25.2728ZM4.93495 25.2728L19.2208 10.987L25.7143 17.4805M11.4285 9.0389C11.4285 10.1148 10.5563 10.987 9.48043 10.987C8.40454 10.987 7.53237 10.1148 7.53237 9.0389C7.53237 7.96302 8.40454 7.09084 9.48043 7.09084C10.5563 7.09084 11.4285 7.96302 11.4285 9.0389Z"
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
    width: 28,
    height: 27
  }
);
</script>

<style scoped></style>
