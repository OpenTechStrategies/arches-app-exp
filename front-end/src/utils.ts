import { validateCoordinatesSchema } from './types';
import type { Coordinates } from './types';

export function coordinatesStringToObject(coordinates: string): Coordinates {
  const validJsonString = coordinates.replace(/'/g, '"');
  try {
    coordinates = JSON.parse(validJsonString);
    if (validateCoordinatesSchema(coordinates)) {
      return coordinates;
    } else {
      throw new Error('Coordinates JSON string invalid');
    }
  } catch (error) {
    throw new Error('Failed to parse Coordinates JSON string');
  }
}
