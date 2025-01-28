@echo off
rem Delete OpenShift resources if they exist
oc delete -f ./oc-yaml

rem Convert Docker Compose file to OpenShift resources using kompose
kompose --provider openshift --file compose.yaml --out ./oc-yaml convert 

rem Create the OpenShift resources
oc create -f ./oc-yaml

rem Navigate to frontend and build the project
cd ../frontend
call npm run build
cd ..

rem Commit and push changes
git add .
git commit -m "new build"
git push

cd oc-setup

rem Delete all OpenShift builds
oc delete builds --all -n geo-acc-modelatlas

rem Start the frontend build
oc start-build frontend

rem Wait for 1 minute (use timeout instead of sleep)
call timeout /t 60

rem Get the current deployment YAML
oc get deployment frontend -o yaml > frontend-deployment.yaml

rem Delete and re-apply the YAML file to update deployment
oc delete deployment frontend 
oc apply -f ./frontend-deployment.yaml
del frontend-deployment.yaml

oc set image deployment/frontend frontend=image-registry.openshift-image-registry.svc:5000/geo-acc-modelatlas/frontend:latest