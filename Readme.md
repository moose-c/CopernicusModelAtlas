# Fix issues
## Write new code
Pull this repository
Request 4 .env files from me (mooscastelijn@gmail.com): for the api, database, frontend & oc-setup/secrets folder, and replace .env-template with these.
Website can be run locally by executing start-frontend.bat
Ask & setup push functionality (Contact repo owner)

## Connecting to Openshift
https://docs.cp.its.uu.nl/content/basics/login/#option-2-socks5-proxy
I only got option 2, Socks 5 proxy to work.
You need to have access to the geo-acc-modelatlas namespace, act GeoICT for this. To achieve this email geoict@uu.nl for this and mention the name (geo-acc-modelatlas) & label (100105).
After this, navigate to the oc-setup folder from a terminal.
from the openshift console, click the question mark -> command line tools, download the correct CLI and place in the oc-setup foler.
From command line tools, click 'copy login command' and execute from oc-setup. 
Perform 2fac auth.
Now Openshift can be inspected and local changes can be pushed to the platform

## Inspecting api
execute 'logs.bat api' from oc-setup
Now, any requests made to the api can be seen in real time

## Inspecting database
execute 'exec.bat pg' from oc-setup
execute 'psql'
You are now in the database, execute '\d models' or 'select modelname from models;' or whatever is of interest 

## pushing changes
execute 'renew-fe.bat', 'renew-backend.bat' or 'renew-all.bat' from oc-setup
to renew the frontend, backend or everything respectively.