import type { JSONSchemaType } from 'ajv';
import { ajv } from '@/ajv';
import { MapPopupSchema, type MapPopup } from './SearchResult';

export interface Artist {
  displaydescription: string;
  displayname: string;
  graph_id: string;
  map_popup: MapPopup[] | string;
  resource: {
    Name: string;
  };
  resourceinstanceid: string;
}
const ArtistSchema: JSONSchemaType<Artist> = {
  type: 'object',
  properties: {
    displaydescription: { type: 'string' },
    displayname: { type: 'string' },
    graph_id: { type: 'string' },
    map_popup: {
      oneOf: [{ type: 'array', items: MapPopupSchema }, { type: 'string' }]
    },
    resource: {
      type: 'object',
      properties: {
        Name: { type: 'string' }
      },
      required: ['Name'],
      additionalProperties: true
    },
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

export const validateArtistSchema = ajv.compile(ArtistSchema);
