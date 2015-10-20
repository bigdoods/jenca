#!/bin/bash 

#install docker
wget -qO- https://get.docker.com/ | sh
VERSION=`docker --version | egrep -o "([0-9]{1,}\.)+[0-9]{1,}"`

if [[ -z "$VERSION" ]]; then
        echo "fail"
        exit 1
fi

if [[ -z "$TOMCAT_USER" ]]; then
        export TOMCAT_USER=xxx
fi

if [[ -z "$TOMCAT_PASSWORD" ]]; then
        export TOMCAT_PASSWORD=xxx
fi

#intall Dockerfile
docker run -d \
        -e TOMCAT_USER=$TOMCAT_USER \
        -e TOMCAT_PASSWORD=$TOMCAT_PASSWORD \
        -p 8080:8080 \
        --restart=always \
        bimscript/docker-bimserver
