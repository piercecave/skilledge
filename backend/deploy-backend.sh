#!/bin/bash
export DOCKERNAME=piercecave

docker build -t $DOCKERNAME/ponggateway ./gateway/
docker build -t $DOCKERNAME/pongdatabase ./db/
echo "✅  Local Docker Builds Complete"

docker push $DOCKERNAME/ponggateway
docker push $DOCKERNAME/pongdatabase
echo "✅  Push Docker Containers to DockerHub"

ssh -oStrictHostKeyChecking=no ec2-user@pongapi.piercecave.com 'bash -s' < update-servers.sh $DOCKERNAME
echo "🎊  Server Deployment Complete!"