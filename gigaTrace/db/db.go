package db

import (
	"database/sql"
	"fmt"
	"gigaTrace/models"
	"log"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "gigatrace_demo" //gigaTrace //gigatrace_demo
)

var DB *sql.DB

func Connect() error {
	if "pg" == "pq" {
		return nil
	}
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlconn)
	if err != nil {
		log.Println(err)
		return err
	}

	// close database
	// defer db.Close()

	// check db
	err = db.Ping()
	if err != nil {
		log.Println(err)
		return err
	}

	DB = db

	log.Println("Connected!")
	return nil
}

func AddLog(l models.Log, TS_FMT string) error {
	insertLog := `INSERT INTO log(FROM_NO, TO_NO, TS, DURATION, C1_ID, C2_ID, TYPE, IMEI, IMSI, ROAMING, LAST_UPDATE) VALUES ($1, $2, TO_TIMESTAMP($3,'` + TS_FMT + `'), $4, $5, $6, $7, $8, $9, $10, $11) ;`
	insertLogStmt, err := DB.Prepare(insertLog)

	if err != nil {
		log.Println(err)
		return err
	}

	_, err = insertLogStmt.Exec(l.FROM_NO, l.TO_NO, l.TS, l.DURATION, l.C1_ID, l.C2_ID, l.TYPE, l.IMEI, l.IMSI, l.ROAMING, l.LAST_UPDATE)
	if err != nil {
		log.Println(err)
		log.Println(l)
		return err
	}
	// log.Println("Added - ", l.FROM_NO)
	return nil
}

func AddTower(t models.Tower) error {
	insertTower := `INSERT INTO tower(TOWER_ID, LATITUDE, LONGITUDE, LAT_LANG, LOCATION, RADIUS) VALUES ($1, $2, $3, $4, $5, $6) ;`
	insertTowerStmt, err := DB.Prepare(insertTower)
	if err != nil {
		log.Println(err)
		return err
	}
	_, err = insertTowerStmt.Exec(t.TOWER_ID, t.LATITUDE, t.LONGITUDE, t.LAT_LANG, t.LOCATION, t.RADIUS)
	if err != nil {
		log.Println(err)
		return err
	}
	return nil
}
