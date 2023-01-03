package main

import (
	"gigaTrace/db"
	"gigaTrace/models"
	"gigaTrace/parser"
)

func main() {
	// Upload route
	db.Connect()
	// fs := http.FileServer(http.Dir("./static"))
	// http.Handle("/", fs)
	// http.HandleFunc("/upload", handler.UploadHandler)
	// http.HandleFunc("/map", handler.MapHandler)
	// //Listen on port 8080
	// http.ListenAndServe(":8081", nil)

	// // worker.Supervisor("dumps/")

	// // log.Println(normalizer.GetHead("towers/towerCodes.xlsx"))
	// parser.ParseTowers("towers/towerCodes.xlsx", models.DefaultMappingTower)
	parser.ParseTowers("hackdata/towerCodes.xlsx", models.DefaultMappingTower)
}
