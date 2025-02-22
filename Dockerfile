# Use an OpenJDK 17 base image
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy source code
COPY EmailWriterSB/email-writer .

# Build the project
RUN mvn clean package -DskipTests

# Step 2: Use a lightweight JDK to run the app
CMD ["java", "-jar", "target/email-writer-0.0.1-SNAPSHOT.jar"]
