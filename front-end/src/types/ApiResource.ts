import type { Artist } from './Artist';
import type { Artwork } from './Artwork';
import type { Photographer } from './Photographer';
import type { Structure } from './Structure';

export interface ApiResource {
  displaydescription: string;
  displayname: string;
  graph_id: string;
  legacyid: string;
  map_popup: string;
  resource: Artist | Artwork | Photographer | Structure;
  resourceinstanceid: string;
}
