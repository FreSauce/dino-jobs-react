package main

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	FullName      string `bson:"full_name"`
	Email         string `bson:"email"`
	EmailVerified bool   `bson:"email_verified"`
	Password      string `bson:"password"`
	Role          string `bson:"role"`
}

type SignUpRequest struct {
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func connect() *mongo.Client {
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	return client
}

func disconnect(client *mongo.Client) {
	client.Disconnect(context.TODO())
}

func fetchUser(client *mongo.Client, email string) User {
	userCollection := client.Database("dinojobs").Collection("users")
	var user User
	userCollection.FindOne(context.TODO(), bson.M{"email": email}).Decode(&user)
	return user
}

func createUser(client *mongo.Client, data SignUpRequest) (User, string) {
	userCollection := client.Database("dinojobs").Collection("users")
	user := User{
		FullName:      data.FullName,
		Email:         data.Email,
		EmailVerified: false,
		Password:      HashPassword(data.Password),
		Role:          "user",
	}
	userToken, _ := generateToken(user)
	_, err := userCollection.InsertOne(context.TODO(), user)
	if err != nil {
		panic(err)
	}
	return user, userToken
}
