import type { JSONSchemaType } from 'ajv';
import { ajv } from '@/ajv';

interface CoordinatesTileData {
  type: string;
  features: Feature[];
}

interface Feature {
  id: string;
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  nodeId: string;
}

const CoordinatesTileDataSchema: JSONSchemaType<CoordinatesTileData> = {
  type: 'object',
  properties: {
    type: { type: 'string' },
    features: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          type: { type: 'string' },
          geometry: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              coordinates: {
                type: 'array',
                items: { type: 'number' }
              }
            },
            required: ['type', 'coordinates']
          },
          properties: {
            type: 'object',
            properties: {
              nodeId: { type: 'string' }
            },
            required: ['nodeId']
          }
        },
        required: ['id', 'type', 'properties']
      }
    }
  },
  nullable: true,
  required: ['type', 'features']
};
export type { CoordinatesTileData };
export const validateCoordinatesTileData = ajv.compile(CoordinatesTileDataSchema);
