package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	token := request.QueryStringParameters["token"]
	fmt.Println(token)
	isAuth, email, _, err := verifyToken(token)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Headers:    map[string]string{"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"},
			Body:       "Error verifying token",
		}, nil
	}

	client := connect()
	if isAuth {
		updateEmailVerified(client, email)
		return &events.APIGatewayProxyResponse{
			StatusCode: 200,
			Headers:    map[string]string{"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"},
			Body:       fmt.Sprintf("Email verified for %s", email),
		}, nil
	}
	defer disconnect(client)
	return &events.APIGatewayProxyResponse{
		StatusCode: 401,
		Headers:    map[string]string{"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"},
		Body:       "Unauthorized Access",
	}, nil
}

func main() {
	lambda.Start(handler)
}
