from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Paths to the pickle files
MODEL_PATH = 'spam_detector_model.pkl'
VECTORIZER_PATH = 'vectorizer.pkl'

# Load the model and vectorizer at startup
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

def predict_spam_or_ham(message):
    message_vectorized = vectorizer.transform([message])
    prediction = model.predict(message_vectorized)
    return prediction[0]

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if 'message' not in data:
        return jsonify({"error": "No message provided"}), 400

    message = data['message']
    predicted_label = predict_spam_or_ham(message)
    return jsonify({"prediction": predicted_label})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
