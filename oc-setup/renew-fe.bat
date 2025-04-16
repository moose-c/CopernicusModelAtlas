rem Navigate to frontend and build the project
cd ../frontend
call npm run build
cd ..

rem Commit and push changes
git add .
git commit -m "new build"
git push

cd oc-setup

oc delete all -l app=fe

oc new-app registry.access.redhat.com/ubi8/nodejs-16~git@github.com:moose-c/CopernicusModelAtlas.git#acc --source-secret github-connection --name fe --context-dir frontend --build-env-file=./secrets/.env-frontend

echo about 45 seconds until build is completed
timeout /t 45 /nobreak >nul
echo Probably Done!