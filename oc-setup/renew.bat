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

@REM rem Delete all OpenShift builds
@REM oc delete builds --all -n geo-acc-modelatlas

@REM rem Start the frontend build
@REM oc start-build frontend

@REM rem Wait for 1 minute (use timeout instead of sleep)
@REM call timeout /t 60

@REM rem Set the image for the frontend deployment
@REM oc set image deployment/frontend frontend=image-registry.openshift-image-registry.svc:5000/geo-acc-modelatlas/frontend:latest -n geo-acc-modelatlas
