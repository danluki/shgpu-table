package ws

import (
	"github.com/gorilla/websocket"
)

func Listen(url string, messages chan<- string) {
	c, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		panic(err)
	}
	defer c.Close()

	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			panic(err)
		}
		messages <- string(message)
	}
}
