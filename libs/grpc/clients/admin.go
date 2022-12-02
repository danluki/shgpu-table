package clients

import (
	"log"

	"github.com/danilluk1/shgpu-table/libs/grpc/generated"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewAdmin() admin.AdminClient {
	conn, err := grpc.Dial(
		"localhost:50051", 
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	)

	if err != nil {
    log.Fatalf("Did not connect: %v", err)
  }

	c := admin.NewAdminClient(conn)

	return c
}
