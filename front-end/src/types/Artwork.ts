import type { JSONSchemaType } from 'ajv';
import { ajv } from '@/ajv';

interface ArtworkResource {
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
  Title: string;
}

export interface Artwork {
  displaydescription: string;
  displayname: string;
  graph_id: string;
  map_popup: string;
  resource: ArtworkResource;
  resourceinstanceid: string;
}

const ArtworkResourceSchema: JSONSchemaType<ArtworkResource> = {
  type: 'object',
  properties: {
    Artist: { type: 'string' },
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
  required: ['Artist', 'Identifiers', 'Image', 'Location', 'Title'],
  additionalProperties: true
};

const ArtworkSchema: JSONSchemaType<Artwork> = {
  type: 'object',
  properties: {
    displaydescription: { type: 'string' },
    displayname: { type: 'string' },
    graph_id: { type: 'string' },
    map_popup: { type: 'string' },
    resource: ArtworkResourceSchema,
    resourceinstanceid: { type: 'string' }
  },
  required: [
    'displaydescription',
    'displayname',
    'graph_id',
    'map_popup',
    'resource',
    'resourceinstanceid'
  ],
  additionalProperties: true
};

export const validateArtworkSchema = ajv.compile(ArtworkSchema);
