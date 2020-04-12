#!/bin/bash
docker rm -f client
docker build -t client . -f Dockerfile.dev
export REACT_APP_BACKEND_URL="http://localhost:3002"
docker run --name client -e REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL -d -p 3001:80 client
echo "✅  Updated Docker Container Successfully Running"
echo "🎊  Client Deployment Complete!"