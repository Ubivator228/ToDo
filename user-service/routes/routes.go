package routes

import (
	"ToDoProject/user-service/controllers"
	"ToDoProject/user-service/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())
	{
		auth.GET("/me", controllers.GetCurrentUser)
	}
}
