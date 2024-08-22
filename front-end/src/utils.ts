import type { Coordinates } from './types';

export function coordinatesStringToObject(coordinates: string): Coordinates | undefined {
  const validJsonString = coordinates.replace(/'/g, '"');
  try {
    const parsedCoordinates = JSON.parse(validJsonString) as unknown as Coordinates;

    return parsedCoordinates;
  } catch (error) {
    throw new Error(`Failed to parse Coordinates JSON string:`);
  }
}
