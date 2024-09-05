import {
  type Prefetch,
  type Tile,
  type ImageTileData,
  type Resource,
  type ResourceRelation,
  type ApiResource,
  PANEL_RESOURCE_TYPE
} from './types';

const getImageTileDataForResource = (
  resource: Resource | ApiResource,
  imagesPrefetch: Array<Tile<ImageTileData[]>>,
  resourceRelationsPrefetch: Array<ResourceRelation>,
  idReferences: Prefetch['idReferences']
) => {
  let imageTile = undefined;
  if (idReferences.graphIdToNameTable[resource.graph_id] === 'Artwork') {
    imageTile = imagesPrefetch.find(
      (image) => image.resourceinstance_id === resource.resourceinstanceid
    );
    return imageTile?.data[idReferences.imageNodeId] ?? undefined;
  }
  const relation = resourceRelationsPrefetch.find(
    (relation) =>
      relation.resourceinstanceidto_id === resource.resourceinstanceid &&
      relation.resourceinstancefrom_graphid_id === idReferences.nameToGraphIdTable['Artwork']
  );

  if (!relation) {
    return undefined;
  }
  imageTile = imagesPrefetch.find(
    (imageTile) => imageTile.resourceinstance_id === relation.resourceinstanceidfrom_id
  );
  return imageTile?.data[idReferences.imageNodeId] ?? undefined;
};

const castToPanelResourceType = (panelResourceType: string | undefined) => {
  switch (panelResourceType) {
    case PANEL_RESOURCE_TYPE.ARTIST:
      return PANEL_RESOURCE_TYPE.ARTIST;
    case PANEL_RESOURCE_TYPE.ARTWORK:
      return PANEL_RESOURCE_TYPE.ARTWORK;
    case PANEL_RESOURCE_TYPE.PHOTOGRAPHER:
      return PANEL_RESOURCE_TYPE.PHOTOGRAPHER;
    case PANEL_RESOURCE_TYPE.STRUCTURE:
      return PANEL_RESOURCE_TYPE.STRUCTURE;
    default:
      return undefined;
  }
};

export { getImageTileDataForResource, castToPanelResourceType };
