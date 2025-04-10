package main

import (
	"ToDoProject/config"
	"ToDoProject/database"
	"ToDoProject/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	database.ConnectDatabase()

	r := gin.Default()
	routes.SetupRoutes(r)

	r.Run(":8080")
}
