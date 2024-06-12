import type { JSONSchemaType } from 'ajv';
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

interface ResourcePermissions {
  users_with_no_access: string[];
  users_without_delete_perm: string[];
  users_without_edit_perm: string[];
  users_without_read_perm: string[];
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
    permissions: ResourcePermissions;
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

const MapPopupSchema: JSONSchemaType<MapPopup> = {
  type: 'object',
  properties: {
    language: { type: 'string' },
    value: { type: 'string' }
  },
  required: ['language', 'value']
};

export type { ResourcePermissions, Point, Geometry, MapPopup, SearchResult, SearchResultArray };

export { MapPopupSchema };
