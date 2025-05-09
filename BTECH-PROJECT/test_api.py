import requests
import json

# Base URL of your backend
BASE_URL = 'http://localhost:5000'

# 1. Check if API is running
try:
    health_response = requests.get(f'{BASE_URL}/api/health')
    print(" Health check:", health_response.json())
except Exception as e:
    print(" Cannot connect to backend:", str(e))
    exit()

# 2. Example test data based on your model's expected fields
test_data = {
    "age": 65,
    "blood_pressure": "140/90",  # Note: Your preprocessing expects it to be encoded
    "specific_gravity": 1.015,
    "albumin": 2,
    "sugar": 0,
    "red_blood_cells": "normal",
    "pus_cell": "normal",
    "pus_cell_clumps": "notpresent",
    "bacteria": "notpresent",
    "blood_glucose_random": 140,
    "blood_urea": 70,
    "serum_creatinine": 2.0,
    "sodium": 135,
    "potassium": 4.5,
    "hemoglobin": 12.0,
    "packed_cell_volume": 40,
    "white_blood_cell_count": 7500,
    "red_blood_cell_count": 4.5,
    "hypertension": "yes",
    "diabetes_mellitus": "yes",
    "coronary_artery_disease": "no",
    "appetite": "poor",
    "pedal_edema": "yes",
    "anemia": "no"
}

# 3. Send prediction request
try:
    predict_response = requests.post(
        f'{BASE_URL}/api/predict',
        headers={'Content-Type': 'application/json'},
        data=json.dumps(test_data)
    )
    
    # Check response
    if predict_response.status_code == 200:
        print("\n Prediction Result:", predict_response.json())
    else:
        print("\n Error in Prediction:", predict_response.status_code, predict_response.text)
except Exception as e:
    print("\n Exception during prediction:", str(e))
