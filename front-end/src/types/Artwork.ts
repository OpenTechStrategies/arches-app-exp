import type { JSONSchemaType } from 'ajv';
import { ajv } from '@/ajv';

export interface Artwork {
  Artist: string;
  Photograph: {
    Image: string;
    Photographer: string;
  };
  Location: {
    Coordinates?: string;
    'Located On': string;
  };
  Medium: string;
  Description?: string;
  Title: string;
}

export interface MapArtwork extends Artwork {
  '@resource_id': string;
}

const ArtworkSchema: JSONSchemaType<Artwork> = {
  type: 'object',
  properties: {
    Artist: { type: 'string' },
    Description: { type: 'string', nullable: true },
    Photograph: {
      type: 'object',
      properties: {
        Image: { type: 'string' },
        Photographer: { type: 'string' }
      },
      required: ['Image', 'Photographer']
    },
    Location: {
      type: 'object',
      properties: {
        Coordinates: { type: 'string', nullable: true },
        'Located On': { type: 'string' }
      },
      required: ['Located On']
    },
    Medium: {
      type: 'string'
    },
    Title: { type: 'string' }
  },
  required: ['Artist', 'Title', 'Location'],
  additionalProperties: true
};

export const validateArtworkSchema = ajv.compile(ArtworkSchema);
