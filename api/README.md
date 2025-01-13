# Hello World API: Flask Auth0 Sample

This Python code sample demonstrates how to implement authorization in a Flask API server using Auth0.
https://github.com/auth0-developer-hub/api_flask_python_hello-world.git, checkout basic-role-based-access-control
https://developer.auth0.com/resources/code-samples/api/flask/basic-role-based-access-control

start with `flask run`
docker build -t api .
docker run --env-file=.env --name api_container api

curl 127.0.0.1:8080/api/messages/public
curl https://api-geo-acc-modelatlas.apps.cl01.cp.its.uu.nl/api/messages/protected
curl -I https://api-geo-acc-modelatlas.apps.cl01.cp.its.uu.nl/api/messages/public