package main

import (
	"ToDoProject/user-service/config"
	"ToDoProject/user-service/database"
	"ToDoProject/user-service/models"
	"ToDoProject/user-service/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
)

func main() {
	config.LoadEnv()
	database.ConnectDatabase()

	err := database.DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("AutoMigrate failed: %v", err)
	}

	router := gin.Default()

	// CORS Configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept"},
		ExposeHeaders:    []string{"Content-Length", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Handle OPTIONS requests
	router.OPTIONS("/*any", func(c *gin.Context) {
		c.AbortWithStatus(http.StatusNoContent)
	})

	// Setup routes
	routes.SetupRoutes(router)

	// Start server
	router.Run(":8081")
}
