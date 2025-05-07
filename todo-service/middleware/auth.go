package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/go-resty/resty/v2"
	"net/http"
	"os"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}

		userServiceURL := os.Getenv("USER_SERVICE_URL") // пример: http://localhost:8080

		client := resty.New()
		resp, err := client.R().
			SetHeader("Authorization", authHeader).
			Get(userServiceURL + "/me")

		if err != nil || resp.StatusCode() != http.StatusOK {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		// можно сохранить userID, если хочешь
		// var user map[string]interface{}
		// _ = json.Unmarshal(resp.Body(), &user)
		// c.Set("user", user)

		c.Next()
	}
}
