# Step 1: Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim

# Step 2: Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Step 3: Set the working directory
WORKDIR /app

# Step 4: Copy the application code
COPY EmailWriterSB/email-writer .

# Step 5: Build the project
RUN mvn clean package -DskipTests

# Step 6: Use a lightweight JDK to run the app
CMD ["java", "-jar", "target/email-writer-0.0.1-SNAPSHOT.jar"]
