import type { Resource } from './Resource';
import type { CoordinatesTileData } from './CoordinatesTileData';

export interface MapResource {
  resource: Resource;
  coordinates?: CoordinatesTileData;
}
