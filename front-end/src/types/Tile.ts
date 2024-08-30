export interface Tile<T> {
  data: {
    [key: string]: T | null;
  };
  nodegroup_id: string;
  parenttile_id?: string;
  resourceinstance_id: string;
  sortorder: number;
  tileid: string;
}
