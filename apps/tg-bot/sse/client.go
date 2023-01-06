package sse

import (
	"io"
	"net/http"
)

type Client struct {
}

func (*Client) Subscribe(url string, callback func(msg string)) error {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return err
	}
	req.Header.Set("Cache-Control", "no-cache")
	req.Header.Set("Accept", "text/event-stream")
	req.Header.Set("Connection", "keep-alive")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			return err
		}
		bodyString := string(bodyBytes)
		callback(bodyString)
	}

	return nil
}
