import type { JSONSchemaType } from 'ajv';
import ajv from '@/ajv';

export interface Artist {
  Name: string;
  remoteServerId?: string;
}

const ArtistSchema: JSONSchemaType<Artist> = {
  type: 'object',
  properties: {
    Name: { type: 'string' },
    remoteServerId: { type: 'string', nullable: true }
  },
  required: ['Name'],
  additionalProperties: true
};

export const validateArtistSchema = ajv.compile(ArtistSchema);
