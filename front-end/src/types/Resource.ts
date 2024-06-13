import type { Artist } from './Artist';
import type { Artwork } from './Artwork';

export interface Resource {
  displaydescription: string;
  displayname: string;
  graph_id: string;
  map_popup: string;
  resource: Artist | Artwork;
  resourceinstanceid: string;
}
