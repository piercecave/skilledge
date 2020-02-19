#!/bin/bash
export DOCKERNAME=piercecave

docker build -t $DOCKERNAME/skilledgegateway ./gateway/
docker build -t $DOCKERNAME/skilledgedatabase ./db/
echo "✅  Local Docker Builds Complete"

docker push $DOCKERNAME/skilledgegateway
docker push $DOCKERNAME/skilledgedatabase
echo "✅  Push Docker Containers to DockerHub"

ssh -i ./../shared_project_key_serverside.pem -oStrictHostKeyChecking=no ec2-user@api.skilledge.site 'bash -s' < update-servers.sh $DOCKERNAME
echo "🎊  Server Deployment Complete!"