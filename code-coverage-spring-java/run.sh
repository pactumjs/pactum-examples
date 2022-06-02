#!/bin/bash

echo "build app"
docker compose up -d

echo "wait for app to start"
sleep 10s

echo "run tests"
npm run test
