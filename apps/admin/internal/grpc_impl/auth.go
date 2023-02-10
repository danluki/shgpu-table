package grpc_impl

import (
	"context"
	"errors"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/di"
	"github.com/samber/do"
	"gorm.io/gorm"
	"log"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/jwt"
	adminGrpc "github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"github.com/omeid/pgerror"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (s *AdminGrpcServer) Create(
	ctx context.Context, data *adminGrpc.CreateRequest,
) (*adminGrpc.CreateResponse, error) {
	db := do.MustInvoke[gorm.DB](di.Provider)
	hash, err := bcrypt.GenerateFromPassword([]byte(data.Pass), 10)
	if err != nil {
		return nil, errors.New("bcrypt error")
	}

	dbAdmin := &models.Admin{
		Name:     data.Name,
		Password: string(hash),
	}

	if err := db.WithContext(ctx).Create(dbAdmin).Error; err != nil {
		if e := pgerror.UniqueViolation(err); e != nil {
			return nil, errors.New("admin already exists")
		}
		return nil, err
	}

	token, err := jwt.CreateToken(dbAdmin.Id)
	if err != nil {
		log.Fatal("Can't create token for admin")
	}

	err = db.WithContext(ctx).
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

func (s *AdminGrpcServer) Validate(
	ctx context.Context, data *adminGrpc.ValidateRequest,
) (*adminGrpc.ValidateResponse, error) {
	payload, err := jwt.DecodeAccessToken(data.AccessToken)
	if err != nil {
		return nil, err
	}
	return &adminGrpc.ValidateResponse{
		Id:        uint32(payload.Id),
		ExpiresAt: payload.ExpiresAtRaw,
		IssuedAt:  payload.IssuedAtRaw,
	}, nil
}

func (s *AdminGrpcServer) Login(
	ctx context.Context, data *adminGrpc.LoginRequest) (*adminGrpc.LoginResponse, error) {
	db := do.MustInvoke[gorm.DB](di.Provider)

	var dbAdmin models.Admin

	err := db.WithContext(ctx).First(&dbAdmin, "name = ?", data.Name).Error
	if err != nil {
		return nil, status.Error(codes.NotFound, "admin not found")
	}

	err = bcrypt.CompareHashAndPassword([]byte(dbAdmin.Password), []byte(data.Pass))

	if err != nil {
		return nil, status.Error(codes.PermissionDenied, "password is incorrect")
	}

	token, _ := jwt.CreateToken(dbAdmin.Id)

	err = db.WithContext(ctx).
		Model(&dbAdmin).
		Where("id =?", dbAdmin.Id).
		Update("refresh_token", token.RefreshToken.Token).
		Error

	if err != nil {
		return nil, status.Error(codes.Internal, "Currently can't authorize")
	}

	return &adminGrpc.LoginResponse{
		Name:         dbAdmin.Name,
		Id:           uint32(dbAdmin.Id),
		RefreshToken: token.RefreshToken.Token,
		AccessToken:  token.AccessToken.Token,
	}, nil
}

func (s *AdminGrpcServer) Refresh(
	ctx context.Context, data *adminGrpc.RefreshRequest) (*adminGrpc.RefreshResponse, error) {
	payload, err := jwt.DecodeRefreshToken(data.RefreshToken)
	db := do.MustInvoke[gorm.DB](di.Provider)

	if err != nil {
		return &adminGrpc.RefreshResponse{}, err
	}

	var dbAdmin models.Admin
	err = db.WithContext(ctx).First(&dbAdmin, "id =?", payload.Id).Error

	if err != nil {
		return &adminGrpc.RefreshResponse{}, errors.New(
			"token is valid, but we can't find info about admin in database",
		)
	}

	if dbAdmin.RefreshToken != data.RefreshToken {
		return &adminGrpc.RefreshResponse{}, errors.New(
			"given token is not equals to known in database",
		)
	}

	token, err := jwt.CreateToken(dbAdmin.Id)
	if err != nil {
		log.Fatal("Can't create token for admin")
	}

	err = db.WithContext(ctx).
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

func (s *AdminGrpcServer) Logout(
	ctx context.Context,
	data *adminGrpc.LogoutRequest,
) (*adminGrpc.LogoutResponse, error) {
	db := do.MustInvoke[gorm.DB](di.Provider)
	payload, err := jwt.DecodeRefreshToken(data.RefreshToken)
	if err != nil {
		return nil, err
	}

	var dbAdmin models.Admin

	err = db.WithContext(ctx).
		Model(&dbAdmin).
		Where("id =?", payload.Id).
		Update("refresh_token", "").
		Error

	if err != nil {
		return nil, err
	}

	return &adminGrpc.LogoutResponse{}, nil
}

func (s *AdminGrpcServer) GetAdmin(
	ctx context.Context,
	data *adminGrpc.GetAdminRequest,
) (*adminGrpc.GetAdminResponse, error) {
	db := do.MustInvoke[gorm.DB](di.Provider)

	var dbAdmin models.Admin
	err := db.WithContext(ctx).Find(&dbAdmin, "refresh_token=?", data.RefreshToken).Error

	if err != nil {
		return nil, err
	}

	return &adminGrpc.GetAdminResponse{
		Name: dbAdmin.Name,
		Id:   uint32(dbAdmin.Id),
	}, nil
}
