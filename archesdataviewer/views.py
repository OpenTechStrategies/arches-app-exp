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

name_to_graph_table = {str(gr_obj.name): str(gr_obj.graphid) for gr_obj in graphs_prefetch}

# This table is used instead to pass to the front-end application, to index graph name by id
graph_to_name_table = {str(gr_obj.graphid): gr_obj.name for gr_obj in graphs_prefetch}


# This is a hardcoded id for the photograph node group id on the artwork resource model
photograph_node_group_id = UUID("5f85f884-34a5-11ef-9840-525400ef2e2d")

# This is a hardcoded id for the image node id on the artwork resource model
image_node_id = "73924468-34a5-11ef-bb6e-525400ef2e2d"

# This is a hardcoded id for the Location node group id on the artwork resource model
location_node_group_id = UUID("daa564ba-34db-11ef-9840-525400ef2e2d")

# This is a hardcoded id for the image node id
coordinates_node_id = "608b1e40-34e0-11ef-9840-525400ef2e2d"


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

# This is a custom prefetch route for fetching all userfacing resources (non-arches graphs), along 
# with image tiles, coordinate tiles, and node_id and graph_id references. 
def prefetch(request):
    # Gather all graphids for resources we want to show to users
    graphs = [name_to_graph_table["Artwork"],name_to_graph_table["Artist"],name_to_graph_table["Structure"],name_to_graph_table["Photographer"]]
    
    # Gather all resources
    resources = Resource.objects.filter(graph__in=graphs)
    
    # Gather all relations
    relations = models.ResourceXResource.objects.all()
    
    # Extract all tiles in the 'Photographer' NodeGroup on artworks
    image_tiles = models.TileModel.objects.filter(
        nodegroup_id=photograph_node_group_id
    )
    
    # Extract all tiles in the 'Location' NodeGroup on artworks
    location_tiles = models.TileModel.objects.filter(
        nodegroup_id=location_node_group_id
    )
    

    return JSONResponse({"resources":resources,"resourceRelations":relations,"images":image_tiles,"locations":location_tiles, "idReferences":{
        "graphIdToNameTable":graph_to_name_table,
        "nameToGraphIdTable":name_to_graph_table,
        "imageNodeId":image_node_id,
        "coordinatesNodeId":coordinates_node_id
    }})
