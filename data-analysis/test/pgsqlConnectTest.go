package main

import (
	"database/sql"
	"fmt"
)

func main() {
	// 数据库连接字符串
	connStr := "user=username password=password dbname=mydb sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		fmt.Println("Error connecting to the database:", err)
		return
	}
	// 使用 defer 确保数据库连接在函数退出时关闭
	defer db.Close()

	// 测试数据库连接
	err = db.Ping()
	if err != nil {
		fmt.Println("Error pinging the database:", err)
		return
	}

	fmt.Println("Successfully connected to the database!")
}
