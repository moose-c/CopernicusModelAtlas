# Start application
wsl
(cd ~/.ssh/
gedit config)
sshuttle -r 9204881@steppingstone 0/0
sshuttle -r steppingstone 0/0

Windows:

ssh steppingstone 
oc set env pod/frontend-3-build --list | grep ^VITE
oc set env pod/frontend-6cd85b55c-wj65s --list | grep ^VITE

oc new-app python:3.11~git@github.com:moose-c/CopernicusModelAtlas.git --source-secret github-connection --name backend --context-dir flask-backend --strategy docker