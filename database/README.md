oc new-app bitnami/postgresql~git@github.com:moose-c/CopernicusModelAtlas.git#acc --source-secret github-connection --name db-init --context-dir=database --strategy=docker

-> navigate to the pod -> terminal or:
oc get pods
oc rsh <pod-name>
oc rsh db-init-784995f7c9-rfpph

then:
psql "host=psql03.its.uu.nl port=5432 user=geo-prd-copernicus-model-atlas dbname=geo-prd-copernicus-model-atlas sslmode=require"

or now that things are a env:
psql
or psql --file=init_script.sql