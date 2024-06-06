import type { MapPopup } from './SearchResult';

export interface Artist {
  displaydescription: string;
  displayname: string;
  graph_id: string;
  legacyid?: null;
  map_popup: MapPopup[] | string;
  resource: {
    Name: string;
  };
  resourceinstanceid: string;
}
