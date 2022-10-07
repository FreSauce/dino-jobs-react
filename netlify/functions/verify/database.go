package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"regexp"

	"github.com/aws/aws-lambda-go/events"
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

func verifyUserEmail(email string) {
	client := connect()
	userCollection := client.Database("dinojobs").Collection("users")
	userCollection.UpdateOne(context.TODO(), bson.M{"email": email}, bson.M{"$set": bson.M{"email_verified": true}})
	defer disconnect(client)
}

func validateRequest(req SignUpRequest) bool {
	emailMatch := regexp.MustCompile(`^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$`).MatchString(req.Email)
	passwordMatch := regexp.MustCompile(`^[a-zA-Z0-9]+$`).MatchString(req.Password) && len(req.Password) >= 8
	return emailMatch && passwordMatch
}

func handlers(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	p := SignUpRequest{}
	json.Unmarshal([]byte(request.Body), &p)

	if !validateRequest(p) {
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Body:       "Invalid email or password",
		}, nil
	}

	client := connect()
	user := fetchUser(client, p.Email)
	if user.Email != "" {
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Body:       "Email already exists",
		}, nil
	}
	user, token := createUser(client, p)
	isAuth, email, role, err := verifyToken(token)
	fmt.Println(isAuth, email, role, err)
	SendMail(user, token)
	defer disconnect(client)
	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "text/plain"},
		Body:            "Added user successfully",
		IsBase64Encoded: false,
	}, nil
}
