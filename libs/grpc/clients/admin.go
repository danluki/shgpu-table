package clients

import (
	"github.com/danilluk1/shgpu-table/libs/grpc/servers"
	"log"

	"github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewAdmin(env string) admin.AdminClient {
	conn, err := grpc.Dial(
		createClientAddr(env, "admin", servers.ADMIN_SERVER_PORT),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}

	c := admin.NewAdminClient(conn)

	return c
}
