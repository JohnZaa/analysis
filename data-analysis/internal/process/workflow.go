package process

import (
	"context"
	"log"
	"time"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
	"go.temporal.io/sdk/workflow"
)

// 定义活动
func SampleActivity(ctx context.Context) (string, error) {
	return "Hello from Activity!", nil
}

// 定义工作流
func SampleWorkflow(ctx workflow.Context) error {
	// 定义活动选项
	ao := workflow.ActivityOptions{
		StartToCloseTimeout: time.Minute,
	}
	ctx = workflow.WithActivityOptions(ctx, ao)

	// 调用活动
	var result string
	err := workflow.ExecuteActivity(ctx, SampleActivity).Get(ctx, &result)
	if err != nil {
		return err
	}

	// 记录结果
	workflow.GetLogger(ctx).Info("Activity result", "result", result)

	return nil
}

// 初始化工作流引擎
func InitWorkflowEngine() {
	// 创建 Temporal 客户端
	c, err := client.Dial(client.Options{})
	if err != nil {
		log.Fatalf("Failed to create Temporal client: %v", err)
	}
	defer c.Close()

	// 创建工作者
	w := worker.New(c, "example-task-queue", worker.Options{})

	// 注册工作流和活动
	w.RegisterWorkflow(SampleWorkflow)
	w.RegisterActivity(SampleActivity)

	// 启动工作者
	err = w.Start()
	if err != nil {
		log.Fatalf("Failed to start worker: %v", err)
	}

	// 保持工作者运行
	select {}
}
