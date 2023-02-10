package grpc_impl

import (
	"context"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/di"
	"github.com/samber/do"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	adminGrpc "github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"github.com/lib/pq"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func (s *AdminGrpcServer) GetAdvertisingMessage(
	ctx context.Context,
	data *adminGrpc.GetAdvertisingMessageRequest,
) (*adminGrpc.GetAdvertisingMessageResponse, error) {
	db := do.MustInvoke[gorm.DB](di.Provider)

	var adv models.Advertising
	err := db.WithContext(ctx).Where(
		models.Advertising{
			Id:      uint(data.Id),
			AdminId: uint(data.AdminId),
		},
	).First(&adv).Error

	if err != nil {
		return nil, status.Error(codes.Internal, "Can't get advertising messages")
	}

	return &adminGrpc.GetAdvertisingMessageResponse{
		Advertising: &adminGrpc.Advertising{
			Id:         uint32(adv.Id),
			Faculties:  adv.Faculties,
			AdminId:    uint32(adv.AdminId),
			Text:       adv.Text,
			TotalCount: uint32(adv.TotalCount),
			SendDate:   timestamppb.New(adv.SendDate),
		},
	}, nil
}

func (s *AdminGrpcServer) GetAdvertisingMessages(
	ctx context.Context,
	data *adminGrpc.GetAdvertisingMessagesRequest,
) (*adminGrpc.GetAdvertisingMessagesResponse, error) {
	db := do.MustInvoke[gorm.DB](di.Provider)

	var dbAdvs []models.Advertising
	err := db.WithContext(ctx).Find(&dbAdvs, "admin_id=?", data.AdminId).Error
	if err != nil {
		return nil, status.Error(codes.Internal, "Can't get advertising messages")
	}

	var advs []*adminGrpc.Advertising
	for _, dba := range dbAdvs {
		advs = append(advs, &adminGrpc.Advertising{
			Id:         uint32(dba.Id),
			Faculties:  dba.Faculties,
			AdminId:    uint32(dba.Admin.Id),
			Text:       dba.Text,
			TotalCount: uint32(dba.TotalCount),
			SendDate:   timestamppb.New(dba.SendDate),
		})
	}
	return &adminGrpc.GetAdvertisingMessagesResponse{
		Advertisings: advs,
	}, nil
}

func (s *AdminGrpcServer) AddAdvertisingMessage(
	ctx context.Context,
	data *adminGrpc.AddAdvertisingMessageRequest,
) (*adminGrpc.AddAdvertisingMessageResponse, error) {
	db := do.MustInvoke[gorm.DB](di.Provider)

	var dbAdmin models.Admin
	err := db.WithContext(ctx).First(&dbAdmin, "id=?", data.AdminId).Error
	if err != nil {
		return &adminGrpc.AddAdvertisingMessageResponse{}, status.Error(
			codes.InvalidArgument,
			"can't find admin with given id",
		)
	}

	advertising := &models.Advertising{
		Faculties:  pq.Int32Array(data.Faculties),
		Admin:      dbAdmin,
		Text:       data.Text,
		SendDate:   data.SendDate.AsTime(),
		TotalCount: uint(data.TotalCount),
	}

	err = db.WithContext(ctx).Create(&advertising).Error
	if err != nil {
		return &adminGrpc.AddAdvertisingMessageResponse{}, err
	}

	return &adminGrpc.AddAdvertisingMessageResponse{
		Id: uint32(advertising.Id),
	}, nil
}

func (s *AdminGrpcServer) RemoveAdvertisingMessage(
	ctx context.Context,
	data *adminGrpc.RemoveAdvertisingMessageRequest,
) (*adminGrpc.RemoveAdvertisingMessageResponse, error) {
	db := do.MustInvoke[gorm.DB](di.Provider)

	var advertising models.Advertising
	err := db.WithContext(ctx).
		Clauses(clause.Returning{}).
		Where("id=?", data.AdvertisingId).
		Delete(&advertising).
		Error

	if uint32(advertising.Id) != data.AdvertisingId {
		return &adminGrpc.RemoveAdvertisingMessageResponse{}, status.Error(
			codes.NotFound,
			"advertising does not exist",
		)
	}

	return &adminGrpc.RemoveAdvertisingMessageResponse{
		RemovedCount: 1,
	}, err
}

func (s *AdminGrpcServer) ChangeAdvertisingMessage(
	ctx context.Context,
	data *adminGrpc.ChangeAdvertisingMessageRequest,
) (*adminGrpc.ChangeAdvertisingMessageResponse, error) {
	db := do.MustInvoke[gorm.DB](di.Provider)

	var advertising models.Advertising
	err := db.Where(`id=?`, data.AdvertisingId).First(&advertising).Error
	if err != nil && err == gorm.ErrRecordNotFound {
		return nil, status.Error(codes.NotFound, "can't find advertising with given id")
	}

	err = db.Where("id=?", data.AdvertisingId).Updates(&models.Advertising{
		Faculties:  pq.Int32Array(data.Faculties),
		Text:       data.Text,
		SendDate:   data.SendDate.AsTime(),
		TotalCount: uint(data.TotalCount),
	}).Error

	if err != nil {
		return &adminGrpc.ChangeAdvertisingMessageResponse{}, err
	}

	return &adminGrpc.ChangeAdvertisingMessageResponse{
		Advertising: &adminGrpc.Advertising{
			Id:         uint32(advertising.Id),
			Faculties:  advertising.Faculties,
			AdminId:    uint32(advertising.AdminId),
			Text:       advertising.Text,
			TotalCount: uint32(advertising.TotalCount),
			SendDate:   timestamppb.New(advertising.SendDate),
		},
	}, nil
}
