import joblib
import sys

# Paths to the pickle files
MODEL_PATH = 'spam_detector_model.pkl'
VECTORIZER_PATH = 'vectorizer.pkl'

def predict_spam_or_ham(message):
    # Load the saved model and vectorizer
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)

    # Transform the message using the vectorizer
    message_vectorized = vectorizer.transform([message])

    # Predict the label
    prediction = model.predict(message_vectorized)

    # Return the predicted label
    return prediction[0]

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python predict.py <message>")
        sys.exit(1)

    message = sys.argv[1]

    # Perform prediction
    predicted_label = predict_spam_or_ham(message)

    # Print the predicted label
    print(predicted_label)
