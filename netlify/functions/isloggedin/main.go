package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type LoginResponse struct {
	IsAuth bool   `json:"isAuth"`
	Email  string `json:"email"`
	Role   string `json:"role"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	fmt.Println(request.Headers)
	token := request.Headers["authorization"]
	isAuth, email, role, err := verifyToken(token)
	fmt.Println(token)
	if !isAuth || err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Headers:    map[string]string{"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"},
			Body:       "Unauthorized user",
		}, nil
	}

	resp := LoginResponse{
		IsAuth: true,
		Email:  email,
		Role:   role,
	}
	responseText, _ := json.Marshal(resp)
	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
		Body:            string(responseText),
		IsBase64Encoded: false,
	}, nil
}

func main() {
	lambda.Start(handler)
}
