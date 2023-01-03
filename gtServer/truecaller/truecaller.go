package truecaller

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

var sessionToken string = "you-sesh-token-here"

func Search(inp string) string {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := &http.Client{Transport: tr}
	req, err := http.NewRequest("GET", "https://search5-noneu.truecaller.com/v2/search?q="+inp+"&countryCode=IN&type=4&locAddr=&placement=SEARCHRESULTS%2CHISTORY%2CDETAILS&encoding=json", nil)
	if err != nil {
		log.Println(err)

	}
	req.Host = "search5-noneu.truecaller.com"
	req.Header.Set("Authorization", "Bearer "+sessionToken)
	// req.Header.Set("Accept-Encoding", "gzip, deflate")
	req.Header.Set("User-Agent", "Truecaller/11.73.7 (Android;7.1.2)")

	resp, err := client.Do(req)
	if err != nil {
		log.Println(err)

	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	var prettyJSON bytes.Buffer
	error := json.Indent(&prettyJSON, body, "", "\t")
	if error != nil {
		log.Println("JSON parse error: ", error)
	}

	return prettyJSON.String()
}

func SocSearch(inp string) string {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := &http.Client{Transport: tr}

	req, err := http.NewRequest("GET", "https://api.eyecon-app.com/app/getnames.jsp?cli=91"+inp+"&lang=en&is_callerid=true&is_ic=true&cv=vc_416_vn_3.0.416_a&requestApi=okHttp&source=Other", nil)
	if err != nil {
		log.Println(err)
	}
	req.Host = "api.eyecon-app.com"
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")
	req.Header.Set("Accept", "application/json")
	req.Header.Set("E-Auth-V", "e1")
	req.Header.Set("E-Auth", "e-auth-token")
	req.Header.Set("E-Auth-C", "32")
	req.Header.Set("E-Auth-K", "authK-token")
	req.Header.Set("Accept-Charset", "UTF-8")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; charset=utf-8")

	resp, err := client.Do(req)
	if err != nil {
		log.Println(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println(err)
	}
	defer resp.Body.Close()
	outp := string(body) + "\n" + getProfile(inp)
	return outp
}

func getProfile(inp string) string {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := &http.Client{CheckRedirect: func(req *http.Request, via []*http.Request) error {
		return http.ErrUseLastResponse
	}, Transport: tr}

	req, err := http.NewRequest("GET", "https://api.eyecon-app.com/app/pic?cli=91"+inp+"&is_callerid=true&size=big&type=0&cancelfresh=0&cv=vc_416_vn_3.0.416_a", nil)
	if err != nil {
		log.Println(err)
	}
	req.Host = "api.eyecon-app.com"
	req.Header.Set("E-Auth-V", "e1")
	req.Header.Set("E-Auth", "auth-token")
	req.Header.Set("E-Auth-C", "32")
	req.Header.Set("E-Auth-K", "authk-token")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")

	resp, err := client.Do(req)
	if err != nil {
		log.Println(err)
	}
	outp := resp.Header.Get("Location")
	return outp
}
