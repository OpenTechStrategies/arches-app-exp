import type { Point, MapPopup, Geometry, ResourcePermissions } from './SearchResult';

interface RelationIds {
  id: string;
  nodegroup_id: string;
  provisional: boolean;
}

interface RelationDomain {
  conceptid: string;
  label: string;
  nodegroup_id: string;
  provisional: boolean;
  valueid: string;
}

interface ResourceRelation {
  date_ranges: string[];
  dates: string[];
  displaydescription: string;
  displayname: string;
  domains: RelationDomain[];
  geometries: Geometry[];
  graph_id: string;
  ids: RelationIds[];
  legacyid: null;
  map_popup: MapPopup[];
  numbers: any[];
  permissions: ResourcePermissions;
  points: Point[];
  provisional_resource: string;
  resourceinstanceid: string;
  root_ontology_class: string;
  strings?: any;
  tiles?: any;
  total_relations: number;
}

interface ResourceRelationArray {
  items: ResourceRelation[];
}

export type { ResourceRelation, ResourceRelationArray };
