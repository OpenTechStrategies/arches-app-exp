import type { CoordinatesTileData } from './CoordinatesTileData';
import type { ImageTileData } from './ImageTileData';
import type { Tile } from './Tile';
import type { Resource } from './Resource';
import type { ResourceXResource } from './ResourceXResource';

export interface Prefetch {
  idReferences: {
    coordinatesNodeId: string;
    imageNodeId: string;
    graphIdToNameTable: Record<string, string>;
    nameToGraphIdTable: Record<string, string>;
  };
  images: Array<Tile<ImageTileData[]>>;
  locations: Array<Tile<CoordinatesTileData>>;
  resourceRelations: Array<ResourceXResource>;
  resources: Array<Resource>;
}
