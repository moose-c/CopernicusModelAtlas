Getting into openshift:
ssh -D localhost:6443 -N steppingstone

oc login --token=[token] --server=https://api.cl01.cp.its.uu.nl:6443
renew-all.bat
renew-backend.bat
IF CONNECTION ERROR: REDO renew-backend.bat

psql -f ./scripts/init_script.sql

exec.bat api
logs.bat api

curl https://api-geo-acc-modelatlas.apps.cl01.cp.its.uu.nl/api/messages/public