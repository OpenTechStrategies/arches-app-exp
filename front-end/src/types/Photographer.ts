import type { JSONSchemaType } from 'ajv';
import ajv from '@/ajv';

export interface Photographer {
  Name: string;
}

const PhotographerSchema: JSONSchemaType<Photographer> = {
  type: 'object',
  properties: {
    Name: { type: 'string' }
  },
  required: ['Name'],
  additionalProperties: true
};

export const validatePhotographerSchema = ajv.compile(PhotographerSchema);
