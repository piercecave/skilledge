#!/bin/bash

export DOCKERNAME=$1

docker pull $DOCKERNAME/skilledgegateway
docker pull $DOCKERNAME/skilledgedatabase
echo "✅  Pulled Docker Containers"

docker rm -f skilledgegateway
docker rm -f skilledgedatabase
docker rm -f redisserver
echo "✅  Current Docker Containers Stopped & Removed"

docker volume rm $(docker volume ls -qf dangling=true)
echo "✅  Docker Volumes Removed"

docker network rm backendnetwork
echo "✅  Current Docker Network Stopped & Removed"

export MYSQL_HOST="skilledgedatabase"
export MYSQL_PORT="3306"
export MYSQL_USER="root"
export MYSQL_ROOT_PASSWORD="testpwd"
export MYSQL_DB_NAME="skilledgedb"
export SESSIONKEY="key"
export REDISADDR="redisserver:6379"
export DSN="root:testpwd@tcp(skilledgedatabase:3306)/pongdb"
export TLSCERT=/etc/letsencrypt/live/api.skilledge.site/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.skilledge.site/privkey.pem
echo "✅  Environment Variables Set"

docker network create -d bridge backendnetwork
echo "✅  Docker Network Created"

docker run -d --network backendnetwork --name skilledgedatabase -e MYSQL_USER=$MYSQL_USER -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -e MYSQL_DATABASE=$MYSQL_DB_NAME $DOCKERNAME/skilledgedatabase
docker run -d --network backendnetwork --name skilledgegateway --restart unless-stopped -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt:ro -e TLSCERT=$TLSCERT -e TLSKEY=$TLSKEY -e REDISADDR=$REDISADDR -e SESSIONKEY=$SESSIONKEY -e MYSQL_HOST=$MYSQL_HOST -e MYSQL_PORT=$MYSQL_PORT -e MYSQL_USER=$MYSQL_USER -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -e MYSQL_DB_NAME=$MYSQL_DB_NAME -e DSN=$DSN $DOCKERNAME/skilledgegateway
docker run -d --network backendnetwork --name redisserver redis
echo "✅  Docker Containers Successfully Running"