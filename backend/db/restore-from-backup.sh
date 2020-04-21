#!/bin/bash

export MYSQL_ROOT_PASSWORD="testpwd"

ssh -i ./../shared_project_key_serverside.pem -oStrictHostKeyChecking=no ec2-user@api.skilledge.site 'bash -s' < restore-from-backup-remote-instructions.sh