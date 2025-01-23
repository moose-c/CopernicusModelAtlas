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
rem Check if the build command was successful
cd ../oc-setup

rem Commit and push changes
git add .
git commit -m "new build"
git push

rem Delete all OpenShift builds
oc delete builds --all -n geo-acc-modelatlas

rem Start the frontend build
oc start-build frontend

rem Wait for 1 minute (use timeout instead of sleep)
timeout /t 60

echo Process resumed after 1 minute.

rem Set the image for the frontend deployment
oc set image deployment/frontend frontend=image-registry.openshift-image-registry.svc:5000/geo-acc-modelatlas/frontend:latest -n geo-acc-modelatlas
