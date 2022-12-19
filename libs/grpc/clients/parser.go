package clients

import (
	"fmt"
	"log"

	"github.com/danilluk1/shgpu-table/libs/grpc/generated/parser"
	"github.com/danilluk1/shgpu-table/libs/grpc/servers"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewParserClient() parser.ParserClient {
	conn, err := grpc.Dial(
		fmt.Sprintf("localhost:%d", servers.PARSER_SERVER_PORT),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	)
	if err != nil {
		log.Fatalf("Did not connect: %w", err)
	}

	c := parser.NewParserClient(conn)

	return c
}
