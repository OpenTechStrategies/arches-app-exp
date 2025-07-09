<template>
  <div v-if="validateRemoteServerResponseSchema(remoteServerResponse)" class="artist-note">
    <p>
      {{ remoteServerResponse.note }}
      <a :href="remoteServerResponse.url" target="_blank" rel="noopener noreferrer">{{
        remoteServerResponse.url
      }}</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Artist, RemoteServerResponse } from '@/types';
import { ref, onMounted } from 'vue';
import { validateRemoteServerResponseSchema } from '@/types';

const props = defineProps<{
  artist: Artist;
}>();

const remoteServerResponse = ref<RemoteServerResponse | undefined>();

async function fetchRemoteServerResponse() {
  const url = new URL(
    `${import.meta.env.VITE_REMOTE_SERVER_URL}/artist/${props.artist.remoteServerId}`
  );
  const response = await fetch(url.toString()).then((res) => res.json());
  remoteServerResponse.value = response;
}

onMounted(async () => {
  await fetchRemoteServerResponse();
});
</script>
<style scoped>
.artist-note {
  color: var(--wac--color--gray);
  padding-top: var(--wac--accessible-spacing--1x);
  padding-bottom: var(--wac--accessible-spacing--1x);
}
</style>
