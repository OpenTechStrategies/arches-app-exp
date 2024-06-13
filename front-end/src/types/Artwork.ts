import type { JSONSchemaType } from 'ajv';
import { ajv } from '@/ajv';

export interface Artwork {
  Artist: string;
  Identifiers: {
    ID: string;
    'ID Type': string;
  };
  Image: {
    '@value': string;
    Photographer: string;
  };
  Location: {
    Address: string;
    Coordinates: string;
    'Location Description': string;
    Structure: string;
  };
  Description?: string;
  Title: string;
}

const ArtworkSchema: JSONSchemaType<Artwork> = {
  type: 'object',
  properties: {
    Artist: { type: 'string' },
    Description: { type: 'string', nullable: true },
    Identifiers: {
      type: 'object',
      properties: {
        ID: { type: 'string' },
        'ID Type': { type: 'string' }
      },
      required: ['ID', 'ID Type']
    },
    Image: {
      type: 'object',
      properties: {
        '@value': { type: 'string' },
        Photographer: { type: 'string' }
      },
      required: ['@value', 'Photographer']
    },
    Location: {
      type: 'object',
      properties: {
        Address: { type: 'string' },
        Coordinates: { type: 'string' },
        'Location Description': { type: 'string' },
        Structure: { type: 'string' }
      },
      required: ['Address', 'Coordinates', 'Location Description', 'Structure']
    },
    Title: { type: 'string' }
  },
  required: ['Artist', 'Identifiers', 'Location', 'Title'],
  additionalProperties: true
};

export const validateArtworkSchema = ajv.compile(ArtworkSchema);
