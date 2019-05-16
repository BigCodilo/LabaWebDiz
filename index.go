package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"

	"./models"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/index", IndexHandler).Methods("GET")
	r.HandleFunc("/add", AddHandler).Methods("POST")

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./")))

	http.Handle("/", r)
	http.ListenAndServe(":1111", nil)
}

//IndexHandler qwerty
func IndexHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("index.html")
	tmpl.ExecuteTemplate(w, "index", nil)
}

func AddHandler(w http.ResponseWriter, r *http.Request) {
	knife := models.Knife{}
	json.Unmarshal([]byte(r.FormValue("sendedData")), &knife)
	fmt.Println(knife)
	w.Write([]byte("5"))
}
