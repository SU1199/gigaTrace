package models

import "time"

var DefaultMappingLog = map[string]int{"FROM_NO": 0, "TO_NO": 1, "DATE": 2, "TIME": 3, "DURATION": 4, "C1_ID": 5, "C2_ID": 6, "TYPE": 7, "IMEI": 8, "IMSI": 9, "ROAMING": 10}

var DefaultMappingTower = map[string]int{"TOWER_ID": 0, "LATITUDE": 2, "LONGITUDE": 3, "LAT_LANG": 4, "LOCATION": 1, "RADIUS": 5}

type Log struct {
	FROM_NO     string
	TO_NO       string
	TS          string
	DURATION    float64
	C1_ID       string
	C2_ID       string
	TYPE        string
	IMEI        string
	IMSI        string
	ROAMING     string
	LAST_UPDATE time.Time
}

type Tower struct {
	TOWER_ID  string
	LATITUDE  float64
	LONGITUDE float64
	LAT_LANG  string
	LOCATION  string
	RADIUS    float64
}

type Payload struct {
	FileLoc   string
	Fields    []string
	LenFields int
}
