# Step 1: Use Maven to build the application
FROM maven:3.8.7-eclipse-temurin-17 AS build
WORKDIR /app
COPY EmailWriterSB/email-writer .  # Copy your project correctly
RUN mvn clean package -DskipTests

# Step 2: Use a lightweight JDK to run the app
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
