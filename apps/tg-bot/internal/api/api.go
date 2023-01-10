package api

import (
	"net/http"
)

type Pairs struct {
	client *http.Client
}

// func (*Pairs) Init() error {
// 	repository := do.MustInvoke[repository.Repository](di.Provider)
// 	cfg := do.MustInvoke[config.AppConfig](di.Provider)
// 	var sseClient sse.Client
// 	sseClient.Subscribe(fmt.Sprintf("%s/v1/pairs/notify", func(msg string) {

// 	}))
// 	// if err != nil {
// 	// 	tgUsers, err := repository.GetTelegarmSubscirbers(context.Background())
// 	// 	if err != nil {
// 	// 		log.Panic(err)
// 	// 	}
// 	// 	for tgUser := range tgUsers {
// 	// 		tgUser.
// 	// 	}
// 	}
// 	// _, err := http.NewRequest("GET", "http://localhost:3002/v1/pairs/notify", nil)
// 	// if err != nil {
// 	// 	/*
// 	// 		// 		Here, we need to get all subscibers from database, end send them a message,
// 	// 		// 		that our notify system is broken
// 	// 		// 	*/
// 	// }
// 	req.Header.Set("Cache-Control", "no-cache")
// 	req.Header.Set("Accept", "text/event-stream")
// 	req.Header.Set("Connection", "keep-alive")

// 	client := &http.Client{}
// 	resp, err := client.Do(req)
// 	if err != nil {
// 		/*
// 			// 		Here, we need to get all subscibers from database, end send them a message,
// 			// 		that our notify system is broken
// 			// 	*/
// 	}
// 	for {
// 		data := make([]byte, 1024)
// 		_, err := resp.Body.Read(data)
// 		if err != nil {
// 			return err
// 		}

// 		log.Printf("Received message: %s\n", string(data))
// 	}
// 	// err := client.Subscribe("notify", func(msg *sse.Event) {
// 	// 	processNotifyMessage(*msg)
// 	// })
// 	if err != nil {
// 		return err
// 	}
// 	log.Panic("123")
// 	return nil
// }

// func processNotifyMessage() {
// 	processedMessages := do.MustInvoke[chan parser.ProcessedMessage](di.Provider)
// 	log.Println("New message")
// 	processedMessages <- parser.ProcessedMessage{
// 		FacultyId:  0,
// 		TableLink:  "idi nahuy",
// 		WeekBegin:  time.Now(),
// 		WeekEnd:    time.Now(),
// 		IsNew:      false,
// 		IsModified: false,
// 	}
// }
