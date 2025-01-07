oc new-app bitnami/postgresql~git@github.com:moose-c/CopernicusModelAtlas.git#acc --source-secret github-connection --name db-init --context-dir=database --strategy=docker

oc get pods
oc rsh <pod-name>
oc rsh db-init-784995f7c9-rfpph

from OC:
psql "host=psql03.its.uu.nl port=5432 user=geo-prd-copernicus-model-atlas dbname=geo-prd-copernicus-model-atlas sslmode=require"

oc run db-init --image=bitnami/postgresql -it -- bash


curl ifconfig.me
