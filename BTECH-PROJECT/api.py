from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
from ckd_functions import load_model, preprocess_data, predict_ckd

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Load model at startup
print("Loading CKD prediction model...")
model = load_model()

@app.route('/')
def index():
    """Root endpoint to show API is running"""
    return "CKD Prediction API is running. Use /api/health to check status."

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple endpoint to verify API is running"""
    return jsonify({
        "status": "healthy", 
        "model_loaded": model is not None
    })

@app.route('/api/predict', methods=['POST'])
def api_predict():
    """Main prediction endpoint"""
    try:
        # Get data from request
        data = request.json
        
        # Process the data
        processed_data = preprocess_data(data)
        
        # Make prediction
        result = predict_ckd(processed_data, model)
        
        # Ensure the result is in the correct format (e.g., {"prediction": "Yes"})
        return jsonify({"prediction": result})
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 400

@app.route('/api/parameters', methods=['GET'])
def get_parameters():
    """Return the list of parameters required for prediction"""
    parameters = [
        {"name": "age", "type": "number", "required": True},
        {"name": "blood_pressure", "type": "string", "required": True},
        {"name": "specific_gravity", "type": "number", "required": True},
        {"name": "albumin", "type": "number", "required": True},
        {"name": "sugar", "type": "number", "required": True},
        {"name": "red_blood_cells", "type": "string", "required": True},
        {"name": "pus_cell", "type": "string", "required": True},
        {"name": "pus_cell_clumps", "type": "string", "required": True},
        {"name": "bacteria", "type": "string", "required": True},
        {"name": "blood_glucose_random", "type": "number", "required": True},
        {"name": "blood_urea", "type": "number", "required": True},
        {"name": "serum_creatinine", "type": "number", "required": True},
        {"name": "sodium", "type": "number", "required": True},
        {"name": "potassium", "type": "number", "required": True},
        {"name": "hemoglobin", "type": "number", "required": True},
        {"name": "packed_cell_volume", "type": "number", "required": True},
        {"name": "white_blood_cell_count", "type": "number", "required": True},
        {"name": "red_blood_cell_count", "type": "number", "required": True},
        {"name": "hypertension", "type": "string", "required": True},
        {"name": "diabetes_mellitus", "type": "string", "required": True},
        {"name": "coronary_artery_disease", "type": "string", "required": True},
        {"name": "appetite", "type": "string", "required": True},
        {"name": "pedal_edema", "type": "string", "required": True},
        {"name": "anemia", "type": "string", "required": True}
    ]
    
    return jsonify(parameters)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import traceback
# from ckd_functions import load_model, preprocess_data, predict_ckd

# app = Flask(__name__)
# CORS(app)  # Enable CORS for frontend access

# # Load model at startup
# print("Loading CKD prediction model...")
# model = load_model()

# @app.route('/')
# def index():
#     """Root endpoint to show API is running"""
#     return "CKD Prediction API is running. Use /api/health to check status."

# @app.route('/api/health', methods=['GET'])
# def health_check():
#     """Simple endpoint to verify API is running"""
#     return jsonify({
#         "status": "healthy", 
#         "model_loaded": model is not None
#     })

# def validate_medical_data(data):
#     """
#     Validates if the data appears to be from a medical report
#     by checking for expected fields and values.
#     """
#     # Required fields that should be present and have valid values
#     required_fields = [
#         'serum_creatinine', 'blood_urea', 'specific_gravity', 
#         'albumin', 'red_blood_cells', 'white_blood_cell_count'
#     ]
    
#     # Check if the required fields exist and are not null/empty
#     missing_fields = [field for field in required_fields if field not in data or data[field] is None]
    
#     # Check for reasonable value ranges for key parameters
#     unreasonable_values = []
    
#     # Example validation for serum creatinine - typically between 0.5 and 15 mg/dL
#     if 'serum_creatinine' in data and data['serum_creatinine'] is not None:
#         if float(data['serum_creatinine']) < 0.3 or float(data['serum_creatinine']) > 20:
#             unreasonable_values.append('serum_creatinine')
    
#     # Add more range checks for other parameters as needed
    
#     # Calculate a validation score
#     if len(required_fields) == 0:
#         return True  # No required fields defined
    
#     missing_percent = len(missing_fields) / len(required_fields)
#     unreasonable_percent = len(unreasonable_values) / len(required_fields) if required_fields else 0
    
#     # If more than 30% of required fields are missing or have unreasonable values, consider invalid
#     return missing_percent < 0.3 and unreasonable_percent < 0.3

# @app.route('/api/predict', methods=['POST'])
# def api_predict():
#     """Main prediction endpoint"""
#     try:
#         # Get data from request
#         data = request.json
        
#         # Validate the data first
#         if not validate_medical_data(data):
#             return jsonify({
#                 "error": "Invalid medical data",
#                 "message": "The provided data does not appear to be from a valid medical report. Please ensure you're uploading a standard medical laboratory report with the required parameters."
#             }), 400
        
#         # Process the data
#         processed_data = preprocess_data(data)
        
#         # Make prediction
#         result = predict_ckd(processed_data, model)
        
#         # Ensure the result is in the correct format (e.g., {"prediction": "Yes"})
#         return jsonify({"prediction": result})
        
#     except Exception as e:
#         traceback.print_exc()
#         return jsonify({"error": str(e)}), 400

# @app.route('/api/parameters', methods=['GET'])
# def get_parameters():
#     """Return the list of parameters required for prediction"""
#     parameters = [
#         {"name": "age", "type": "number", "required": True},
#         {"name": "blood_pressure", "type": "string", "required": True},
#         # ... (other parameters remain the same)
#     ]
    
#     return jsonify(parameters)

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)