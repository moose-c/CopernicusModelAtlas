# Frontend of the Copernicus Model Atlas application 
Uses Auth0 for authentication.
This was setup by following https://developer.auth0.com/resources/code-samples/spa/react/basic-authentication

Later, this application was migrated to use vite for a smoother development process.

RBAC for pages was configured following this: https://www.youtube.com/watch?v=yuOFwTKDMek 

# Building
npm run build

oc new-app registry.access.redhat.com/ubi8/nodejs-16~git@github.com:moose-c/CopernicusModelAtlas.git#acc --source-secret github-connection --name frontend --context-dir frontend
oc delete all -l app=frontend

