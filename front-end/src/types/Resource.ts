export interface Resource {
  descriptors: {
    en: {
      description: string;
      map_popup: string;
      name: string;
    };
  };
  displayname: string;
  graph_id: string;
  graph_publication_id: string;
  legacyid: string;
  name: string;
  resourceinstanceid: string;
}

export enum PanelResourceEnum {
  ARTWORK = 'Artwork',
  ARTIST = 'Artist',
  STRUCTURE = 'Structure',
  PHOTOGRAPHER = 'Photographer'
}
