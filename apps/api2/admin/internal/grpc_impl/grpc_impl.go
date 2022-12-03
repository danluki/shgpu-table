package grpc_impl

import (
	"context"
	"errors"
	"log"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/jwt"
	adminGrpc "github.com/danilluk1/shgpu-table/libs/grpc/generated"
	"github.com/omeid/pgerror"
	"golang.org/x/crypto/bcrypt"
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

func (s *adminGrpcServer) Create(
	ctx context.Context, data *adminGrpc.CreateRequest,
) (*adminGrpc.CreateResponse, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(data.Pass), 10)
	if err != nil {
		return nil, errors.New("bcrypt error")
	}

	dbAdmin := &models.Admin{
		Name:     data.Name,
		Password: string(hash),
	}

	if err := s.db.WithContext(ctx).Create(dbAdmin).Error; err != nil {
		if e := pgerror.UniqueViolation(err); e != nil {
			return nil, errors.New("admin already exists")
		}
		return nil, err
	}

	token, err := jwt.CreateToken(dbAdmin.Id)
	if err != nil {
		log.Fatal("Can't create token for admin")
	}

	err = s.db.WithContext(ctx).
		Model(&dbAdmin).
		Where("id =?", dbAdmin.Id).
		Update("refresh_token", token.RefreshToken.Token).
		Error

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
	var dbAdmin models.Admin

	err := s.db.WithContext(ctx).First(&dbAdmin, "name = ?", data.Name).Error
	if err != nil {
		return nil, errors.New("admin not found")
	}

	err = bcrypt.CompareHashAndPassword([]byte(dbAdmin.Password), []byte(data.Pass))

	if err != nil {
		return nil, errors.New("password is incorrect")
	}

	token, err := jwt.CreateToken(dbAdmin.Id)
	if err != nil {
		log.Fatal("Can't create token for admin")
	}

	err = s.db.WithContext(ctx).
		Model(&dbAdmin).
		Where("id =?", dbAdmin.Id).
		Update("refresh_token", token.RefreshToken.Token).
		Error

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

func (s *adminGrpcServer) Refresh(
	ctx context.Context, data *adminGrpc.RefreshRequest) (*adminGrpc.RefreshResponse, error) {
	payload, err := jwt.DecodeRefreshToken(data.RefreshToken)
	if err != nil {
		return &adminGrpc.RefreshResponse{}, err
	}

	var dbAdmin models.Admin
	err = s.db.WithContext(ctx).First(&dbAdmin, "id =?", payload.Id).Error

	if err != nil {
		return &adminGrpc.RefreshResponse{}, errors.New("token is valid, but we can't find info about admin in database")
	}

	if dbAdmin.RefreshToken != data.RefreshToken {
		return &adminGrpc.RefreshResponse{}, errors.New("given token is not equals to known in database")
	}

	token, err := jwt.CreateToken(dbAdmin.Id)
	if err != nil {
		log.Fatal("Can't create token for admin")
	}

	err = s.db.WithContext(ctx).
		Model(&dbAdmin).
		Where("id =?", dbAdmin.Id).
		Update("refresh_token", token.RefreshToken.Token).
		Error

	if err != nil {
		return &adminGrpc.RefreshResponse{}, err
	}

	return &adminGrpc.RefreshResponse{
		AccessToken:  token.AccessToken.Token,
		RefreshToken: token.RefreshToken.Token,
	}, nil
}

func (s *adminGrpcServer) Logout(ctx context.Context, data *adminGrpc.LogoutRequest) (*adminGrpc.LogoutResponse, error) {
	payload, err := jwt.DecodeRefreshToken(data.RefreshToken)
	if err != nil {
		return nil, err
	}

	var dbAdmin models.Admin

	err = s.db.WithContext(ctx).
		Model(&dbAdmin).
		Where("id =?", payload.Id).
		Update("refresh_token", "").
		Error

	if err != nil {
		return nil, err
	}

	return &adminGrpc.LogoutResponse{}, nil
}

func (s *adminGrpcServer) AddAdvertisingMessage(ctx context.Context, data *adminGrpc)