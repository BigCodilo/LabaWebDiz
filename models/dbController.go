package models

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DB struct {
	Client *mongo.Client
}

func (db *DB) Open() {
	var err error
	db.Client, err = mongo.NewClient(options.Client().ApplyURI("mongodb://127.0.0.1:27017"))
	if err != nil {
		log.Fatal(err)
	}
	err = db.Client.Connect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")
}

func (db *DB) AddKnife(knife Knife) string {
	collection := db.Client.Database("webdizlaba").Collection("Knifes")
	insertResult, err := collection.InsertOne(context.Background(), knife)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Now u added a knife")
	ID := insertResult.InsertedID.(primitive.ObjectID)
	return ID.Hex()
}

func (db *DB) GetKnife(ID string) *Knife {
	fmt.Println("Pidar:", ID)
	id, err := primitive.ObjectIDFromHex(ID)
	collection := db.Client.Database("webdizlaba").Collection("Knifes")
	knife := Knife{}
	filter := bson.D{{"_id", id}}
	collection.FindOne(context.Background(), filter).Decode(&knife)
	if err != nil {
		log.Println(err)
		return nil
	}
	return &knife
}

func (db *DB) Close() {
	err := db.Client.Disconnect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connection to MongoDB is closed")
}
