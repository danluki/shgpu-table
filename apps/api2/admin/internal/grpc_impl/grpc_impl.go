package grpc_impl

import (
	"context"
	"errors"
	"log"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/jwt"
	admin "github.com/danilluk1/shgpu-table/apps/api2/admin/internal/repositories/admins"
	adminGrpc "github.com/danilluk1/shgpu-table/libs/grpc/generated"
	"golang.org/x/crypto/bcrypt"
)

type adminGrpcServer struct {
	adminGrpc.UnimplementedAdminServer

	repository admin.Repository
}

type GrpcImplOpts struct {
	Repository admin.Repository
}

func NewServer(options *GrpcImplOpts) *adminGrpcServer {
	return &adminGrpcServer{
		repository: options.Repository,
	}
}

func (s *adminGrpcServer) Create(
	ctx context.Context, data *adminGrpc.CreateRequest,
) (*adminGrpc.CreateResponse, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(data.Pass), 10)
	if err != nil {
		return nil, errors.New("bcrypt error")
	}

	dbAdmin, err := s.repository.AddNew(ctx, string(hash), data.Name)
	if err != nil {
		return nil, err
	}

	token, err := jwt.CreateToken(dbAdmin.Id)
	if err != nil {
		log.Fatal("Can't create token for admin")
	}

	err = s.repository.SetRefreshToken(ctx, dbAdmin.Id, *token)
	if err != nil {
		return nil, err
	}

	return &adminGrpc.CreateResponse{
		RefreshToken: token.RefreshToken.Token,
		AccessToken:  token.AccessToken.Token,
		Id:           uint32(dbAdmin.Id),
		Pass:         dbAdmin.Password,
		Name:         dbAdmin.Name,
	}, nil
}

func (s *adminGrpcServer) Validate(
	ctx context.Context, data *adminGrpc.ValidateRequest) (*adminGrpc.ValidateResponse, error) {
	dbAdmin := s.repository.GetAdmin(ctx, data.Name)
	if dbAdmin == nil {
		return nil, errors.New("admin is not found")
	}

	err := bcrypt.CompareHashAndPassword([]byte(dbAdmin.Password), []byte(data.Pass))

	if err != nil {
		return nil, errors.New("password is incorrect")
	}

	token, err := jwt.CreateToken(dbAdmin.Id)
	if err != nil {
		log.Fatal("Can't create token for admin")
	}

	err = s.repository.SetRefreshToken(ctx, dbAdmin.Id, *token)
	if err != nil {
		return nil, err
	}

	return &adminGrpc.ValidateResponse{
		Name:         dbAdmin.Name,
		Id:           uint32(dbAdmin.Id),
		RefreshToken: token.RefreshToken.Token,
		AccessToken:  token.AccessToken.Token,
	}, nil
}
