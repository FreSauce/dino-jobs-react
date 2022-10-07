package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	fmt.Printf(request.QueryStringParameters["token"])
	token := request.QueryStringParameters["token"]

	isAuth, email, role, err := verifyToken(token)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
			Body:       "Invalid token",
		}, nil
	}

	// if isAuth {
	// 	verifyUserEmail(email)
	// }

	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "text/plain"},
		Body:            fmt.Sprintf("Hello, world!"),
		IsBase64Encoded: false,
	}, nil
}

func main() {
	lambda.Start(handler)
}
