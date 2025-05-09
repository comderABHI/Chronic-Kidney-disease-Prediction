import pandas as pd
import lightgbm as lgb
import numpy as np
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
from ckd_functions import save_model
import pickle
import os
import sys

# This script should be run once to train and export the model

# Load data
file_path = r"D:\8th Semester\BTECH-PROJECT\dataset\Chronic_Kidney_Dsease_data.csv"

# Check if the file exists
if not os.path.isfile(file_path):
    print(f" File not found: {file_path}")
    sys.exit()

# Load the dataset
df = pd.read_csv(file_path)

# Preprocessing
df_cleaned = df.copy()

# Handle missing values
for col in df_cleaned.columns:
    if df_cleaned[col].dtype == 'object':  # Categorical
        df_cleaned[col] = df_cleaned[col].fillna(df_cleaned[col].mode()[0])
    else:  # Numerical
        df_cleaned[col] = df_cleaned[col].fillna(df_cleaned[col].mean())

# Remove irrelevant columns
for col in ['PatientID', 'DoctorInCharge']:
    if col in df_cleaned.columns:
        df_cleaned.drop(columns=[col], inplace=True)

# Encode categorical variables
encoders = {}
categorical_cols = df_cleaned.select_dtypes(include=['object']).columns
categorical_cols = categorical_cols.drop('Diagnosis', errors='ignore')  # <- safer drop

for col in categorical_cols:
    le = LabelEncoder()
    df_cleaned[col] = le.fit_transform(df_cleaned[col])
    encoders[col] = le  # Save encoder for this column

# Define features and target
X = df_cleaned.drop(columns=["Diagnosis"])
y = df_cleaned["Diagnosis"]

# Encode target separately
target_encoder = LabelEncoder()
y_encoded = target_encoder.fit_transform(y)

# Scale numerical features
scaler = MinMaxScaler()
X_scaled = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

# Handle class imbalance
smote = SMOTE(sampling_strategy='auto', random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)

# Train LightGBM model
lgb_model = lgb.LGBMClassifier(
    boosting_type='gbdt',
    objective='binary',
    is_unbalance=True,
    scale_pos_weight=np.bincount(y_resampled)[0] / np.bincount(y_resampled)[1],
    num_leaves=31,
    max_depth=-1,
    learning_rate=0.05,
    n_estimators=200,
    random_state=42
)

lgb_model.fit(X_resampled, y_resampled)

# Save model, features, scaler, and encoders
save_model(
    model_obj=lgb_model,
    feature_list=X_scaled.columns.tolist(),
    scaler_obj=scaler,
    encoder_obj=encoders,
    target_encoder_obj=target_encoder
)
print(" Model, scaler, and encoders exported successfully!")
