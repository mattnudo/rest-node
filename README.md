# rest-node
NodeJS REST API - Learning how to build a containerized NodeJS REST server

build
`docker build . -t mattnudo/node-web-app`

Stop
`docker stop <container ID>``

RUN
` `docker run -p 8080:8080 -d mattnudo/node-web-app`

If any dependency vilnerabilities RUN
`npm audit fix --force`

see container logs
`docker logs <container id>`

stop all containers
`docker stop $(docker ps -q)`

Endpoints will all 403 without successful login

```
POST http://localhost:8080/login
{
    "username":"matt",
    "password": "mattrocks"
}```

After successful login a http only cookie will be set and you can now use the Endpoints

Upon access token timeout you can call the refresh endpoint and grab a new access token

```
POST http://localhost:8080/refresh
{
    "username":"matt",
    "password": "mattrocks"
}```

if you delete the cookie you will get 403'd
