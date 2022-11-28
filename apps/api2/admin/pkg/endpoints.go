package admin

import (
	"context"

	"github.com/go-kit/kit/endpoint"
)

func makeCreateAdminEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		v, err := svc.Create(ctx, req.Name, req.Pass)

		if err == nil{
			return CreateResponse{v.Name, v.Pass, v.RefreshToken, v.AccessToken, v.Id, ""}, nil
		}
		//TODO: Change to something simplier
			return CreateResponse{"", "", "", "", 0, err.Error()}, nil
	}
}
