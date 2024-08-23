import json
from uuid import UUID
from django.shortcuts import render
from arches.app.models import models
from arches.app.models.resource import Resource
from arches.app.utils.response import JSONResponse
from arches.app.utils.betterJSONSerializer import JSONSerializer


# This is a prefetch done to the GraphModel to allow for ease of lookup
# for a given Resource model
graphs_prefetch = models.GraphModel.objects.all()
name_to_graph_table = {str(gr_obj.name): gr_obj for gr_obj in graphs_prefetch}

# This is a hardcoded id for the photograph node group id
photograph_node_group_id = UUID("5f85f884-34a5-11ef-9840-525400ef2e2d")

# This is a hardcoded id for the image node id
image_node_id = "73924468-34a5-11ef-bb6e-525400ef2e2d"


def index(request):
    with open(
        "/opt/arches/.venv/lib/python3.11/site-packages/archesdataviewer/static/vite_build/.vite/manifest.json",
        "r",
    ) as manifest:
        json_data = json.load(manifest)

    # Extract relevant data from the JSON
    js_file = "archesdataviewer/vite_build/" + json_data["index.html"]["file"]
    css_file = "archesdataviewer/vite_build/" + json_data["index.html"]["css"][0]

    context = {
        "js_file": js_file,
        "css_file": css_file,
    }

    return render(request, "index.html", context)


# This is a custom route for returning a list of all Artwork Resources in a single request
def artworksmap(request):
    # Gather all artwork resources and geojson objects
    artwork_resources = Resource.to_json__bulk(
        Resource.objects.filter(graph=name_to_graph_table["Artwork"])
    )

    return JSONResponse(artwork_resources)


# Custom Route for returning all graph id's and names, used by the front-end
# component to distinguish resource types dynamically.
def graphs(request):
    return JSONResponse(
        JSONSerializer().serializeToPython(models.GraphModel.objects.all())
    )


# Custom Route for fetching an image tile, related either to an Artwork directly, or an Artist, Structure or Photographer by relation of Artwork
def getImage(request, resource_id):
    resource = models.ResourceInstance.objects.get(resourceinstanceid=resource_id)
    tiles = []
    if resource.graph_id == name_to_graph_table["Artist"].graphid:
        # Fetch a list of ids of all resources that are related to the artist
        relations = models.ResourceXResource.objects.filter(
            resourceinstanceidto_id=UUID(resource_id),
            resourceinstancefrom_graphid_id=name_to_graph_table["Artwork"].graphid,
        ).values_list("resourceinstanceidfrom_id", flat=True)
        # Extract all tiles in the 'Photographer' NodeGroup that have a resourceId in the related artworks
        tiles = models.TileModel.objects.filter(
            nodegroup_id=photograph_node_group_id, resourceinstance_id__in=relations
        )
        return JSONResponse(tiles[0].data[image_node_id][0])
    elif resource.graph_id == name_to_graph_table["Artwork"].graphid:
        # An artwork should implicitly only have one image directly related to it
        tiles = models.TileModel.objects.filter(
            nodegroup_id=photograph_node_group_id, resourceinstance_id=UUID(resource_id)
        )
        return JSONResponse(tiles[0].data[image_node_id][0])
    elif resource.graph_id == name_to_graph_table["Structure"].graphid:
        relations = models.ResourceXResource.objects.filter(
            resourceinstanceidto_id=UUID(resource_id),
            resourceinstancefrom_graphid_id=name_to_graph_table["Artwork"].graphid,
        ).values_list("resourceinstanceidfrom_id", flat=True)
        tiles = models.TileModel.objects.filter(
            nodegroup_id=photograph_node_group_id, resourceinstance_id__in=relations
        )
        return JSONResponse(tiles[0].data[image_node_id][0])
    elif resource.graph_id == name_to_graph_table["Photographer"].graphid:
        relations = models.ResourceXResource.objects.filter(
            resourceinstanceidto_id=UUID(resource_id),
            resourceinstancefrom_graphid_id=name_to_graph_table["Artwork"].graphid,
        ).values_list("resourceinstanceidfrom_id", flat=True)
        tiles = models.TileModel.objects.filter(
            nodegroup_id=photograph_node_group_id, resourceinstance_id__in=relations
        )
        return JSONResponse(tiles[0].data[image_node_id][0])
    else:
        return JSONResponse({})
