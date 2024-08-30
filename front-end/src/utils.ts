import type { Prefetch, Tile, ImageTileData, Resource, ResourceRelation } from './types';

const getImageTileDataForResource = (
  resource: Resource,
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

export { getImageTileDataForResource };
