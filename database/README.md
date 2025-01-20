
oc new-app git@github.com:moose-c/CopernicusModelAtlas.git#acc --source-secret github-connection --name new-db-init --context-dir=database --strategy=docker

-> navigate to the pod -> terminal or:
oc get pods
oc rsh <pod-name>
oc rsh db-init-784995f7c9-rfpph

then:
psql "host=psql03.its.uu.nl port=5432 user=geo-prd-copernicus-model-atlas dbname=geo-prd-copernicus-model-atlas sslmode=require"

or now that things are a env:
psql
or psql --file=init_script.sql

oc new-app ./database --name db-conn --source-secret github-connection
oc set build-secret --pull bc/db-conn github-connection
oc logs build/db-conn-1

oc delete all -l app=db-conn