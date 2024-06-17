import type { JSONSchemaType } from 'ajv';
import { ajv } from '@/ajv';

interface Coordinates {
  type: string;
  features: Feature[];
}

interface Feature {
  id: string;
  type: string;
  geometry: Geometry;
  properties: Properties;
  feature_info_content: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  nodeId: string;
}
const CoordinatesSchema: JSONSchemaType<Coordinates> = {
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
          },
          feature_info_content: { type: 'string' }
        },
        required: ['id', 'type', 'geometry', 'properties', 'feature_info_content']
      }
    }
  },
  nullable: true,
  required: ['type', 'features']
};
export type { Coordinates };
export const validateCoordinatesSchema = ajv.compile(CoordinatesSchema);
