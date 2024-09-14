import type { JSONSchemaType } from 'ajv';
import ajv from '@/ajv';

export interface Artwork {
  Artist?: string;
  Photograph?: {
    Image: string;
    Photographer: string;
  };
  Location?: {
    Coordinates?: string;
    'Located On': string;
  };
  Medium?: string;
  Description?: string;
  Title?: string;
}

const ArtworkSchema: JSONSchemaType<Artwork> = {
  type: 'object',
  properties: {
    Artist: { type: 'string', nullable: true },
    Description: { type: 'string', nullable: true },
    Photograph: {
      type: 'object',
      properties: {
        Image: { type: 'string' },
        Photographer: { type: 'string' }
      },
      required: ['Image', 'Photographer'],
      nullable: true
    },
    Location: {
      type: 'object',
      properties: {
        Coordinates: { type: 'string', nullable: true },
        'Located On': { type: 'string' }
      },
      required: ['Located On'],
      nullable: true
    },
    Medium: {
      type: 'string',
      nullable: true
    },
    Title: { type: 'string', nullable: true }
  },
  additionalProperties: true
};

export const validateArtworkSchema = ajv.compile(ArtworkSchema);
