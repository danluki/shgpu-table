package grpc_impl

import (
	adminGrpc "github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"gorm.io/gorm"
)

type adminGrpcServer struct {
	adminGrpc.UnimplementedAdminServer

	db *gorm.DB
}

type GrpcImplOpts struct {
	Db *gorm.DB
}

func NewServer(options *GrpcImplOpts) *adminGrpcServer {
	return &adminGrpcServer{
		db: options.Db,
	}
}
