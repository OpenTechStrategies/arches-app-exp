import { validateCoordinatesSchema } from './types';
import type { Coordinates } from './types';

export function coordinatesStringToObject(coordinates: string): Coordinates | undefined {
  const validJsonString = coordinates.replace(/'/g, '"');
  try {
    const parsedCoordinates = JSON.parse(validJsonString);

    if (validateCoordinatesSchema(parsedCoordinates)) {
      return parsedCoordinates;
    } else {
      return undefined;
    }
  } catch (error) {
    throw new Error(`Failed to parse Coordinates JSON string:`);
  }
}
