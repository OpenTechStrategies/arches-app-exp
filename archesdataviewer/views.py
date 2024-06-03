import json
from django.shortcuts import render

def index(request):
    with open('/usr/local/lib/python3.10/site-packages/archesdataviewer/static/.vite/manifest.json', 'r') as manifest:
        json_data = json.load(manifest)
    
    # Extract relevant data from the JSON
    js_file = json_data['index.html']['file']
    css_file = json_data['index.html']['css'][0]
    
    context = {
        'js_file': js_file,
        'css_file': css_file,
    }
    
    return render(request, 'index.html', context)
