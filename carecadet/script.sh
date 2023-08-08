# !/bin/bash

docker stop healthlens_react_app
docker rm healthlens_react_app
# docker rmi healthlens_react_app --force
docker build -t healthlens_react_app .
docker run -p 5008:3000 -d --name healthlens_react_app --restart always healthlens_react_app
