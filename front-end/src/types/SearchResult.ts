/*
 * Modeled off the results of a GET request to the
 * /search/resources endpoint!
 */

interface Feature {
  feature_info_content: string;
  geometry: {
    coordinates: number[];
    type: string;
  };
  id: string;
  properties: {
    nodeId: string;
  };
  type: string;
}

interface Geometry {
  geom: {
    features: Feature[];
  };
  type: string;
}

interface MapPopup {
  language: string;
  value: string;
}

interface Point {
  nodegroup_id: string;
  point: {
    lat: number;
    lon: number;
  };
  provisional: boolean;
}

interface SearchResult {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    displaydescription: string;
    displayname: string;
    displayname_language: string;
    geometries: Geometry[];
    graph_id: string;
    map_popup: MapPopup[] | string;
    permissions: Permissions;
    points: Point[];
    provisional_resource: string;
    resourceinstanceid: string;
    root_ontology_class: string;
    tiles?: any;
  };
}

interface SearchResultArray {
  items: SearchResult[];
}
export type { MapPopup, SearchResult, SearchResultArray };
