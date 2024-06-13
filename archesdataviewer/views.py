import json
from django.shortcuts import render
from arches.app.models import models
from arches.app.models.resource import Resource
from arches.app.utils.response import JSONResponse
from arches.app.utils.betterJSONSerializer import JSONSerializer

# This is a prefetch done to the GraphModel to allow for ease of lookup
# for a given Resource model
graphs_prefetch = models.GraphModel.objects.all()
name_to_graph_table = {str(gr_obj.name): gr_obj for gr_obj in graphs_prefetch}


def index(request):
    with open(
        "/usr/local/lib/python3.10/site-packages/archesdataviewer/static/.vite/manifest.json",
        "r",
    ) as manifest:
        json_data = json.load(manifest)

    # Extract relevant data from the JSON
    js_file = json_data["index.html"]["file"]
    css_file = json_data["index.html"]["css"][0]

    context = {
        "js_file": js_file,
        "css_file": css_file,
    }

    return render(request, "index.html", context)


# Helper function for combining a resource with it's GeoJson Data
def create_artwork_geojson(resource: Resource, geojson_serialized):
    resource_id = str(resource.resourceinstanceid)
    geojson = geojson_serialized.get(resource_id)
    if geojson:
        return {
            "resourceinstanceid": resource_id,
            "graph_id": str(resource.graph_id),
            "name": str(resource.name),
            "geojson": geojson,
        }
    return None


# This is a custom route for returning a list of all Artwork Resources paired with their geojson data (if such data exists)
# It makes two requests to the database, gathering all Artwork Resources and GeoJSONGeometry model instances
# It returns only enough data to render the Artworks on a map, which is currently the artwork name, it's resourceId,
# graphId, and geojson data.
def artworksmap(request):
    # Gather all artwork resources and geojson objects
    artwork_resources = Resource.objects.filter(graph=name_to_graph_table["Artwork"])
    geojson_objects = models.GeoJSONGeometry.objects.all()
    geojson_serialized = {
        str(geo["resourceinstance_id"]): geo
        for geo in JSONSerializer().serializeToPython(geojson_objects)
    }

    # Return paired artworks with geojson data, based on resource_id field
    artwork_geojson_data = [
        create_artwork_geojson(resource, geojson_serialized)
        for resource in artwork_resources
        if create_artwork_geojson(resource, geojson_serialized) is not None
    ]

    return JSONResponse(artwork_geojson_data)


# Custom Route for returning all graph id's and names, used by the front-end
# component to distinguish resource types dynamically.
def graphs(request):
    return JSONResponse(
        JSONSerializer().serializeToPython(models.GraphModel.objects.all())
    )
