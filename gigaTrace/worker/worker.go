package worker

import (
	"gigaTrace/parser"
	"log"
	"os"
	"path/filepath"
)

var TS_FMT = "MM/DD/YYYY HH:MI PM"

func bot(id int, jobs <-chan string, results chan<- int) {
	for file := range jobs {
		log.Println("worker ", id, " started file ", file)
		parser.ParseLogs(file, models.DefaultMapping, TS_FMT)
		results <- 1
	}
}

func Supervisor(root string) {

	var files []string

	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		files = append(files, path)
		return nil
	})
	files = files[1:]
	if err != nil {
		panic(err)
	}
	for _, file := range files {
		log.Println(file)
	}

	jobs := make(chan string, len(files))
	results := make(chan int, len(files))
	num := len(files)

	for w := 1; w <= num; w++ {
		go bot(w, jobs, results)
	}
	//add to jobs channel
	for _, j := range files {
		jobs <- j
	}
	close(jobs)

	//listen to result channel
	for a := 1; a <= len(files); a++ {
		<-results
	}
}
