# Start with a base image containing Go
FROM golang:1.22-alpine as development

# Install necessary packages
RUN apk update && apk add --no-cache git

# Set the Current Working Directory inside the container
WORKDIR /app

COPY . .

# Copy the source from the current directory to the Working Directory inside the container

# Build the Go app
RUN go build -o main ./cmd

# Command to run the executable
CMD ["./main"]

# Expose port (if your app runs on a specific port, e.g., 8080)
EXPOSE 8080