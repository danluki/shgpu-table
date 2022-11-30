package admin

import (
	"github.com/go-kit/kit/endpoint"
	grpctransport "github.com/go-kit/kit/transport/grpc"
	"github.com/gorilla/mux"
)

type GrpcServer struct {
	create grpctransport.Handler
	validate grpctransport.Handler
}

func NewGRPCServer(endpoint admin.Endpoints, otTracer stdopentracing.tracing, zipkinTracer *stdzipkin.Tracer, logger log.Logger)

