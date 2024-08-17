import sys
import pickle
import numpy as np

# Load the saved model, vectorizer, and label encoder
with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)
with open('spam_detector_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Get the message from the command line arguments
message = sys.argv[1]

# Transform the message using the vectorizer
message_vectorized = vectorizer.transform([message])

# Predict the label
prediction = model.predict(message_vectorized)

# Convert the numerical prediction back to the original label
prediction_label = label_encoder.inverse_transform(prediction)

# Print the prediction label (this will be captured by Node.js)
print(prediction_label[0])
