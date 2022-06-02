#
# Build stage
#
FROM maven:3.6.3-openjdk-11 AS build
COPY pom.xml /home/app/
RUN mvn -f /home/app/pom.xml install
COPY src /home/app/src
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM adoptopenjdk/openjdk11:latest
COPY --from=build /home/app/src/main/resources/config /usr/local/lib/config
COPY --from=build /home/app/target/npm-pricing.jar /usr/local/lib/demo.jar
EXPOSE 7777
ENTRYPOINT ["java","-Xmx600m","-jar","/usr/local/lib/demo.jar"]
