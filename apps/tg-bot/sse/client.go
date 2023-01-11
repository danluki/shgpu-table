package sse

import (
	"fmt"
	"io"
	"net/http"
)

func Subscribe(url string, messages chan<- string) {
	defer close(messages)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		panic(err)
	}
	req.Header.Set("Cache-Control", "no-cache")
	req.Header.Set("Accept", "text/event-stream")
	req.Header.Set("Connection", "keep-alive")
	req.Header.Set("Transfer-Encoding", "chunked")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		/*
			// 		Here, we need to get all subscibers from database, end send them a message,
			// 		that our notify system is broken
			// 	*/
		panic(err)
	}
	// for {
	defer resp.Body.Close()
	data, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Received message: \n%s\n", string(data))
	bodyString := string(data)
	messages <- bodyString
	// }
	// client := &http.Client{}
	// resp, err := client.Do(req)
	// if err != nil {
	// 	panic(err)
	// }
	// defer resp.Body.Close()
	// if resp.StatusCode == http.StatusOK {
	// 	bodyBytes, err := io.ReadAll(resp.Body)
	// 	if err != nil {
	// 		panic(err)
	// 	}
	// 	bodyString := string(bodyBytes)
	// 	messages <- bodyString
	// }
}
