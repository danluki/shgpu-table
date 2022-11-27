package endpoints

import (
	"context"

	admin "github.com/danilluk1/shgpu-table/apps/api2/admin/pkg"
	"github.com/go-kit/kit/endpoint"
)

func makeCreateAdminEndpoint(svc admin.Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		v, err := svc.Create(ctx, req.Name, req.Pass)
		if err != nil {
			return CreateResponse{v.Name, v.Pass, v.RefreshToken, v.AccessToken, v.Id, err.Error()}, nil
		}
		//TODO: Change to something simplier
		return CreateResponse{"", "", "", "", 0, err.Error()}, nil
	}
}
