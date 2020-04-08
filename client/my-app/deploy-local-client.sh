#!/bin/bash
docker rm -f client
docker build -t client .
docker run --name client -itd --rm -v /app -v /app/node_modules -p 3001:80 -e CHOKIDAR_USEPOLLING=true client