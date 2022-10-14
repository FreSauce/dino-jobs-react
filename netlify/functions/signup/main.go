package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type SignUpRequest struct {
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	p := SignUpRequest{}
	json.Unmarshal([]byte(request.Body), &p)

	if !validateRequest(p) {
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Headers:    map[string]string{"Content-Type": "text/plain"},
			Body:       "Invalid email or password",
		}, nil
	}

	client := connect()
	user := fetchUser(client, p.Email)
	if user.Email != "" {
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Headers:    map[string]string{"Content-Type": "text/plain"},
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

func main() {
	lambda.Start(handler)
}
