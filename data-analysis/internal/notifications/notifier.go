package notifications

import (
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

var Clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)
var mutex sync.Mutex // Use a mutex to protect access to the Clients map

type Message struct {
	Type string `json:"type"`
	Body string `json:"body"`
}

func InitNotifier() {
	go handleMessages()
}

func handleMessages() {
	for {
		msg := <-broadcast
		mutex.Lock()
		for client := range Clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("WebSocket error: %v", err)
				client.Close()
				delete(Clients, client)
			}
		}
		mutex.Unlock()
	}
}

func Notify(msg Message) {
	broadcast <- msg
}

func AddClient(client *websocket.Conn) {
	mutex.Lock()
	Clients[client] = true
	mutex.Unlock()
}

func RemoveClient(client *websocket.Conn) {
	mutex.Lock()
	delete(Clients, client)
	mutex.Unlock()
}
