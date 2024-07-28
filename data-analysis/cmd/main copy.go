package main

import (
	"github.com/nats-io/nats.go"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
	nc *nats.Conn
)

// func main() {
// 	// Initialize environment variables
// 	dsn := os.Getenv("DATABASE_DSN")
// 	natsURL := os.Getenv("NATS_URL")

// 	// Connect to PostgreSQL database
// 	var err error
// 	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
// 	if err != nil {
// 		log.Fatalf("failed to connect to database: %v", err)
// 	}

// 	// Connect to NATS server
// 	nc, err = nats.Connect(natsURL)
// 	if err != nil {
// 		log.Fatalf("failed to connect to NATS: %v", err)
// 	}
// 	defer nc.Close()

// 	// Initialize Gin router
// 	router := gin.Default()

// 	// Define a simple health check endpoint
// 	router.GET("/health", func(c *gin.Context) {
// 		c.JSON(http.StatusOK, gin.H{
// 			"status": "ok",
// 		})
// 	})

// 	// Define more routes as needed
// 	// Example: router.POST("/data", handleData)

// 	// Start the server
// 	port := os.Getenv("PORT")
// 	if port == "" {
// 		port = "8080"
// 	}
// 	router.Run(":" + port)
// }

// // Example handler function for a data endpoint
// func handleData(c *gin.Context) {
// 	// Example: handle incoming data, process it, and respond
// 	// data := c.PostForm("data")

// 	// Example: Publish a message to a NATS subject
// 	// err := nc.Publish("subject", []byte(data))
// 	// if err != nil {
// 	//     c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to publish message"})
// 	//     return
// 	// }

// 	// Respond with success
// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "data received and processed",
// 	})
// }
