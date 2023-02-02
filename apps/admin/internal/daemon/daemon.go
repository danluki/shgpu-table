package daemon

import (
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	"github.com/danilluk1/shgpu-table/libs/pubsub"
	"github.com/go-co-op/gocron"
	"gorm.io/gorm"
	"log"
	"time"
)

type Daemon struct {
	scheduler *gocron.Scheduler
	db        *gorm.DB
	ps        *pubsub.PubSub
}

func New() *Daemon {
	return &Daemon{
		scheduler: gocron.NewScheduler(time.Local),
	}
}

func (daemon *Daemon) Start() error {
	_, err := daemon.scheduler.Every(5).Minutes().Do(daemon.Job)
	if err != nil {
		return err
	}
}

func (daemon *Daemon) Job() {
	var advertisings []models.Advertising
	err := daemon.db.
		Find(&advertisings, "is_sent=false AND send_date").Error
	if err != nil {
		log.Println(err)
		return
	}

	daemon.ps.Publish("advertisings")
}
