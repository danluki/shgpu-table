package admin

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
)

func NewHttpServer(svc Service) *mux.Router {
	options := []httptransport.ServerOption{
		httptransport.ServerErrorEncoder(encodeErrorResponse),
	}

	createAdminHandler := httptransport.NewServer(
		makeCreateAdminEndpoint(svc),
		decodeCreateNewRequest,
		encodeResponse,
		options...,
	)
	router := mux.NewRouter()
	router.Methods("POST").Path("/create").Handler(createAdminHandler)

	return router
}

func decodeCreateNewRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	var request CreateRequest

	fmt.Println(r.Body)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		return nil, err
	}
	return request, nil
}

func encodeErrorResponse(ctx context.Context, err error, w http.ResponseWriter) {
	if err == nil {
		panic("encodeError with nil error")
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}

func encodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	return json.NewEncoder(w).Encode(response)
}
