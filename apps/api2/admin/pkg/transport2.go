package Admin

import (
	amqptransport "github.com/go-kit/kit/transport/amqp"
	"github.com/gorilla/mux"
)

func NewAmqpTransporter(svc Service) *mux.Router {
	options := []amqptransport.ServerOption{
		
	}
	router := mux.NewRouter()

}
