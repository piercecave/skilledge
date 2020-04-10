#!/bin/bash
export DOCKERNAME=$(head -n 1 ./../../docker_username)

docker build -t $DOCKERNAME/skilledgegateway ./
echo "✅  Local Docker Builds Complete"

docker rm -f skilledgegateway
echo "✅  Current Docker Containers Stopped & Removed"

# docker volume rm $(docker volume ls -qf dangling=true)
# echo "✅  Docker Volumes Removed"

export MYSQL_HOST="skilledgedatabase"
export MYSQL_PORT="3306"
export MYSQL_USER="root"
export MYSQL_ROOT_PASSWORD="testpwd"
export MYSQL_DB_NAME="skilledgedb"
export SESSIONKEY="key"
export REDISADDR="redisserver:6379"
export DSN="root:testpwd@tcp(skilledgedatabase:3306)/skilledgedb"
export ENV="DEVELOPMENT"
export CLIENT_URL="http://localhost:3001"
export TLSCERT=/etc/letsencrypt/live/api.skilledge.site/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.skilledge.site/privkey.pem
echo "✅  Environment Variables Set"

docker run -d --network backendnetwork --name skilledgegateway --restart unless-stopped -p 3002:80 -e ENV=$ENV -e CLIENT_URL=$CLIENT_URL -e TLSCERT=$TLSCERT -e TLSKEY=$TLSKEY -e REDISADDR=$REDISADDR -e SESSIONKEY=$SESSIONKEY -e MYSQL_HOST=$MYSQL_HOST -e MYSQL_PORT=$MYSQL_PORT -e MYSQL_USER=$MYSQL_USER -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -e MYSQL_DB_NAME=$MYSQL_DB_NAME -e DSN=$DSN $DOCKERNAME/skilledgegateway
echo "🎊  Server Deployment Complete!"