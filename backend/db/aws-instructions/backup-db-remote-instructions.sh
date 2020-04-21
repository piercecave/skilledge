#!/bin/bash

export MYSQL_ROOT_PASSWORD="testpwd"

docker exec skilledgedatabase sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > ./db-backups/all-databases.sql