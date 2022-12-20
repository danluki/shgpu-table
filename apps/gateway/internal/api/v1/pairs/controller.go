package pairs

import (
	"bufio"
	"fmt"
	"regexp"
	"time"

	lp "github.com/LdDl/fiber-long-poll/v2"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
	"github.com/valyala/fasthttp"
)

func Setup(router fiber.Router, services types.Services) {
	middleware := router.Group("pairs")
	middleware.Get("/notify", g)
	middleware.Get("", get(services))
}

func get(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		dto := &PairsQueryDto{}
		err := middlewares.ValidateQuery(
			c,
			services.Validator,
			dto,
		)
		if err != nil {
			return err
		}

		if len(dto.BeginDate) > 0 || len(dto.EndDate) > 0 {
			re := regexp.MustCompile(`\d{4}-\d{2}-\d{2}`)
			if re.MatchString(dto.BeginDate) && re.MatchString(dto.EndDate) {
				return fiber.NewError(fiber.ErrBadRequest.Code, "Please, check the dates format")
			}

		}

		if dto.DaysCount >= 0 && dto.DaysOffset >= 0 {

		}
		return nil
	}
}

func g(c *fiber.Ctx) error {
	c.Set("Content-TYpe", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("Transfer-Encoding", "chunked")

	c.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(w *bufio.Writer) {
		for {
			msg := fmt.Sprintf("the time is %v", time.Now())
			fmt.Fprintf(w, "data: Message: %s\n\n", msg)
			fmt.Printf(msg)

			err := w.Flush()
			if err != nil {
				fmt.Printf("Error while flushing: %v. Closing http connection. \n", err)

				break
			}
			time.Sleep(2 * time.Second)
		}
	}))

	return nil
}

func OnNewTableCB(services types.Services, data string) {
	services.LongpollManager.Publish("tables", data)
}
func getLpMessages(manager *lp.LongpollManager) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		ctx.Context().PostArgs().Set("timeout", "3600")
		ctx.Context().PostArgs().Set("category", "tables")
		//ctx.Context().PostArgs().Set("category", "tables.new")
		//ctx.Context().PostArgs().Set("category", "tables.update")

		return manager.SubscriptionHandler(ctx)
	}
}
