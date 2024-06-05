export interface Resource {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    displaydescription: string;
    displayname: string;
    displayname_language: string;
    geometries: Array<string>;
    graph_id: string;
    map_popup: Array<string>;
    permissions: {
      users_with_no_access: Array<string>;
      users_without_delete_perm: Array<string>;
      users_without_edit_perm: Array<string>;
      users_without_read_perm: Array<string>;
    };
    points: Array<string>;
    provisional_resource: string;
    resourceinstanceid: string;
    root_ontology_class: string;
  };
}

export interface ResourceArray {
  items: Array<Resource>;
}
