# Start application

# Fix issues
## Write new code
Pull this repository
Request 4 .env files: for the api, database, frontend & oc-setup/secrets folder
Website can be run locally by executing start-frontend.bat
Ask & setup push functionality (Contact repo owner)

## Connecting to Openshift
You need to have access to the geo-acc-modelatlas namespace, act GeoICT for this
After this, navigate to the oc-setup folder.
from the openshift console, click the question mark -> command line tools, download the correct CLI and place in the oc-setup foler.
From command line tools, click 'copy login command' and execute from oc-setup. 
Perform 2fac auth

## Inspecting api
execute 'oc logs.bat api' from oc-setup
Now, any requests made to the api can be seen in real time

## Inspecting database
execute 'oc exec.bat pg' from oc-setup
execute 'psql'
You are now in the database, execute '\d models' or 'select modelname from models;'' or whatever is of interest 

## pushing changes
execute 'renew-fe.bat', 'renew-backend.bat' or 'renew-all.bat' from oc-setup





ssh -D localhost:6443 -N steppingstone