<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 25 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.7166 25.2728V22.6754C22.7166 21.2976 22.1693 19.9763 21.1951 19.0021C20.2209 18.0278 18.8995 17.4805 17.5218 17.4805H7.1321C5.75434 17.4805 4.43301 18.0278 3.45879 19.0021C2.48457 19.9763 1.93726 21.2976 1.93726 22.6754V25.2728M17.5218 7.09084C17.5218 9.95987 15.196 12.2857 12.3269 12.2857C9.45791 12.2857 7.1321 9.95987 7.1321 7.09084C7.1321 4.22181 9.45791 1.896 12.3269 1.896C15.196 1.896 17.5218 4.22181 17.5218 7.09084Z"
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
    width: 25,
    height: 27
  }
);
</script>

<style scoped></style>
