package main

import (
	"ToDoProject/user-service/config"
	"ToDoProject/user-service/database"
	"ToDoProject/user-service/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	database.ConnectDatabase()

	r := gin.Default()

	// Подключаем маршруты из routes.SetupRoutes
	routes.SetupRoutes(r)

	// Дополнительный тестовый маршрут (опционально)
	r.GET("/user", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "User service is working!",
		})
	})

	r.Run("localhost:8080") // Порт для микросервиса User
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
