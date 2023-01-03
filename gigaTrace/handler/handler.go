//Kinda ugly refactor needed

package handler

import (
	"encoding/json"
	"gigaTrace/models"
	"gigaTrace/parser"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"text/template"

	"github.com/xuri/excelize/v2"
)

var TS_FMT = "MM/DD/YYYY HH:MI PM"
var uploadLoc string = "uploads/"
var fileLoc string

// Compile templates on start of the application
var templates = template.Must(template.ParseGlob("static/*.html"))

// Display the named template
func display(w http.ResponseWriter) {
	templates.ExecuteTemplate(w, "upload_.html", nil)
}

func uploadFile(w http.ResponseWriter, r *http.Request) {
	// Maximum upload of 30 MB files
	r.ParseMultipartForm(30 << 20)

	// Get handler for filename, size and headers
	file, handler, err := r.FormFile("myFile")
	if err != nil {
		log.Println("Error Retrieving the File")
		log.Println(err)
		return
	}

	defer file.Close()
	// log.Println("Uploaded File: %+v\n", handler.Filename)
	// log.Println("File Size: %+v\n", handler.Size)
	// log.Println("MIME Header: %+v\n", handler.Header)

	// Create file
	fileLoc = uploadLoc + handler.Filename
	dst, err := os.Create(fileLoc)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer dst.Close()
	// Copy the uploaded file to the created file on the filesystem
	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	log.Println("Successfully Uploaded File")
	payload := new(models.Payload)
	payload.FileLoc = fileLoc
	payload.Fields = getHead(fileLoc)
	payload.LenFields = len(payload.Fields)
	templates.ExecuteTemplate(w, "map.html", payload)
}

func UploadHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		display(w)
	case "POST":
		uploadFile(w, r)
	}
}

func mapFile(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}
	x := map[string]int{}
	json.Unmarshal(reqBody, &x)
	// templates.ExecuteTemplate(w, "tsSelec.html", nil)
	parser.ParseLogs(fileLoc, x, TS_FMT)
}

func MapHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		mapFile(w, r)
	}
}

func getHead(loc string) []string {
	f, err := excelize.OpenFile(loc)
	if err != nil {
		log.Println(err)
	}
	defer func() {
		if err := f.Close(); err != nil {
			log.Println(err)
		}
	}()
	wks := f.GetSheetName(0)
	rows, err := f.Rows(wks)
	if err != nil {
		log.Println(err)
	}
	var head []string
	for rows.Next() {
		head, _ = rows.Columns()
		break
	}
	return head
}
