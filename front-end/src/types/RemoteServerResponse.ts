import type { JSONSchemaType } from 'ajv';
import ajv from '@/ajv';

interface RemoteServerResponse {
  arches_resource_id: string;
  arches_tileid: string;
  id: string;
  name: string;
  note: string;
  url: string;
}

const RemoteServerResponseSchema: JSONSchemaType<RemoteServerResponse> = {
  type: 'object',
  properties: {
    arches_resource_id: { type: 'string' },
    arches_tileid: { type: 'string' },
    id: { type: 'string' },
    name: { type: 'string' },
    note: { type: 'string' },
    url: { type: 'string' }
  },
  required: ['arches_resource_id', 'arches_tileid', 'id', 'name', 'note', 'url'],
  additionalProperties: true
};

const validateRemoteServerResponseSchema = ajv.compile(RemoteServerResponseSchema);

export { type RemoteServerResponse, validateRemoteServerResponseSchema };
