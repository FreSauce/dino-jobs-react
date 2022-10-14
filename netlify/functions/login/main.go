package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	IsAuth bool   `json:"isAuth"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	Token  string `json:"token"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	p := LoginRequest{}
	err := json.Unmarshal([]byte(request.Body), &p)
	if err != nil {
		fmt.Println(err)
	}

	if !validateRequest(p.Email, p.Password) {
		fmt.Println(p.Email, p.Password)
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Headers: map[string]string{
				"Content-Type":                 "application/json",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Content-Type, Authorization",
			},
			Body: `{"error": "Invalid email or password format"}`,
		}, nil
	}

	client := connect()
	isAuthorized, user := isUserVerified(client, p.Email, p.Password)
	if !isAuthorized {
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Headers: map[string]string{
				"Content-Type":                 "application/json",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Content-Type, Authorization",
			},
			Body: `{"error": "Email and password does not match or user is not verified"}`,
		}, nil
	}
	token, _ := generateToken(user)
	resp := LoginResponse{
		IsAuth: true,
		Email:  user.Email,
		Role:   user.Role,
		Token:  token,
	}
	responseText, _ := json.Marshal(resp)
	defer disconnect(client)
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Content-Type, Authorization",
		},
		Body:            string(responseText),
		IsBase64Encoded: false,
	}, nil
}

func main() {
	lambda.Start(handler)
}
