package admin

import (
	"context"
	"time"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/pkg/dtos"
	"github.com/go-kit/kit/circuitbreaker"
	"github.com/go-kit/kit/endpoint"
	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/metrics"
	"github.com/go-kit/kit/ratelimit"
	"github.com/go-kit/kit/tracing/opentracing"
	"github.com/go-kit/kit/tracing/zipkin"
	stdopentracing "github.com/opentracing/opentracing-go"
	stdzipkin "github.com/openzipkin/zipkin-go"
	"github.com/sony/gobreaker"
	"golang.org/x/time/rate"
)

type Endpoints struct {
	CreateEndpoint   endpoint.Endpoint
	ValidateEndpoint endpoint.Endpoint
}

func NewEndpoints(svc Service, logger log.Logger, duration metrics.Histogram, otTracer stdopentracing.Tracer, zipkinTracer *stdzipkin.Tracer) Endpoints {
	var createEndpoint endpoint.Endpoint
	{
		createEndpoint = MakeCreateEndpoint(svc)
		createEndpoint = ratelimit.NewErroringLimiter(rate.NewLimiter(rate.Every(time.Second), 1))(createEndpoint)
		createEndpoint = circuitbreaker.Gobreaker(gobreaker.NewCircuitBreaker(gobreaker.Settings{}))(createEndpoint)
		createEndpoint = opentracing.TraceServer(otTracer, "Create")(createEndpoint)
		if zipkinTracer != nil {
			createEndpoint = zipkin.TraceEndpoint(zipkinTracer, "Create")(createEndpoint)
		}
		createEndpoint = LoggingMiddleware(log.With(logger, "method", "Create"))(createEndpoint)
		createEndpoint = InstrumentingMiddleware(duration.With("method", "Create"))(createEndpoint)
	}

	return Endpoints{
		CreateEndpoint:   createEndpoint,
		ValidateEndpoint: nil,
	}
}

func (s Endpoints) Create(ctx context.Context, name, pass string) (*dtos.AdminDto, error) {
	resp, err := s.CreateEndpoint(ctx, CreateRequest{Name: name, Pass: pass})

	if err != nil {
		return nil, err
	}
	response := resp.(CreateResponse)
	return &dtos.AdminDto{
		Name:         response.Name,
		Pass:         response.Pass,
		RefreshToken: response.RefreshToken,
		AccessToken:  response.AccessToken,
	}, response.Err
}

func MakeCreateEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req := request.(CreateRequest)
		v, err := svc.Create(ctx, req.Name, req.Pass)

		if err != nil {
			return nil, err
		}

		return CreateResponse{v.Name, v.Pass, v.RefreshToken, v.AccessToken, v.Id, ""}, nil
	}
}
