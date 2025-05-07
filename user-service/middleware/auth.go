package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET"))

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		requestID := uuid.New().String()
		c.Set("RequestID", requestID)

		authHeader := c.GetHeader("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing or invalid token"})
			logRequest(c, requestID, http.StatusUnauthorized, start)
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")

		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			logRequest(c, requestID, http.StatusUnauthorized, start)
			return
		}

		c.Next()
		logRequest(c, requestID, c.Writer.Status(), start)
	}
}

func logRequest(c *gin.Context, requestID string, status int, start time.Time) {
	duration := time.Since(start).Milliseconds()
	log.Printf("[%s] [RequestID: %s] %s %s - %d - Duration: %dms",
		start.UTC().Format(time.RFC3339),
		requestID,
		c.Request.Method,
		c.Request.URL.Path,
		status,
		duration,
	)
}
