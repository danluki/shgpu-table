package grpc_impl

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	adminGrpc "github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"github.com/lib/pq"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func (s *adminGrpcServer) GetAdvertisingMessages(
	ctx context.Context,
	data *adminGrpc.GetAdvertisingMessagesRequest,
) (*adminGrpc.GetAdvertisingMessagesResponse, error) {
	var dbAdvs []models.Advertising
	err := s.db.WithContext(ctx).Find(&dbAdvs, "admin_id=?", data.AdminId).Error
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

func (s *adminGrpcServer) AddAdvertisingMessage(
	ctx context.Context,
	data *adminGrpc.AddAdvertisingMessageRequest,
) (*adminGrpc.AddAdvertisingMessageResponse, error) {
	var dbAdmin models.Admin
	err := s.db.WithContext(ctx).First(&dbAdmin, "id=?", data.AdminId).Error
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

	err = s.db.WithContext(ctx).Create(&advertising).Error
	if err != nil {
		return &adminGrpc.AddAdvertisingMessageResponse{}, err
	}

	return &adminGrpc.AddAdvertisingMessageResponse{
		Id: uint32(advertising.Id),
	}, nil
}

func (s *adminGrpcServer) RemoveAdvertisingMessage(
	ctx context.Context,
	data *adminGrpc.RemoveAdvertisingMessageRequest,
) (*adminGrpc.RemoveAdvertisingMessageResponse, error) {
	var advertising models.Advertising
	err := s.db.WithContext(ctx).
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

func (s *adminGrpcServer) ChangeAdvertisingMessage(
	ctx context.Context,
	data *adminGrpc.ChangeAdvertisingMessageRequest,
) (*adminGrpc.ChangeAdvertisingMessageResponse, error) {
	var advertising models.Advertising
	err := s.db.Where(`id=?`, data.AdvertisingId).First(&advertising).Error
	if err != nil && err == gorm.ErrRecordNotFound {
		return nil, status.Error(codes.NotFound, "can't find advertising with given id")
	}

	err = s.db.Where("id=?", data.AdvertisingId).Updates(&models.Advertising{
		Faculties:  pq.Int32Array(data.Faculties),
		Text:       data.Text,
		SendDate:   data.SendDate.AsTime(),
		TotalCount: uint(data.TotalCount),
	}).Error

	if err != nil {
		return &adminGrpc.ChangeAdvertisingMessageResponse{}, err
	}

	return &adminGrpc.ChangeAdvertisingMessageResponse{
		AdvertisingId: uint32(advertising.Id),
		Faculties:     advertising.Faculties,
		Text:          advertising.Text,
		SendDate:      timestamppb.New(advertising.SendDate),
		TotalCount:    int32(advertising.TotalCount),
	}, nil
}
