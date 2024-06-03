<template>
    <div>
      <h2>Data from API</h2>
      <div v-if="data">
        <div class="grid-container">
          <div v-for="hit in data.hits.hits" :key="hit._id" class="grid-item">
            <h3>{{ hit._source.displayname }}</h3>
            <p>{{ hit._source.displaydescription }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  
  export default defineComponent({
    name: 'DataDisplay',
    setup() {
      const data = ref<any>(null)
  
      onMounted(async () => {
        try {
          const response = await fetch('http://localhost:8002/search/resources?paging-filter=2&tiles=true&format=tilecsv&reportlink=false&precision=6&total=90')
          const result = await response.json()
          data.value = result.results
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      })
  
      return {
        data
      }
    }
  })
  </script>
  
  <style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    font-family: 'Arial, sans-serif';
    margin: 20px;
  }
  
  .grid-item {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .grid-item h3 {
    margin-top: 0;
    font-size: 1.2em;
  }
  
  .grid-item p {
    font-size: 1em;
    color: #555;
  }
  </style>
  