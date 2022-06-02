#!/bin/bash

echo "build app"
docker compose up -d
sleep 2s

echo "run tests"
npm run test

echo "dump coverage"
docker compose stop