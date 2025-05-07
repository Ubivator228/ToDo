package controllers

import (
	"ToDoProject/todo-service/database"
	"ToDoProject/todo-service/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetTodos(c *gin.Context) {
	var todos []models.Todo

	query := database.DB

	if completed := c.Query("completed"); completed != "" {
		if completed == "true" {
			query = query.Where("completed = ?", true)
		} else if completed == "false" {
			query = query.Where("completed = ?", false)
		}
	}

	if due := c.Query("due"); due != "" {
		query = query.Where("due_date = ?", due)
	}

	if search := c.Query("search"); search != "" {
		query = query.Where("title ILIKE ? OR description ILIKE ?", "%"+search+"%", "%"+search+"%")
	}

	if sort := c.Query("sort"); sort == "asc" {
		query = query.Order("created_at ASC")
	} else if sort == "desc" {
		query = query.Order("created_at DESC")
	}

	if err := query.Find(&todos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

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

// Получить конкретный Todo по ID
func GetTodoByID(c *gin.Context) {
	var todo models.Todo
	id := c.Param("id")

	if err := database.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	c.JSON(http.StatusOK, todo)
}

// Поиск по заголовку или описанию
func SearchTodos(c *gin.Context) {
	query := c.Query("query")
	var todos []models.Todo

	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter is required"})
		return
	}

	if err := database.DB.Where("title ILIKE ? OR description ILIKE ?", "%"+query+"%", "%"+query+"%").Find(&todos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Search failed"})
		return
	}

	c.JSON(http.StatusOK, todos)
}

// Сортировка
func SortTodos(c *gin.Context) {
	order := c.DefaultQuery("order", "asc")
	var todos []models.Todo

	if order != "asc" && order != "desc" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid order parameter"})
		return
	}

	if err := database.DB.Order("created_at " + order).Find(&todos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Sorting failed"})
		return
	}

	c.JSON(http.StatusOK, todos)
}

// Пагинация
func PaginateTodos(c *gin.Context) {
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "5")

	var todos []models.Todo
	var count int64

	p, _ := strconv.Atoi(page)
	l, _ := strconv.Atoi(limit)

	offset := (p - 1) * l

	database.DB.Model(&models.Todo{}).Count(&count)

	if err := database.DB.Limit(l).Offset(offset).Find(&todos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Pagination failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"total": count,
		"page":  p,
		"limit": l,
		"data":  todos,
	})
}

// Обновить только title
func UpdateTodoTitle(c *gin.Context) {
	id := c.Param("id")
	var data struct {
		Title string `json:"title"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Model(&models.Todo{}).Where("id = ?", id).Update("title", data.Title).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Update failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Title updated"})
}

// Аналогично — description
func UpdateTodoDescription(c *gin.Context) {
	id := c.Param("id")
	var data struct {
		Description string `json:"description"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Model(&models.Todo{}).Where("id = ?", id).Update("description", data.Description).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Update failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Description updated"})
}

// Обновить due_date
func UpdateTodoDueDate(c *gin.Context) {
	id := c.Param("id")
	var data struct {
		DueDate string `json:"due_date"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Model(&models.Todo{}).Where("id = ?", id).Update("due_date", data.DueDate).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Update failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Due date updated"})
}

// Удалить все задачи
func DeleteAllTodos(c *gin.Context) {
	if err := database.DB.Where("1 = 1").Delete(&models.Todo{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete todos"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "All todos deleted"})
}

// Получить задачи конкретного пользователя
func GetTodosByUserID(c *gin.Context) {
	userID := c.Param("id")
	var todos []models.Todo

	if err := database.DB.Where("user_id = ?", userID).Find(&todos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user's todos"})
		return
	}
	c.JSON(http.StatusOK, todos)
}
