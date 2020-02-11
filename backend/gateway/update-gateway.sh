#!/bin/bash

export DOCKERNAME=$1

docker pull $DOCKERNAME/ponggateway
echo "✅  Pulled Docker Containers"

docker rm -f ponggateway
echo "✅  Current Docker Containers Stopped & Removed"

export MYSQL_HOST="pongdatabase"
export MYSQL_PORT="3306"
export MYSQL_USER="root"
export MYSQL_ROOT_PASSWORD="testpwd"
export MYSQL_DB_NAME="pongdb"
export SESSIONKEY="key"
export REDISADDR="redisserver:6379"
export DSN="root:testpwd@tcp(pongdatabase:3306)/pongdb"
export TLSCERT=/etc/letsencrypt/live/pongapi.piercecave.com/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/pongapi.piercecave.com/privkey.pem
echo "✅  Environment Variables Set"

docker run -d --network backendnetwork --name ponggateway -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt:ro -e TLSCERT=$TLSCERT -e TLSKEY=$TLSKEY -e REDISADDR=$REDISADDR -e SESSIONKEY=$SESSIONKEY -e MYSQL_HOST=$MYSQL_HOST -e MYSQL_PORT=$MYSQL_PORT -e MYSQL_USER=$MYSQL_USER -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -e MYSQL_DB_NAME=$MYSQL_DB_NAME -e DSN=$DSN $DOCKERNAME/ponggateway
echo "✅  Docker Containers Successfully Running"