package main

import (
	data "analysis/internal/engine"
	"analysis/internal/notifications"
	"analysis/internal/process"
	"analysis/internal/server"
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.temporal.io/sdk/client"
)

func main() {
	// 初始化数据库
	data.InitDB()

	// 初始化通知系统
	notifications.InitNotifier()

	// 初始化工作流引擎
	go process.InitWorkflowEngine()

	// 创建 HTTP 服务器
	router := gin.Default()
	server.SetupRoutes(router)

	// 添加测试接口
	router.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Test endpoint is working!"})
	})

	// Define a simple health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	// 启动 HTTP 服务器
	go func() {
		if err := router.Run(":8080"); err != nil {
			log.Fatalf("Failed to run server: %v", err)
		}
	}()

	// 创建 Temporal 客户端
	c, err := client.Dial(client.Options{})
	if err != nil {
		log.Fatalf("Failed to create Temporal client: %v", err)
	}
	defer c.Close()

	// 启动工作流
	options := client.StartWorkflowOptions{
		ID:        "sample_workflow",
		TaskQueue: "example-task-queue",
	}
	we, err := c.ExecuteWorkflow(context.Background(), options, process.SampleWorkflow)
	if err != nil {
		log.Fatalf("Failed to start workflow: %v", err)
	}

	// 打印工作流 ID 和运行 ID
	log.Printf("Started workflow: WorkflowID: %s, RunID: %s", we.GetID(), we.GetRunID())

	// 保持主程序运行
	select {}
}
