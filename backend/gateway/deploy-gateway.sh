#!/bin/bash
export DOCKERNAME=piercecave

docker build -t $DOCKERNAME/ponggateway ./
echo "✅  Local Docker Builds Complete"

docker push $DOCKERNAME/ponggateway
echo "✅  Push Docker Containers to DockerHub"

ssh -oStrictHostKeyChecking=no ec2-user@pongapi.piercecave.com 'bash -s' < update-gateway.sh $DOCKERNAME
echo "🎊  Server Deployment Complete!"