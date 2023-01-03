package db

import (
	"database/sql"
	"fmt"
	"gtServer/models"
	"log"
	"strconv"
	"strings"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "gigaTrace" //gigaTrace //gigatrace_demo
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

func GetClosest(locationSlice []string) []string {
	query := "SELECT * FROM nearestTower($1, $2) limit 1;"
	var out []string
	for _, loc := range locationSlice {
		lat_lng := strings.Split(loc, ", ")
		latF, _ := strconv.ParseFloat(lat_lng[0], 64)
		lngF, _ := strconv.ParseFloat(lat_lng[1], 64)
		closestTower := new(models.NearestTower)
		err := DB.QueryRow(query, latF, lngF).Scan(&closestTower.TOWER_ID, &closestTower.LOCATION, &closestTower.DISTANCE)
		if err != nil {
			log.Println(err)
		}
		out = append(out, closestTower.TOWER_ID)
	}
	return out
}

func ByLocation(locationSlice []string, ts_from string, ts_to string) []models.Log {
	towerIds := GetClosest(locationSlice)
	fmt.Println(towerIds)
	query := `select * from log join tower on log.c1_id=tower.tower_id where from_no in(`
	for i, tower := range towerIds {
		var nq string
		if i == len(towerIds)-1 {
			nq = fmt.Sprintf(`select from_no from log where C1_ID='%s' `, tower)
		} else {
			nq = fmt.Sprintf(`select from_no from log where C1_ID='%s' INTERSECT `, tower)
		}
		query += nq
	}
	eq := fmt.Sprintf(`)and (log.ts > '%s' and log.ts< '%s') limit 100;`, ts_from, ts_to)
	query += eq

	fmt.Println(query)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()
	var res []models.Log
	for rows.Next() {
		l := new(models.Log)
		err := rows.Scan(&l.FROM_NO, &l.TO_NO, &l.TS, &l.DURATION, &l.C1_ID, &l.C2_ID, &l.TYPE, &l.IMEI, &l.IMSI, &l.ROAMING, &l.LAST_UPDATE, &l.TOWER_ID, &l.LATITUDE, &l.LONGITUDE, &l.LAT_LANG, &l.LOCATION, &l.RADIUS)
		if err != nil {
			log.Println(err)
		}
		res = append(res, *l)
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}
	return res
}

func ByLocationJoin(locationSlice []string, ts_from string, ts_to string) []models.Log {
	towerIds := GetClosest(locationSlice)
	fmt.Println(towerIds)
	query := `select * from log join tower on log.c1_id=tower.tower_id where from_no in(`
	for i, tower := range towerIds {
		var nq string
		if len(towerIds) == 1 {
			nq = fmt.Sprintf(`select log.from_no from log where C1_ID = '%s') and`, tower)
		} else if i == len(towerIds)-1 {
			nq = fmt.Sprintf(`(select log.from_no from log where C1_ID='%s') %s ON %s.from_no=%s.from_no) and `, tower, "x"+strconv.Itoa(i), "x0", "x"+strconv.Itoa(i))
		} else if i == 0 {
			nq = fmt.Sprintf(`select x0.from_no from (select log.from_no from log where C1_ID='%s') x0 INNER JOIN `, tower)
		} else {
			nq = fmt.Sprintf(`(select log.from_no from log where C1_ID='%s') %s ON %s.from_no=%s.from_no INNER JOIN`, tower, "x"+strconv.Itoa(i), "x0", "x"+strconv.Itoa(i))
		}
		query += nq
	}
	eq := fmt.Sprintf(`(log.ts > '%s' and log.ts< '%s') limit 100;`, ts_from, ts_to)
	query += eq

	fmt.Println(query)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()
	var res []models.Log
	for rows.Next() {
		l := new(models.Log)
		err := rows.Scan(&l.FROM_NO, &l.TO_NO, &l.TS, &l.DURATION, &l.C1_ID, &l.C2_ID, &l.TYPE, &l.IMEI, &l.IMSI, &l.ROAMING, &l.LAST_UPDATE, &l.TOWER_ID, &l.LATITUDE, &l.LONGITUDE, &l.LAT_LANG, &l.LOCATION, &l.RADIUS)
		if err != nil {
			log.Println(err)
		}
		res = append(res, *l)
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}
	return res
}

func ByNumber(num string, ts_from string, ts_to string) []models.Log {
	query := fmt.Sprintf(`select * from log join tower on log.c1_id=tower.tower_id where log.from_no='%s' and (log.ts > '%s' and log.ts< '%s') order by log.ts asc;`, num, ts_from, ts_to)

	fmt.Println(query)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()
	var res []models.Log
	for rows.Next() {
		l := new(models.Log)
		err := rows.Scan(&l.FROM_NO, &l.TO_NO, &l.TS, &l.DURATION, &l.C1_ID, &l.C2_ID, &l.TYPE, &l.IMEI, &l.IMSI, &l.ROAMING, &l.LAST_UPDATE, &l.TOWER_ID, &l.LATITUDE, &l.LONGITUDE, &l.LAT_LANG, &l.LOCATION, &l.RADIUS)
		if err != nil {
			log.Println(err)
		}
		res = append(res, *l)
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}
	return res
}

func ByImei(num string, ts_from string, ts_to string) []models.Log {
	query := fmt.Sprintf(`select * from log join tower on log.c1_id=tower.tower_id where log.imei='%s' and (log.ts > '%s' and log.ts< '%s') order by log.ts asc;`, num, ts_from, ts_to)

	fmt.Println(query)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()
	var res []models.Log
	for rows.Next() {
		l := new(models.Log)
		err := rows.Scan(&l.FROM_NO, &l.TO_NO, &l.TS, &l.DURATION, &l.C1_ID, &l.C2_ID, &l.TYPE, &l.IMEI, &l.IMSI, &l.ROAMING, &l.LAST_UPDATE, &l.TOWER_ID, &l.LATITUDE, &l.LONGITUDE, &l.LAT_LANG, &l.LOCATION, &l.RADIUS)
		if err != nil {
			log.Println(err)
		}
		res = append(res, *l)
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}
	return res
}

func MostContacted(num string, ts_from string, ts_to string) []models.Log {
	query := fmt.Sprintf(`select log.to_no,count(log.to_no) as freq from log where log.from_no ='%s' and (log.ts > '%s' and log.ts< '%s')  group by (log.to_no) order by freq desc;`, num, ts_from, ts_to)

	fmt.Println(query)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()
	var res []models.Log
	for rows.Next() {
		l := new(models.Log)
		err := rows.Scan(&l.TO_NO, &l.TYPE)
		if err != nil {
			log.Println(err)
		}
		res = append(res, *l)
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}
	return res
}

func Sms(num string, ts_from string, ts_to string) []models.Log {
	query := fmt.Sprintf(`select * from log join tower on log.c1_id=tower.tower_id where log.from_no !~ '^[0-9\.]+$' and to_no='%s' and (log.ts > '%s' and log.ts< '%s');`, num, ts_from, ts_to)

	fmt.Println(query)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()
	var res []models.Log
	for rows.Next() {
		l := new(models.Log)
		err := rows.Scan(&l.FROM_NO, &l.TO_NO, &l.TS, &l.DURATION, &l.C1_ID, &l.C2_ID, &l.TYPE, &l.IMEI, &l.IMSI, &l.ROAMING, &l.LAST_UPDATE, &l.TOWER_ID, &l.LATITUDE, &l.LONGITUDE, &l.LAT_LANG, &l.LOCATION, &l.RADIUS)
		if err != nil {
			log.Println(err)
		}
		res = append(res, *l)
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}
	return res
}

func International(num string, ts_from string, ts_to string) []models.Log {
	query := fmt.Sprintf(`select * from log join tower on log.c1_id=tower.tower_id where left(log.imsi,3)='%s' and (log.ts > '%s' and log.ts< '%s');`, num, ts_from, ts_to)

	fmt.Println(query)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()
	var res []models.Log
	for rows.Next() {
		l := new(models.Log)
		err := rows.Scan(&l.FROM_NO, &l.TO_NO, &l.TS, &l.DURATION, &l.C1_ID, &l.C2_ID, &l.TYPE, &l.IMEI, &l.IMSI, &l.ROAMING, &l.LAST_UPDATE, &l.TOWER_ID, &l.LATITUDE, &l.LONGITUDE, &l.LAT_LANG, &l.LOCATION, &l.RADIUS)
		if err != nil {
			log.Println(err)
		}
		res = append(res, *l)
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}
	return res
}

func CommonContacted(nums []string, ts_from string, ts_to string) []models.Log {
	query := ``
	for i, num := range nums {
		var nq string
		if i == len(nums)-1 {
			nq = fmt.Sprintf(`select log.to_no from log where log.from_no='%s'`, num)
		} else {
			nq = fmt.Sprintf(`select log.to_no from log where log.from_no='%s' INTERSECT `, num)
		}
		query += nq
	}

	fmt.Println(query)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()
	var res []models.Log
	for rows.Next() {
		l := new(models.Log)
		err := rows.Scan(&l.TO_NO)
		if err != nil {
			log.Println(err)
		}
		res = append(res, *l)
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}
	return res

}

func findNos(s string) ([]string, string) {
	var res []string
	query := fmt.Sprintf(`select to_no from log where log.from_no='%s' group by to_no`, s)

	// fmt.Println(query)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()

	for rows.Next() {
		var n string
		err := rows.Scan(&n)
		if err != nil {
			log.Println(err)
		}
		res = append(res, n)
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}
	outStr := s + "--> "
	if len(res) > 0 {
		for _, n := range res {
			outStr = outStr + n + " "
		}
		fmt.Println(outStr)
	}
	return res, outStr
}

func ContactGraph(num string, depth int) string {
	var q []string
	v := make(map[string]bool)
	q = append(q, num)
	fout := ""
	for len(q) > 0 {
		if v[q[0]] {
			q = q[1:]
		} else {
			arr, st := findNos(q[0])
			q = append(q, arr...)
			if st != "" {
				fout = fout + st + "\n"
			}
			v[q[0]] = true
		}

	}
	// log.Print(fout)
	return fout
}

func Raw(query string) string {
	return ""

}
