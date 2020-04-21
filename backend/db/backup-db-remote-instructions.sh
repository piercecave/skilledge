#!/bin/bash

export MYSQL_ROOT_PASSWORD="testpwd"

docker exec -i some-mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /db-backups/all-databases.sql