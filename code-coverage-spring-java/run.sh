#!/bin/bash

echo "package jar"
mvn package

echo "build app"
docker compose up -d

echo "wait for app to start"
sleep 10s

echo "run tests"
npm run test

echo "dump coverage"
docker-compose exec -T app java -jar jacococli.jar dump --address localhost --port 33933 --destfile coverage/jacoco.exec

echo "parse coverage"
docker-compose exec -T app java -jar jacococli.jar report coverage/jacoco.exec --classfiles target/classes/com --sourcefiles src/main/java/ --html coverage/html --xml coverage/coverage.xml
