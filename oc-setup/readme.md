Getting into openshift:
ssh -D localhost:6443 -N steppingstone

oc login --token=[token] --server=https://api.cl01.cp.its.uu.nl:6443

psql "host=psql03.its.uu.nl port=5432 user=geo-prd-copernicus-model-atlas dbname=geo-prd-copernicus-model-atlas sslmode=require" -f ./scripts/init_script.sql

oc exec -it flask-api-1-x944729gtf -- /bin/bash
oc logs -f flask-api-1-x9447

curl https://api-geo-acc-modelatlas.apps.cl01.cp.its.uu.nl/api/messages/public