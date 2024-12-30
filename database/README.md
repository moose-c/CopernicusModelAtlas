oc run db-init --image=bitnami/postgresql -it -bash
psql -h psql03.its.uu.nl -p 5432 -U geo-prd-copernicus-model-atlas -d geo-prd-copernicus-model-atlas

oc new-app postgres~git@github.com:moose-c/CopernicusModelAtlas.git#acc --source-secret github-connection --name db-init --context-dir=database --strategy=docker
oc delete all --selector app=db-init

(aditional secret with new --source-secret)

oc get pods
oc rsh <pod-name>