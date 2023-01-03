package models

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
	LAST_UPDATE string
	TOWER_ID    string
	LATITUDE    float64
	LONGITUDE   float64
	LAT_LANG    string
	LOCATION    string
	RADIUS      float64
}

type Output struct {
	Log []Log
}

type NearestTower struct {
	DISTANCE float64
	TOWER_ID string
	LOCATION string
}
