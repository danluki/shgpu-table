package grpc_impl

import (
	adminGrpc "github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
)

type AdminGrpcServer struct {
	adminGrpc.UnimplementedAdminServer
}

func NewServer() *AdminGrpcServer {
	return &AdminGrpcServer{}
}
