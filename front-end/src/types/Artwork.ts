interface ArtworkResource {
  Artist: string;
  Identifiers: {
    ID: string;
    'ID Type': string;
  };
  Image: {
    '@value': string;
    Photographer: string;
  };
  Location: {
    Address: string;
    Coordinates: string;
    'Location Description': string;
    Structure: string;
  };
  Title: string;
}

export interface Artwork {
  displaydescription: string;
  displayname: string;
  graph_id: string;
  legacyid?: any;
  map_popup: string;
  resource: ArtworkResource;
  resourceinstanceid: string;
}
