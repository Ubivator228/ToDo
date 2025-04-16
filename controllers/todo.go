package controllers

import (
	"ToDoProject/database"
	"ToDoProject/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTodos(c *gin.Context) {
	var todos []models.Todo
	database.DB.Find(&todos)
	c.JSON(http.StatusOK, todos)
}

func CreateTodo(c *gin.Context) {
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&todo)
	c.JSON(http.StatusOK, todo)
}

func UpdateTodo(c *gin.Context) {
	var todo models.Todo
	id := c.Param("id")
	if err := database.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Save(&todo)
	c.JSON(http.StatusOK, todo)
}

func DeleteTodo(c *gin.Context) {
	var todo models.Todo
	id := c.Param("id")
	if err := database.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	database.DB.Delete(&todo)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}

func GetCompletedTodos(c *gin.Context) {
	var todos []models.Todo
	database.DB.Where("completed = ?", true).Find(&todos)
	c.JSON(http.StatusOK, todos)
}

func MarkTodoCompleted(c *gin.Context) {
	id := c.Param("id")
	var todo models.Todo
	if err := database.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}
	todo.Completed = true
	database.DB.Save(&todo)
	c.JSON(http.StatusOK, todo)
}

func GetStats(c *gin.Context) {
	var total, completed, active int64
	database.DB.Model(&models.Todo{}).Count(&total)
	database.DB.Model(&models.Todo{}).Where("completed = ?", true).Count(&completed)
	database.DB.Model(&models.Todo{}).Where("completed = ?", false).Count(&active)

	c.JSON(http.StatusOK, gin.H{
		"total":     total,
		"completed": completed,
		"active":    active,
	})

}
