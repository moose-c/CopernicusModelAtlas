oc delete -f ./oc-yaml
kompose --provider openshift --file compose.yaml --out ./oc-yaml convert 
oc create -f ./oc-yaml

cd ../frontend && npm run build
