# Arches Data Viewer
The Arches Data Viewer is a WIP ['Arches Application'](https://arches.readthedocs.io/en/stable/developing/extending/creating-apps/), an extension of the [Arches Project](https://www.archesproject.org/). The goal of this project is 
to create an isolated front-end component that consumes data from the Arches platform. 

It is currently hosted at (https://arches-app-demo.opentechstrategies.com/archesdataviewer/home/)

# Technologies used
An Arches Application is itself a Django Application, which can be installed into an existing instance of Arches. 
The code in the ```archesdataviewer``` folder is modeled off of [this repository](https://github.com/chiatt/dashboard). Currently,
it is used only to serve the front-end component as bundeled javascript.

The ```front-end``` folder contains a Vue Application, built with Vite and Typescript. The ultimate goal of this application is to provide an alternative UI to the current Arches platform, using a modern web framework like Vue. Currently, the Vue code is bundled by vite into the static directory of the Django Application, which is then served on the user's Arches server.


# Installation Instructions
*Credits to users @apeters and @chiatt*

In order to install the Arches Data Viewer Application into arches, follow these steps

1. Install if from this repo (or clone this repo and pip install it locally).
   ```pip install git+https://github.com/OpenTechStrategies/arches-app-exp.git```

2. Add 'archesdataviewer' to the ARCHES_APPLICATIONS and INSTALLED_APPS settings in the demo project's settings.py file
```python
ARCHES_APPLICATIONS = ("archesdataviewer",)  # be sure to add the trailing comma!

INSTALLED_APPS = [
    ...
    "archesdataviewer",
]
```
3. Update your urls.py file in your project. You'll likely need to add the re_path import:
```python
from django.urls import include, path, re_path
```
and then the following path:
```python
re_path(r"^", include("archesdataviewer.urls")),
```
4. If using nginx to serve the application, some small workarounds will be required. See `/archesdataviewer/README.md` for a sample nginx config that will expose the proper assets

5. Navigate to ```
 http://{your_arches_instance_url}/archesdataviewer ```

# Developing the front-end

A long-term goal of this application is to be a jumping off point for customizing an Arches user experience. 

TBA more details on front-end development in the near future.

Currently, if you wish to develop the base front-end, the workflow has been set up with vite to build the static assets into the django application, along with dynamic imports of the bundled JS and CSS files.

Example front-end dev workflow:

0. Fork this repository
1. See front-end/README.md for vue setup Instructions
2. Develop vue code
3. Run npm run build
4. Uninstall the current version of this application on your arches instance with 
```pip uninstall archesdataviewer```
1. Reinstall the application with ```pip install git+https://github.com/{YourGithubForkURL}```
