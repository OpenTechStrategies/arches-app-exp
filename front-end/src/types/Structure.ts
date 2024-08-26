import type { JSONSchemaType } from 'ajv';
import { ajv } from '@/ajv';

export interface Structure {
  Location: {
    Address: string;
    Coordinates?: string;
  };
}

const StructureSchema: JSONSchemaType<Structure> = {
  type: 'object',
  properties: {
    Location: {
      type: 'object',
      properties: {
        Address: { type: 'string' },
        Coordinates: { type: 'string', nullable: true }
      },
      required: ['Address']
    }
  },
  required: ['Location'],
  additionalProperties: true
};

export const validateStructureSchema = ajv.compile(StructureSchema);
