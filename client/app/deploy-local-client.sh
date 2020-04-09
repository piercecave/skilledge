#!/bin/bash
docker rm -f client
docker build -t client . -f Dockerfile.dev
docker run --name client -d -p 3001:80 client
echo "✅  Updated Docker Container Successfully Running"
echo "🎊  Client Deployment Complete!"