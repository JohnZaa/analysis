package collectors

import (
	db "analysis/internal/engine"
	"analysis/internal/engine/models"
	"encoding/json"
	"log"
	"net/http"
)

func CollectDataFromAPI(url string) ([]models.DataModel, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data []models.DataModel
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}

	return data, nil
}

func SaveCollectedData(data []models.DataModel) {
	for _, d := range data {
		if err := db.DB.Create(&d).Error; err != nil {
			log.Printf("Failed to save data: %v", err)
		}
	}
}
