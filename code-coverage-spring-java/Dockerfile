#
# Build stage
#
# FROM maven:3.6.3-openjdk-11 AS build
# COPY pom.xml /home/app/
# RUN mvn -f /home/app/pom.xml install
# COPY src /home/app/src
# RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM adoptopenjdk/openjdk11:latest
# COPY --from=build /home/app/src/main/resources/config /usr/local/lib/config
# COPY --from=build /home/app/target/demo.jar /usr/local/lib/demo.jar
# COPY --from=build /home/app/target target
COPY target/demo-0.0.1-SNAPSHOT.jar /usr/local/lib/demo.jar
COPY target target
COPY coverage.sh .
ENTRYPOINT ["bash", "coverage.sh"]
