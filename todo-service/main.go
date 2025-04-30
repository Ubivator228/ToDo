package main

import (
	"ToDoProject/config"
	"ToDoProject/todo-service/routes"
	"ToDoProject/user-service/database"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	database.ConnectDatabase()

	r := gin.Default()
	routes.SetupRoutes(r)

	r.Run(":8080")
}
