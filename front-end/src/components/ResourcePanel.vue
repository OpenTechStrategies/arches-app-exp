<template>
  <div id="resource-panel">
    <div v-if="props.resource !== undefined">
      <ArtworkDetail
        v-if="validateArtworkSchema(props.resource?.resource)"
        :artwork="props.resource.resource"
      />
      <ArtistDetail
        v-else-if="validateArtistSchema(props.resource?.resource)"
        :artist="props.resource.resource"
      />
      <StructureDetail
        v-else-if="validateStructureSchema(props.resource?.resource)"
        :structure="props.resource.resource"
      />
      <ResourceRelationList
        v-if="resourceRelations"
        :resource-relations="resourceRelations"
        :graph-table="props.graphTable"
      />
      <button @click="showMetaData = !showMetaData">
        {{ showMetaData ? 'Hide Arches Metadata' : 'Show Arches Metadata' }}
      </button>
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

<script setup lang="ts">
import { ref } from 'vue';
import { validateArtistSchema, validateArtworkSchema, validateStructureSchema } from '@/types';
import ArtworkDetail from './ArtworkDetail.vue';
import ArtistDetail from './ArtistDetail.vue';
import ResourceRelationList from './ResourceRelationList.vue';
import type { Resource, ResourceRelation } from '@/types';
import StructureDetail from './StructureDetail.vue';

const props = defineProps<{
  resource: Resource | undefined;
  resourceRelations: Array<ResourceRelation> | undefined;
  graphTable: Map<string, string>;
}>();

const showMetaData = ref<boolean>(false);
</script>

<style scoped>
#resource-panel {
  padding: 20px;
  margin: 20px;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 10px;
}

@media (max-width: 768px) {
  #resource-panel {
    padding: 15px;
    margin: 10px;
  }
}
</style>
