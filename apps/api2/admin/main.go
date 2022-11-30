package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/config"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/repositories/admins"
	admin "github.com/danilluk1/shgpu-table/apps/api2/admin/pkg"
	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/metrics"
	"github.com/go-kit/kit/metrics/prometheus"
	stdopentracing "github.com/opentracing/opentracing-go"
	zipkinot "github.com/openzipkin-contrib/zipkin-go-opentracing"
	zipkin "github.com/openzipkin/zipkin-go"
	zipkinhttp "github.com/openzipkin/zipkin-go/reporter/http"
	stdprometheus "github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"

	// "github.com/danilluk1/shgpu-table/apps/api2/admin/internal/repositories/admins"
	// admin "github.com/danilluk1/shgpu-table/apps/api2/admin/pkg"
	// "github.com/go-kit/log"
	"go.uber.org/zap"
)

func main() {
	fmt.Println("HOST -", config.GetHost())
	fmt.Println("PORT -", config.GetPort())
	fmt.Println("USER -", config.GetUser())
	fmt.Println("PASS -", config.GetPass())
	fmt.Println("DBNAME -", config.GetDbName())
	fmt.Println("ENV -", config.GetEnv())

	var logger *zap.Logger

	if config.GetEnv() == "development" {
		l, _ := zap.NewDevelopment()
		logger = l
	} else {
		l, _ := zap.NewProduction()
		logger = l
	}

	gormDB, err := db.NewByConfig(config.GetPostgresConfig())

	if err != nil {
		logger.Fatal("Can't connect to database")
	}
	gormDB.AutoMigrate(&models.Admin{})

	if err != nil {
		// log.
	}

	var logger2 log.Logger
	{
		logger2 = log.NewLogfmtLogger(os.Stderr)
	}
	zipkinURL := fs.String("zipkin-url", "", "Enable Zipkin tracing via HTTP reporter URL e.g. http://localhost:9411/api/v2/spans")
	var zipkinTracer *zipkin.Tracer
	{
		if *zipkinURL != "" {
			var (
				err         error
				hostPort    = "localhost:80"
				serviceName = "adminSvc"
				reporter    = zipkinhttp.NewReporter(*zipkinURL)
			)
			defer reporter.Close()
			zEP, _ := zipkin.NewEndpoint(serviceName, hostPort)
			zipkinTracer, err = zipkin.NewTracer(reporter, zipkin.WithLocalEndpoint(zEP))
			if err != nil {
				logger2.Log("err", err)
				os.Exit(1)
			}
		}
	}

	var tracer stdopentracing.Tracer
	{
		if zipkinTracer != nil {
			logger2.Log("tracer", "Zipkin", "type", "OpenTracing", "URL", *zipkinURL)
			tracer = zipkinot.Wrap(zipkinTracer)
			zipkinTracer = nil
		} else {
			tracer = stdopentracing.GlobalTracer()
		}
	}

	var ints, chars metrics.Counter
	{
		ints = prometheus.NewCounterFrom(stdprometheus.CounterOpts{
			Namespace: "admin",
			Subsystem: "adminService",
			Name:      "admin service",
			Help:      "The number of requests to the admin service.",
		}, []string{})
	}
	var duration metrics.Histogram
	{
		duration = prometheus.NewSummaryFrom(stdprometheus.SummaryOpts{
			Namespace: "admin",
			Subsystem: "adminService",
			Name:      "request_duration_seconds",
			Help:      "The duration of a request to the admin service.",
		}, []string{"method", "success"})
	}
	http.DefaultServeMux.Handle("/metrics", promhttp.Handler())

	adminRepository := admins.NewRepository(gormDB)
	service := admin.NewAdminService(adminRepository)
	endpoints := admin.NewEndpoints(service, logger2, duration, tracer, zipkinTracer)
	grpcServer := admin.NewGRPCServer(endpoints, tracer, zipkinTracer, logger2)
	grpcListener, err :=

		// var logger2 log.Logger
		// logger2 = log.NewLogfmtLogger(os.Stderr)
		// logger2 = log.With(logger2, "listen", "8081", "caller", log.DefaultCaller)

		// //Maybe change pacakge to admin
		// adminRepository := admins.NewRepository(gormDB)
		// svc := admin.NewLoggingMiddleware(logger2, admin.NewAdminService(adminRepository))
		// adminServer := admin.NewHttpServer(svc)
		// http.ListenAndServe(":8080", adminServer)
		fmt.Println("Admin has been started successfully 😊.")
}
