package models

import "gorm.io/gorm"

type DataModel struct {
    gorm.Model
    Field1 string
    Field2 string
    Field3 int
}