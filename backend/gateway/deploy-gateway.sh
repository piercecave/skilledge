#!/bin/bash
export DOCKERNAME=$(head -n 1 ./../../docker_username)

docker build -t $DOCKERNAME/skilledgegateway ./
echo "✅  Local Docker Builds Complete"

docker push $DOCKERNAME/skilledgegateway
echo "✅  Push Docker Containers to DockerHub"

ssh -i ./../../shared_project_key_serverside.pem -oStrictHostKeyChecking=no ec2-user@api.skilledge.site 'bash -s' < update-gateway.sh $DOCKERNAME
echo "🎊  Server Deployment Complete!"