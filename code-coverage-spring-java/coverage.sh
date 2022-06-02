#!/bin/bash

echo "Download Jacoco Agent"
curl "https://repo1.maven.org/maven2/org/jacoco/org.jacoco.agent/0.8.7/org.jacoco.agent-0.8.7-runtime.jar" -o "./jacocoagent.jar"
curl "https://repo1.maven.org/maven2/org/jacoco/org.jacoco.cli/0.8.7/org.jacoco.cli-0.8.7-nodeps.jar" -o "./jacococli.jar"

echo "Start Server"
java -javaagent:jacocoagent.jar=destfile=coverage/jacoco.exec,address=*,port=33933,output=tcpserver -jar /usr/local/lib/demo.jar
