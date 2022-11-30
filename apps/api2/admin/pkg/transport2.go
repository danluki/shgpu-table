package admin

import (
	"github.com/go-kit/kit/endpoint"
	"github.com/go-kit/kit/tracing/zipkin"
	"github.com/go-kit/kit/transport"
	grpctransport "github.com/go-kit/kit/transport/grpc"
	"github.com/gorilla/mux"
)

type grpcServer struct {
	create grpctransport.Handler
	//validate grpctransport.Handler
}

func NewGRPCServer(endpoints Endpoints, otTracer stdopentracing.tracing, zipkinTracer *stdzipkin.Tracer, logger log.Logger) {
	options := []grpctransport.ServerOption{
		grpctransport.ServerErrorHandler(transport.NewLogErrorHandler(logger))
	}

	if zipkinTracer != nil {
		options = append(options, zipkin.GRPCServerTrace(zipkinTracer))
	}

	return &grpcServer {
		create: grpctransport.NewServer(
			endpoints.CreateEndpoint,
			decodeGRPCCreateRequest,
			encodeGRPCCreateRequest,
			append(options, grpctransport.ServerBefore(opentracing.GRPCToContext(otTracer, "Create", logger)))...,
		),
	}
}

