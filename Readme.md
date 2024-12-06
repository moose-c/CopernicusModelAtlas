# Start application
wsl
(cd ~/.ssh/
gedit config)
sshuttle -r 9204881@steppingstone 0/0
sshuttle -r steppingstone 0/0

Windows:

ssh steppingstone 

ssh -T git@github.com
Fuck me even this doesn't work. Schnoen

mooscastelijn@gmail.com
ssh-keygen -t ed25519 -C "mooscastelijn@gmail.com"

cd c:/Users/moosc/.ssh/id_ed25519

ssh -i /home/user/.ssh/github-connection -T git@github.com

oc create secret generic github-connection \
     --from-file=ssh-privatekey=/home/user/.ssh/github-connection \
     --type=kubernetes.io/ssh-auth

oc secrets link builder github-connection

oc new-app registry.access.redhat.com/ubi8/nodejs-16~git@github.com:moose-c/CopernicusModelAtlas.git \
    --source-secret github-connection --name vite-frontend --context-dir vite-frontend

$ oc set build-secret vite-frontend github-connection --source