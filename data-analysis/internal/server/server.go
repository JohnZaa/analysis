package server

import (
	"log"
	"net/http"

	"analysis/internal/engine/collectors"
	"analysis/internal/notifications"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func SetupRoutes(router *gin.Engine) {
	router.GET("/collect", collectDataHandler)
	router.GET("/ws", handleConnections)
}

func collectDataHandler(c *gin.Context) {
	url := c.Query("url")
	data, err := collectors.CollectDataFromAPI(url)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	collectors.SaveCollectedData(data)
	notifications.Notify(notifications.Message{
		Type: "info",
		Body: "Data collected and saved successfully",
	})

	c.JSON(http.StatusOK, gin.H{"message": "Data collected successfully"})
}

func handleConnections(c *gin.Context) {
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		http.Error(c.Writer, "Failed to upgrade WebSocket", http.StatusInternalServerError)
		return
	}
	defer ws.Close()

	notifications.AddClient(ws)
	defer notifications.RemoveClient(ws)

	for {
		_, _, err := ws.ReadMessage()
		if err != nil {
			log.Printf("WebSocket read error: %v", err)
			break
		}
	}
}
