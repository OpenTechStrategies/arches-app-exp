import {
  type Prefetch,
  type Tile,
  type ImageTileData,
  type Resource,
  type ApiResource,
  PanelResourceEnum,
  type ApiResourceRelation,
  type ResourceXResource
} from './types';

const getImageTileDataForResource = (
  resource: Resource | ApiResource,
  imagesPrefetch: Array<Tile<ImageTileData[]>>,
  resourceRelationsPrefetch: Array<ResourceXResource>,
  idReferences: Prefetch['idReferences']
) => {
  if (idReferences.graphIdToNameTable[resource.graph_id] === 'Artwork') {
    const imageTile = imagesPrefetch.find(
      (image) => image.resourceinstance_id === resource.resourceinstanceid
    );
    return imageTile?.data[idReferences.imageNodeId] ?? undefined;
  }
  const relation = resourceRelationsPrefetch.find(
    (resourceRelation) =>
      resourceRelation.resourceinstanceidto_id === resource.resourceinstanceid &&
      resourceRelation.resourceinstancefrom_graphid_id === idReferences.nameToGraphIdTable.Artwork
  );

  if (!relation) {
    return undefined;
  }
  const imageTile = imagesPrefetch.find(
    (prefetchedTile) => prefetchedTile.resourceinstance_id === relation.resourceinstanceidfrom_id
  );
  return imageTile?.data[idReferences.imageNodeId] ?? undefined;
};

const castToPanelResourceType = (panelResourceType: string | undefined) => {
  switch (panelResourceType) {
    case PanelResourceEnum.ARTIST:
      return PanelResourceEnum.ARTIST;
    case PanelResourceEnum.ARTWORK:
      return PanelResourceEnum.ARTWORK;
    case PanelResourceEnum.PHOTOGRAPHER:
      return PanelResourceEnum.PHOTOGRAPHER;
    case PanelResourceEnum.STRUCTURE:
      return PanelResourceEnum.STRUCTURE;
    default:
      return undefined;
  }
};

const getMoreArtworksByArtist = (
  artist: ApiResourceRelation,
  resourcePrefetch: Array<Resource>,
  resourceRelationsPrefetch: Array<ResourceXResource>,
  idReferences: Prefetch['idReferences']
) => {
  if (idReferences.graphIdToNameTable[artist.graph_id] !== 'Artist') {
    return undefined;
  }
  const artworkRelations = resourceRelationsPrefetch.filter(
    (relation) =>
      relation.resourceinstanceidto_id === artist.resourceinstanceid &&
      relation.resourceinstancefrom_graphid_id === idReferences.nameToGraphIdTable.Artwork
  );
  if (!artworkRelations) {
    return undefined;
  }
  const relatedArtworkIds = artworkRelations.map((relation) => relation.resourceinstanceidfrom_id);

  const relatedArtworks = resourcePrefetch.filter((res) =>
    relatedArtworkIds.includes(res.resourceinstanceid)
  );
  return relatedArtworks ?? undefined;
};

const getArtistForArtwork = (
  resource: Resource | ApiResource,
  resourcesPrefetch: Array<Resource> | undefined,
  resourceRelationsPrefetch: Array<ResourceXResource>,
  idReferences: Prefetch['idReferences']
) => {
  const relation = resourceRelationsPrefetch.find(
    (resourceRelation) =>
      resourceRelation.resourceinstanceidfrom_id === resource.resourceinstanceid &&
      resourceRelation.resourceinstanceto_graphid_id === idReferences.nameToGraphIdTable.Artist
  );

  if (!relation) {
    return undefined;
  }
  const artist = resourcesPrefetch?.find(
    (artistPrefetch) => artistPrefetch.resourceinstanceid === relation.resourceinstanceidto_id
  );

  return artist;
};

export {
  getImageTileDataForResource,
  castToPanelResourceType,
  getMoreArtworksByArtist,
  getArtistForArtwork
};
