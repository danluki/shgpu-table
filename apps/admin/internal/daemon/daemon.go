package daemon

import (
	"encoding/json"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	"github.com/danilluk1/shgpu-table/libs/pubsub"
	"github.com/go-co-op/gocron"
	"gorm.io/gorm"
	"log"
	"time"
)

type advertisingDto struct {
	Faculties []uint8   `json:"faculties"`
	Text      string    `json:"text"`
	SendTime  time.Time `json:"sendTime"`
}

type Daemon struct {
	scheduler *gocron.Scheduler
	db        *gorm.DB
	ps        *pubsub.PubSub
}

func New(db *gorm.DB, ps *pubsub.PubSub) *Daemon {
	return &Daemon{
		scheduler: gocron.NewScheduler(time.Local),
		db:        db,
		ps:        ps,
	}
}

func (daemon *Daemon) Start() {
	_, err := daemon.scheduler.Every(5).Minutes().Do(daemon.Job)
	if err != nil {
		panic(err)
	}

	daemon.scheduler.StartBlocking()
}

func (daemon *Daemon) Job() {
	loc, _ := time.LoadLocation("Asia/Yekaterinburg")
	now := time.Now().In(loc)

	var advertisings []models.Advertising
	err := daemon.db.
		Find(&advertisings, "is_sent=false AND send_date < $1", now).Error
	if err != nil {
		log.Println(err)
		return
	}
	for _, advertising := range advertisings {
		var faculties []uint8
		for _, fac := range advertising.Faculties {
			faculties = append(faculties, uint8(fac))
		}
		marshalledAdv, err := json.Marshal(advertisingDto{
			Faculties: faculties,
			Text:      advertising.Text,
			SendTime:  advertising.SendDate,
		})
		if err != nil {
			log.Println(err)
		}
		daemon.ps.Publish("advertisings", string(marshalledAdv))
	}
}
