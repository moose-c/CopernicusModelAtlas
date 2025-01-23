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
oc exec -it postgres-access-1-fvmql -- /bin/bash
psql "host=psql03.its.uu.nl port=5432 user=geo-prd-copernicus-model-atlas dbname=geo-prd-copernicus-model-atlas sslmode=require" -f ./scripts/init_script.sql
add db password Secret, or enter manually
---
---
Setting up local flask:
docker-compose up flask-api
docker exec -it 11492a5cb4e6 /bin/bash
kompose --provider openshift --file compose.yaml --out ./oc-yaml convert 

and now seeing if this also works from the compose.yaml to openshift:
oc create -f ./oc-yaml
oc logs flask-api-1-spvtp
oc exec -it flask-api-1-z55vd -- /bin/bash
add db password Secret, or enter manually
oc logs flask-api-1-z55vd

curl https://api-geo-acc-modelatlas.apps.cl01.cp.its.uu.nl/api/messages/public
---
---
Setting up local frontend:

npm run build
git commit

oc delete builds --all -n geo-acc-modelatlas
oc start-build frontend
oc get builds

oc set image deployment/frontend frontend=image-registry.openshift-image-registry.svc:5000/geo-acc-modelatlas/frontend:latest -n geo-acc-modelatlas
oc tag image-registry.openshift-image-registry.svc:5000/geo-acc-modelatlas/frontend:latest geo-acc-modelatlas/frontend:latest
oc rollout restart deployment/frontend -n geo-acc-modelatlas
oc delete pods -l app=frontend -n geo-acc-modelatlas

oc get deployment frontend -n geo-acc-modelatlas -o yaml > frontend-deployment.yaml
oc delete -f ./frontend-deployment.yaml
oc apply -f ./frontend-deployment.yaml


oc exec -it frontend-76bb4bcc84-777ld -- /bin/bash