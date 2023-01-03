package main

import (
	"gtServer/db"
	"gtServer/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()
	r := gin.Default()

	r.Static("/site", "./static")

	api := r.Group("/api")
	{
		api.GET("/location", routes.ByLocation)
		api.GET("/number", routes.ByNumber)
		api.GET("/imei", routes.ByImei)
		api.GET("/mc", routes.MostContacted)
		api.GET("/cc", routes.CommonContacted)
		api.GET("/international", routes.International)
		api.GET("/graph", routes.ContactGraph)
		api.GET("/raw", routes.Raw)
		api.GET("/qs", routes.Qs)
		api.GET("/socs", routes.Socs)
		api.GET("/sms", routes.Sms)
	}

	r.Run()
}
