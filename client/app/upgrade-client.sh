#!/bin/bash

export DOCKERNAME=$1

docker rm -f skilledge_client
echo "✅  Current Docker Container Stopped & Removed"
docker pull $DOCKERNAME/skilledge_client
export REACT_APP_BACKEND_URL="https://skilledge.site"
echo "✅  Lastest Docker Image Pulled To Server"
docker run -d --name skilledge_client -e REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL -p 443:443 -p 80:80 -v /etc/letsencrypt:/etc/letsencrypt:ro $DOCKERNAME/skilledge_client
echo "✅  Updated Docker Container Successfully Running"