<template>
    <div>
      <h1>Pome</h1>
      <DataDisplay />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import DataDisplay from '../components/DataDisplay.vue'
  
  export default defineComponent({
    name: 'Home',
    components: {
      DataDisplay
    }
  })
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  