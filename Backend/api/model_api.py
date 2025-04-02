from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# ✅ Load Model
with open("heart_model.pkl", "rb") as file:
    model = pickle.load(file)

# ✅ Load Scaler
with open("scaler.pkl", "rb") as file:
    scaler = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # ✅ Get JSON data
        data = request.json.get('features')
        if not data:
            return jsonify({'error': 'Missing "features" in request'}), 400

        # ✅ Convert to NumPy Array
        data = np.array(data).reshape(1, -1)

        # ✅ Check Feature Size
        expected_features = model.coef_.shape[1]
        if data.shape[1] != expected_features:
            return jsonify({'error': f'Expected {expected_features} features, but got {data.shape[1]}'}), 400

        # ✅ Scale Data (Very Important)
        scaled_data = scaler.transform(data)

        # ✅ Predict
        prediction = model.predict(scaled_data)

        return jsonify({'prediction': int(prediction[0])})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
