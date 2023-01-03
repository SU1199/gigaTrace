package parser

import (
	"gigaTrace/db"
	"gigaTrace/models"
	"log"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/xuri/excelize/v2"
)

func ParseLogs(loc string, mappings map[string]int, TS_FMT string) error {
	f, err := excelize.OpenFile(loc)
	if err != nil {
		log.Println(err)
		return err
	}
	defer func() {
		if err := f.Close(); err != nil {
			log.Println(err)
		}
	}()
	wks := f.GetSheetName(0)
	rows, err := f.GetRows(wks)
	if err != nil {
		log.Println(err)
		return err
	}
	for i, row := range rows {
		if i == 0 {
			continue
		}
		log_ := new(models.Log)

		if FROM_NO, ok := mappings["FROM_NO"]; ok {
			log_.FROM_NO = numFmt(row[FROM_NO])
		}

		if TO_NO, ok := mappings["TO_NO"]; ok {
			log_.TO_NO = numFmt(row[TO_NO])
		}

		TS := ``
		if DATE, ok := mappings["DATE"]; ok {
			TS += row[DATE]
		} else {
			TS += "  /  /  "
		}
		if TIME, ok := mappings["TIME"]; ok {
			TS += " " + row[TIME]
		} else {
			TS += " " + "  :     "
		}
		log_.TS = TS

		if DURATION, ok := mappings["DURATION"]; ok {
			dur, _ := strconv.ParseFloat(row[DURATION], 64)
			log_.DURATION = dur
		}

		if C1_ID, ok := mappings["C1_ID"]; ok {
			log_.C1_ID = row[C1_ID]
		}
		if C2_ID, ok := mappings["C2_ID"]; ok {
			log_.C2_ID = row[C2_ID]
		}
		if TYPE, ok := mappings["TYPE"]; ok {
			log_.TYPE = row[TYPE]
		}

		if IMEI, ok := mappings["IMEI"]; ok {
			log_.IMEI = row[IMEI]
		}

		if IMSI, ok := mappings["IMSI"]; ok {
			log_.IMSI = row[IMSI]
		}

		if ROAMING, ok := mappings["ROAMING"]; ok {
			log_.ROAMING = row[ROAMING]
		}

		log_.LAST_UPDATE = time.Now()

		db.AddLog(*log_, TS_FMT)
		// log.Println(log_)
	}
	return nil
}

func ParseTowers(loc string, mappings map[string]int) error {
	f, err := excelize.OpenFile(loc)
	if err != nil {
		log.Println(err)
		return err
	}
	defer func() {
		if err := f.Close(); err != nil {
			log.Println(err)
		}
	}()
	wks := f.GetSheetName(0)
	rows, err := f.GetRows(wks)
	if err != nil {
		log.Println(err)
		return err
	}
	for i, row := range rows {
		if i == 0 {
			continue
		}

		tower := new(models.Tower)

		if TOWER_ID, ok := mappings["TOWER_ID"]; ok {
			tower.TOWER_ID = row[TOWER_ID]
		}

		if LAT_LNG, ok := mappings["LAT_LNG"]; ok {
			lat_lng := strings.Split(row[LAT_LNG], ", ")
			latF, _ := strconv.ParseFloat(lat_lng[0], 64)
			lngF, _ := strconv.ParseFloat(lat_lng[1], 64)
			tower.LATITUDE = latF
			tower.LONGITUDE = lngF
			tower.LAT_LANG = row[LAT_LNG]
		}

		if LOCATION, ok := mappings["LOCATION"]; ok {
			tower.LOCATION = row[LOCATION]
		}

		if RADIUS, ok := mappings["RADIUS"]; ok {
			rad, _ := strconv.ParseFloat(row[RADIUS], 64)
			tower.RADIUS = rad
		}

		// log.Println(tower)
		db.AddTower(*tower)
	}
	return nil
}

func numFmt(inp string) string {
	op := regexp.MustCompile("[0-9]+")
	sl := op.FindAllString(inp, -1)
	joined := strings.Join(sl, "")
	if len(joined) < 10 {
		return inp
	}
	return joined[len(joined)-10:]
}
