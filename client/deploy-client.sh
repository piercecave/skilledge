#!/bin/bash

export DOCKERNAME=$(head -n 1 ./../docker_username)

docker build -t piercecave/pong_client .
echo "✅  Local Docker Build Complete"
docker push piercecave/pong_client
echo "✅  Local Docker Push Complete"
ssh -i ./../shared_project_key.pem -oStrictHostKeyChecking=no ec2-user@skilledge.site 'bash -s' < upgrade-client.sh $DOCKERNAME
echo "🎊  Client Deployment Complete!"
read -p "Press any key..."