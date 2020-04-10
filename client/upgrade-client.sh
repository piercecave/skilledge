#!/bin/bash

export DOCKERNAME=$1

docker rm -f skilledge_client
echo "✅  Current Docker Container Stopped & Removed"
docker pull $DOCKERNAME/skilledge_client
echo "✅  Lastest Docker Image Pulled To Server"
# docker run -d --name skilledge_client -p 443:443 -p 80:80 -v /etc/letsencrypt:/etc/letsencrypt:ro $DOCKERNAME/skilledge_client
# docker run --name skilledge_client -itd --rm -v /app -v /app/node_modules -v /etc/letsencrypt:/etc/letsencrypt:ro -p 443:443 -p 80:80 -e CHOKIDAR_USEPOLLING=true $DOCKERNAME/skilledge_client
docker run --name skilledge_client -d -v /etc/letsencrypt:/etc/letsencrypt:ro -p 443:443 -p 80:80 $DOCKERNAME/skilledge_client
echo "✅  Updated Docker Container Successfully Running"