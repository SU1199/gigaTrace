package routes

import (
	"encoding/json"
	"gtServer/db"
	"gtServer/truecaller"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ByLocation(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	locations := params["location"]
	// locations := strings.Split(locations_[0], "~")
	ts_from := params["ts_from"]
	ts_to := params["ts_to"]

	dbOut := db.ByLocationJoin(locations, ts_from[0], ts_to[0])

	b, err := json.Marshal(dbOut)
	if err != nil {
		log.Panicln(err)
		ctx.JSON(http.StatusBadRequest, err)
	}
	ctx.JSON(http.StatusOK, b)
}

func ByNumber(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	num := params["number"][0]
	// locations := strings.Split(locations_[0], "~")
	ts_from := params["ts_from"][0]
	ts_to := params["ts_to"][0]

	dbOut := db.ByNumber(num, ts_from, ts_to)

	b, err := json.Marshal(dbOut)
	if err != nil {
		log.Panicln(err)
		ctx.JSON(http.StatusBadRequest, err)
	}
	ctx.JSON(http.StatusOK, b)
}

func ByImei(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	num := params["imei"][0]
	// locations := strings.Split(locations_[0], "~")
	ts_from := params["ts_from"][0]
	ts_to := params["ts_to"][0]

	dbOut := db.ByImei(num, ts_from, ts_to)

	b, err := json.Marshal(dbOut)
	if err != nil {
		log.Panicln(err)
		ctx.JSON(http.StatusBadRequest, err)
	}
	ctx.JSON(http.StatusOK, b)
}

func MostContacted(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	num := params["number"][0]
	// locations := strings.Split(locations_[0], "~")
	ts_from := params["ts_from"][0]
	ts_to := params["ts_to"][0]

	dbOut := db.MostContacted(num, ts_from, ts_to)

	b, err := json.Marshal(dbOut)
	if err != nil {
		log.Panicln(err)
		ctx.JSON(http.StatusBadRequest, err)
	}
	ctx.JSON(http.StatusOK, b)
}

func CommonContacted(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	nums := params["number"]
	// locations := strings.Split(locations_[0], "~")
	ts_from := params["ts_from"][0]
	ts_to := params["ts_to"][0]

	dbOut := db.CommonContacted(nums, ts_from, ts_to)

	b, err := json.Marshal(dbOut)
	if err != nil {
		log.Panicln(err)
		ctx.JSON(http.StatusBadRequest, err)
	}
	ctx.JSON(http.StatusOK, b)
}

func International(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	num := params["number"][0]
	// locations := strings.Split(locations_[0], "~")
	ts_from := params["ts_from"][0]
	ts_to := params["ts_to"][0]

	dbOut := db.International(num, ts_from, ts_to)

	b, err := json.Marshal(dbOut)
	if err != nil {
		log.Panicln(err)
		ctx.JSON(http.StatusBadRequest, err)
	}
	ctx.JSON(http.StatusOK, b)
}

func ContactGraph(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	num := params["number"][0]
	// locations := strings.Split(locations_[0], "~")
	depth := params["depth"][0]
	x, err := strconv.Atoi(depth)
	dbOut := db.ContactGraph(num, x)

	if err != nil {
		log.Panicln(err)
		ctx.JSON(http.StatusBadRequest, err)
	}
	ctx.JSON(http.StatusOK, gin.H{"out": dbOut})
}

func Raw(ctx *gin.Context) {

}

func Qs(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	num := params["number"][0]
	log.Println(num)
	searchRes := truecaller.Search(num)
	// log.Println(searchRes)
	ctx.JSON(http.StatusOK, gin.H{"out": searchRes})
}

func Socs(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	num := params["number"][0]
	log.Println(num)
	searchRes := truecaller.SocSearch(num)
	// log.Println(searchRes)
	ctx.JSON(http.StatusOK, gin.H{"out": searchRes})
}

func Sms(ctx *gin.Context) {
	params := ctx.Request.URL.Query()
	num := params["number"][0]
	// locations := strings.Split(locations_[0], "~")
	ts_from := params["ts_from"][0]
	ts_to := params["ts_to"][0]

	dbOut := db.Sms(num, ts_from, ts_to)

	b, err := json.Marshal(dbOut)
	if err != nil {
		log.Panicln(err)
		ctx.JSON(http.StatusBadRequest, err)
	}
	ctx.JSON(http.StatusOK, b)
}
