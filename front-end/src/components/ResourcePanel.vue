<script setup lang="ts">
import { ref } from 'vue';
import { validateArtistSchema, validateArtworkSchema } from '@/types';
import ArtworkDetail from './ArtworkDetail.vue';
import ArtistDetail from './ArtistDetail.vue';
import ResourceRelationList from './ResourceRelationList.vue';
import type { Resource, ResourceRelation } from '@/types';

const props = defineProps<{
  resource: Resource | undefined;
  resourceRelations: Array<ResourceRelation> | undefined;
}>();

const showMetaData = ref<boolean>(false);
</script>

<template>
  <div id="resource-panel">
    <div v-if="props.resource !== undefined">
      <ArtworkDetail
        :artwork="props.resource.resource"
        v-if="validateArtworkSchema(props.resource?.resource)"
      />
      <ArtistDetail
        :artist="props.resource.resource"
        v-else-if="validateArtistSchema(props.resource?.resource)"
      />
      <ResourceRelationList :resourceRelations="resourceRelations" v-if="resourceRelations" />
      <button @click="showMetaData = !showMetaData">Show Arches Metadata</button>
      <div v-if="showMetaData">
        <ul>
          <li>Graph Id: {{ props.resource.graph_id }}</li>
          <li>Resource Instance Id: {{ props.resource.resourceinstanceid }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Click on a resource on the map or search list to display details</p>
    </div>
  </div>
</template>

<style scoped>
#resource-panel {
  margin: 100px;
  background-color: #c8c8c8cd;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 80%;
}
</style>
