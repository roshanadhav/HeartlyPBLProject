import pickle
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# ✅ Load Real Dataset
df = pd.read_csv("heart (1).csv")  # Make sure this file exists

# ✅ Extract Features & Labels
X = df.drop(columns=['target'])  # Change 'target' to your actual label column
y = df['target']

# ✅ Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ✅ Apply Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# ✅ Train Model
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# ✅ Save Model & Scaler
with open("heart_model.pkl", "wb") as file:
    pickle.dump(model, file)

with open("scaler.pkl", "wb") as file:
    pickle.dump(scaler, file)

print("✅ Model and Scaler Saved Successfully!")
