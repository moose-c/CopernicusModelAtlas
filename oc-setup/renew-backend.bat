@echo off
rem Delete OpenShift resources if they exist
oc delete -f ./oc-yaml

rem Convert Docker Compose file to OpenShift resources using kompose
kompose --provider openshift --file compose.yaml --out ./oc-yaml convert 

rem Create the OpenShift resources
oc create -f ./oc-yaml