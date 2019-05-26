package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"lab4/models"
	"net/http"

	"github.com/gorilla/mux"
)

var db models.DB

func main() {
	db = models.DB{}
	db.Open()
	r := mux.NewRouter()
	r.HandleFunc("/index", IndexHandler).Methods("GET")
	r.HandleFunc("/add", AddHandler).Methods("POST")
	r.HandleFunc("/knife/{id}", KnifeHandler).Methods("GET")

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
	//r.PathPrefix("/static").Handler(http.FileServer(http.Dir("./static")))

	http.Handle("/", r)
	http.ListenAndServe(":1234", nil)
	db.Close()
}

//IndexHandler qwerty
func IndexHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("index.html")
	tmpl.ExecuteTemplate(w, "index", nil)
}

func AddHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Here")
	knife := models.Knife{}
	json.Unmarshal([]byte(r.FormValue("sendedData")), &knife)
	ID := db.AddKnife(knife)
	w.Write([]byte(ID))
}

func KnifeHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	ID := vars["id"]
	knife := db.GetKnife(ID)
	if knife == nil {
		w.Write([]byte("Uncorrct ID"))
		return
	}
	tmpl, _ := template.ParseFiles("eachKnife.html")
	tmpl.ExecuteTemplate(w, "knife", knife)
}
