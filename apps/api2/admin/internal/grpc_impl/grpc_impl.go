package grpc_impl

import (
	"context"
	"errors"
	"log"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/jwt"
	adminGrpc "github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"github.com/lib/pq"
	"github.com/omeid/pgerror"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
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

func (s *adminGrpcServer) Logout(
	ctx context.Context,
	data *adminGrpc.LogoutRequest,
) (*adminGrpc.LogoutResponse, error) {
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

func (s *adminGrpcServer) AddAdvertisingMessage(
	ctx context.Context,
	data *adminGrpc.AddAdvertisingMessageRequest,
) (*adminGrpc.AddAdvertisingMessageResponse, error) {
	var dbAdmin models.Admin
	err := s.db.WithContext(ctx).First(&dbAdmin, "id=?", data.AdminId).Error
	if err != nil {
		return &adminGrpc.AddAdvertisingMessageResponse{}, status.Error(codes.InvalidArgument, "can't find admin with given id");
	}

	advertising := &models.Advertising{
		Faculties:  pq.Int32Array(data.Faculties),
		Admin:      dbAdmin,
		Text:       data.Text,
		SendDate:   data.SendDate.AsTime(),
		TotalCount: uint(*data.TotalCount),
	}

	err = s.db.WithContext(ctx).Create(&advertising).Error
	if err != nil {
		return &adminGrpc.AddAdvertisingMessageResponse{}, err
	}

	return &adminGrpc.AddAdvertisingMessageResponse{
		Id: int32(advertising.Id),
	}, nil
}

func (s *adminGrpcServer) RemoveAdvertisingMessage(
	ctx context.Context,
	data *adminGrpc.RemoveAdvertisingMessageRequest,
) (*adminGrpc.RemoveAdvertisingMessageResponse, error) {
	var advertising models.Advertising
	err := s.db.WithContext(ctx).Clauses(clause.Returning{}).Where("id=?", data.AdvertisingId).Delete(&advertising).Error;
	
	if int32(advertising.Id) != data.AdvertisingId {
		return &adminGrpc.RemoveAdvertisingMessageResponse{}, status.Error(codes.NotFound, "advertising does not exist")
	}
	
	return &adminGrpc.RemoveAdvertisingMessageResponse{
		RemovedCount: 1,
	}, err
}

func (s *adminGrpcServer) ChangeAdvertisingMessage(ctx context.Context, data *adminGrpc.ChangeAdvertisingMessageRequest) (*adminGrpc.ChangeAdvertisingMessageResponse, error) {
	var advertising models.Advertising
	err := s.db.WithContext(ctx).First("id=?", data.AdvertisingId).Error
	s.db.WithContext(ctx).Model(&advertising).Updates({})
}