import numpy as np
import pandas as pd
import lightgbm as lgb
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
import pickle
import os

# Global variables
model = None
scaler = None
feature_names = None
encoders = {}  # Global dict to store label encoders
target_encoder = None  # NEW: Global target encoder

def load_model(model_path='ckd_model.pkl', scaler_path='scaler.pkl', encoder_path='encoders.pkl'):
    """Load the trained model, scaler, and encoders"""
    global model, scaler, feature_names, encoders, target_encoder

    try:
        with open(model_path, 'rb') as f:
            model_data = pickle.load(f)
            model = model_data['model']
            feature_names = model_data['feature_names']
            target_encoder = model_data.get('target_encoder', None)

        with open(scaler_path, 'rb') as f:
            scaler = pickle.load(f)

        if os.path.exists(encoder_path):
            with open(encoder_path, 'rb') as f:
                encoders = pickle.load(f)

        print(" Model, scaler, and encoders loaded successfully")
        return model

    except Exception as e:
        print(f" Error loading model: {str(e)}")
        return None

def preprocess_data(data):
    """Preprocess the input data for prediction"""
    global encoders

    if isinstance(data, dict):
        df = pd.DataFrame([data])
    else:
        df = pd.DataFrame(data)

    # Handle missing values
    for col in df.columns:
        if df[col].dtype == 'object':
            df[col] = df[col].fillna(df[col].mode()[0] if not df[col].empty else "unknown")
        else:
            df[col] = df[col].fillna(df[col].mean() if not df[col].empty else 0)

    # Drop irrelevant columns
    df = df.drop(columns=[col for col in ['PatientID', 'DoctorInCharge'] if col in df.columns])

    # Encode categorical features
    categorical_features = df.select_dtypes(include=['object']).columns

    for col in categorical_features:
        if col in encoders:
            encoder = encoders[col]
            df[col] = df[col].map(lambda s: encoder.transform([s])[0] if s in encoder.classes_ else -1)
        else:
            df[col] = -1

    # Ensure all expected features are present
    if feature_names is not None:
        missing_cols = set(feature_names) - set(df.columns)
        for col in missing_cols:
            df[col] = 0

        df = df[feature_names]

    # Scale numerical features
    if scaler is not None:
        try:
            df[df.columns] = scaler.transform(df)
        except ValueError as e:
            print("Error during scaling:", e)
            raise

    return df

def predict_ckd(processed_data, loaded_model=None):
    """Make a prediction using the model"""
    global model

    if loaded_model is not None:
        use_model = loaded_model
    elif model is not None:
        use_model = model
    else:
        raise ValueError("No model available for prediction")

    # Predict
    prediction = use_model.predict(processed_data)[0]
    probability = use_model.predict_proba(processed_data)[0][1]

    result = {
        "result": "positive" if prediction == 1 else "negative",
        "probability": float(probability),
        "risk_level": get_risk_level(probability),
        "parameters": processed_data.to_dict(orient='records')[0] if isinstance(processed_data, pd.DataFrame) else processed_data
    }

    return result


def get_risk_level(probability):
    """Convert probability to risk level"""
    if probability < 0.2:
        return "Very Low"
    elif probability < 0.4:
        return "Low"
    elif probability < 0.6:
        return "Moderate"
    elif probability < 0.8:
        return "High"
    else:
        return "Very High"

def save_model(model_obj, feature_list, scaler_obj=None, encoder_obj=None, target_encoder_obj=None, model_path='ckd_model.pkl', scaler_path='scaler.pkl', encoders_path='encoders.pkl'):
    """Save the model, scaler, feature names, and encoders to disk"""

    if isinstance(model_obj, lgb.Booster):
        raise ValueError("Expected a sklearn LGBMClassifier model, got Booster instead!")

    model_data = {
        'model': model_obj,
        'feature_names': feature_list,
        'target_encoder': target_encoder_obj
    }

    with open(model_path, 'wb') as f:
        pickle.dump(model_data, f)

    if scaler_obj is not None:
        with open(scaler_path, 'wb') as f:
            pickle.dump(scaler_obj, f)

    if encoder_obj is not None:
        with open(encoders_path, 'wb') as f:
            pickle.dump(encoder_obj, f)

    print(" Model, scaler, and encoders saved successfully")
