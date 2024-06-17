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


# This is a custom route for returning a list of all Artwork Resources paired with their geojson data (if such data exists)
# It makes two requests to the database, gathering all Artwork Resources and GeoJSONGeometry model instances
# It returns only enough data to render the Artworks on a map, which is currently the artwork name, it's resourceId,
# graphId, and geojson data.
def artworksmap(request):
    # Gather all artwork resources and geojson objects
    artwork_resources = Resource.to_json__bulk(Resource.objects.filter(graph=name_to_graph_table["Artwork"]))
    
    # Parse into json, accounting for doubly nested json string
    for resource in artwork_resources:
        coordinates_str = resource.get('Location', {}).get('Coordinates')
        if coordinates_str:
            try:
                coordinates_json = json.loads(coordinates_str.replace("'", "\""))
                resource['Location']['Coordinates'] = coordinates_json
            except json.JSONDecodeError:
               resource['Location']['Coordinates'] = None
               
    return JSONResponse(artwork_resources)


# Custom Route for returning all graph id's and names, used by the front-end
# component to distinguish resource types dynamically.
def graphs(request):
    return JSONResponse(
        JSONSerializer().serializeToPython(models.GraphModel.objects.all())
    )
