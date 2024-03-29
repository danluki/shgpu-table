// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.12
// source: parser.proto

package parser

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ParserClient is the client API for Parser service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ParserClient interface {
	ProcessTable(ctx context.Context, in *ProcessTableRequest, opts ...grpc.CallOption) (*ProcessTableResponse, error)
	GetGroup(ctx context.Context, in *GetGroupRequest, opts ...grpc.CallOption) (*GetGroupResponse, error)
	GetFaculties(ctx context.Context, in *GetFacultiesRequest, opts ...grpc.CallOption) (*GetFacultiesResponse, error)
	GetPairsByDays(ctx context.Context, in *GetPairsByDaysRequest, opts ...grpc.CallOption) (*GetPairsResponse, error)
	GetPairsByDates(ctx context.Context, in *GetPairsByDatesRequest, opts ...grpc.CallOption) (*GetPairsResponse, error)
	GetPairsByLectuer(ctx context.Context, in *GetPairsByLectuerRequest, opts ...grpc.CallOption) (*GetPairsByLectuerResponse, error)
}

type parserClient struct {
	cc grpc.ClientConnInterface
}

func NewParserClient(cc grpc.ClientConnInterface) ParserClient {
	return &parserClient{cc}
}

func (c *parserClient) ProcessTable(ctx context.Context, in *ProcessTableRequest, opts ...grpc.CallOption) (*ProcessTableResponse, error) {
	out := new(ProcessTableResponse)
	err := c.cc.Invoke(ctx, "/parser.Parser/processTable", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *parserClient) GetGroup(ctx context.Context, in *GetGroupRequest, opts ...grpc.CallOption) (*GetGroupResponse, error) {
	out := new(GetGroupResponse)
	err := c.cc.Invoke(ctx, "/parser.Parser/getGroup", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *parserClient) GetFaculties(ctx context.Context, in *GetFacultiesRequest, opts ...grpc.CallOption) (*GetFacultiesResponse, error) {
	out := new(GetFacultiesResponse)
	err := c.cc.Invoke(ctx, "/parser.Parser/getFaculties", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *parserClient) GetPairsByDays(ctx context.Context, in *GetPairsByDaysRequest, opts ...grpc.CallOption) (*GetPairsResponse, error) {
	out := new(GetPairsResponse)
	err := c.cc.Invoke(ctx, "/parser.Parser/getPairsByDays", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *parserClient) GetPairsByDates(ctx context.Context, in *GetPairsByDatesRequest, opts ...grpc.CallOption) (*GetPairsResponse, error) {
	out := new(GetPairsResponse)
	err := c.cc.Invoke(ctx, "/parser.Parser/getPairsByDates", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *parserClient) GetPairsByLectuer(ctx context.Context, in *GetPairsByLectuerRequest, opts ...grpc.CallOption) (*GetPairsByLectuerResponse, error) {
	out := new(GetPairsByLectuerResponse)
	err := c.cc.Invoke(ctx, "/parser.Parser/getPairsByLectuer", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ParserServer is the server API for Parser service.
// All implementations must embed UnimplementedParserServer
// for forward compatibility
type ParserServer interface {
	ProcessTable(context.Context, *ProcessTableRequest) (*ProcessTableResponse, error)
	GetGroup(context.Context, *GetGroupRequest) (*GetGroupResponse, error)
	GetFaculties(context.Context, *GetFacultiesRequest) (*GetFacultiesResponse, error)
	GetPairsByDays(context.Context, *GetPairsByDaysRequest) (*GetPairsResponse, error)
	GetPairsByDates(context.Context, *GetPairsByDatesRequest) (*GetPairsResponse, error)
	GetPairsByLectuer(context.Context, *GetPairsByLectuerRequest) (*GetPairsByLectuerResponse, error)
	mustEmbedUnimplementedParserServer()
}

// UnimplementedParserServer must be embedded to have forward compatible implementations.
type UnimplementedParserServer struct {
}

func (UnimplementedParserServer) ProcessTable(context.Context, *ProcessTableRequest) (*ProcessTableResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ProcessTable not implemented")
}
func (UnimplementedParserServer) GetGroup(context.Context, *GetGroupRequest) (*GetGroupResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetGroup not implemented")
}
func (UnimplementedParserServer) GetFaculties(context.Context, *GetFacultiesRequest) (*GetFacultiesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetFaculties not implemented")
}
func (UnimplementedParserServer) GetPairsByDays(context.Context, *GetPairsByDaysRequest) (*GetPairsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetPairsByDays not implemented")
}
func (UnimplementedParserServer) GetPairsByDates(context.Context, *GetPairsByDatesRequest) (*GetPairsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetPairsByDates not implemented")
}
func (UnimplementedParserServer) GetPairsByLectuer(context.Context, *GetPairsByLectuerRequest) (*GetPairsByLectuerResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetPairsByLectuer not implemented")
}
func (UnimplementedParserServer) mustEmbedUnimplementedParserServer() {}

// UnsafeParserServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ParserServer will
// result in compilation errors.
type UnsafeParserServer interface {
	mustEmbedUnimplementedParserServer()
}

func RegisterParserServer(s grpc.ServiceRegistrar, srv ParserServer) {
	s.RegisterService(&Parser_ServiceDesc, srv)
}

func _Parser_ProcessTable_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ProcessTableRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ParserServer).ProcessTable(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/parser.Parser/processTable",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ParserServer).ProcessTable(ctx, req.(*ProcessTableRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Parser_GetGroup_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetGroupRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ParserServer).GetGroup(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/parser.Parser/getGroup",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ParserServer).GetGroup(ctx, req.(*GetGroupRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Parser_GetFaculties_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetFacultiesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ParserServer).GetFaculties(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/parser.Parser/getFaculties",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ParserServer).GetFaculties(ctx, req.(*GetFacultiesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Parser_GetPairsByDays_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetPairsByDaysRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ParserServer).GetPairsByDays(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/parser.Parser/getPairsByDays",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ParserServer).GetPairsByDays(ctx, req.(*GetPairsByDaysRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Parser_GetPairsByDates_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetPairsByDatesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ParserServer).GetPairsByDates(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/parser.Parser/getPairsByDates",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ParserServer).GetPairsByDates(ctx, req.(*GetPairsByDatesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Parser_GetPairsByLectuer_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetPairsByLectuerRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ParserServer).GetPairsByLectuer(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/parser.Parser/getPairsByLectuer",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ParserServer).GetPairsByLectuer(ctx, req.(*GetPairsByLectuerRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Parser_ServiceDesc is the grpc.ServiceDesc for Parser service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Parser_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "parser.Parser",
	HandlerType: (*ParserServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "processTable",
			Handler:    _Parser_ProcessTable_Handler,
		},
		{
			MethodName: "getGroup",
			Handler:    _Parser_GetGroup_Handler,
		},
		{
			MethodName: "getFaculties",
			Handler:    _Parser_GetFaculties_Handler,
		},
		{
			MethodName: "getPairsByDays",
			Handler:    _Parser_GetPairsByDays_Handler,
		},
		{
			MethodName: "getPairsByDates",
			Handler:    _Parser_GetPairsByDates_Handler,
		},
		{
			MethodName: "getPairsByLectuer",
			Handler:    _Parser_GetPairsByLectuer_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "parser.proto",
}
