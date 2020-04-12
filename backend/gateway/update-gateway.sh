#!/bin/bash

export DOCKERNAME=$1

docker pull $DOCKERNAME/skilledgegateway
echo "✅  Pulled Docker Containers"

docker rm -f skilledgegateway
echo "✅  Current Docker Containers Stopped & Removed"

export MYSQL_HOST="skilledgedatabase"
export MYSQL_PORT="3306"
export MYSQL_USER="root"
export MYSQL_ROOT_PASSWORD="testpwd"
export MYSQL_DB_NAME="skilledgedb"
export SESSIONKEY="key"
export REDISADDR="redisserver:6379"
export DSN="root:testpwd@tcp(skilledgedatabase:3306)/skilledgedb"
export ENV="PRODUCTION"
export CLIENT_URL="https://skilledge.site"
export TLSCERT=/etc/letsencrypt/live/api.skilledge.site/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.skilledge.site/privkey.pem
echo "✅  Environment Variables Set"

docker run -d --network backendnetwork --name skilledgegateway --restart unless-stopped -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt:ro -e ENV=$ENV -e CLIENT_URL=$CLIENT_URL -e TLSCERT=$TLSCERT -e TLSKEY=$TLSKEY -e REDISADDR=$REDISADDR -e SESSIONKEY=$SESSIONKEY -e MYSQL_HOST=$MYSQL_HOST -e MYSQL_PORT=$MYSQL_PORT -e MYSQL_USER=$MYSQL_USER -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -e MYSQL_DB_NAME=$MYSQL_DB_NAME -e DSN=$DSN $DOCKERNAME/skilledgegateway
echo "✅  Docker Containers Successfully Running"