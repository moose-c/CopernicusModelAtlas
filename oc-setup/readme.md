Getting into openshift:
ssh -D localhost:6443 -N steppingstone

Loading the entire application: 
oc login --token=[token] --server=https://api.cl01.cp.its.uu.nl:6443
kompose --provider openshift --file compose.yaml --out ./oc-yaml convert 
oc create -f ./oc-yaml
oc delete -f ./oc-yaml

---
Setting up local postgress container:
docker-compose up postgres-access
docker exec -it 42ace78c30e7 /bin/bash
kompose --provider openshift --file compose.yaml --out ./oc-yaml convert 

and now seeing if this also works from the compose.yaml to openshift:
oc create -f ./oc-yaml (IP adress seems to be random from 1/511, and in need 1/255, so retry?)
oc logs access-1-l9849
oc exec -it postgres-access-1-xr2gt -- /bin/bash
psql "host=psql03.its.uu.nl port=5432 user=geo-prd-copernicus-model-atlas dbname=geo-prd-copernicus-model-atlas sslmode=require"
---
---
Setting up local flask:
docker-compose up flask-api
docker exec -it 11492a5cb4e6 /bin/bash
kompose --provider openshift --file compose.yaml --out ./oc-yaml convert 

and now seeing if this also works from the compose.yaml to openshift:
oc create -f ./oc-yaml
oc logs flask-api-1-spvtp
oc exec -it postgres-access-1-hccfc -- /bin/bash

and adding a route as usual.
curl https://api-geo-acc-modelatlas.apps.cl01.cp.its.uu.nl/api/messages/public
---
---
Setting up local frontend:
need to construct a PV and PVC from dist?