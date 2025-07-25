import numpy as np
import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import Model
from PIL import Image

model = load_model("captioning/models/caption_model.h5")

with open("captioning/models/tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

max_length = 35
cnn_output_dim = 4096  # VGG16 fc2 layer output size

def preprocess_image_vgg(image):
    # Resize image to 224x224 as required by VGG16
    image = image.resize((224, 224))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    # Preprocess input for VGG16
    return preprocess_input(image)

def extract_features_vgg(image, model):
    image = preprocess_image_vgg(image)
    features = model.predict(image).flatten()
    return features

def generate_caption(image):
    # Load VGG16 model pre-trained on ImageNet, outputting fc2 layer features
    base_model = VGG16(weights="imagenet")
    base_model = Model(inputs=base_model.input, outputs=base_model.get_layer("fc2").output)

    features = extract_features_vgg(image, base_model)

    in_text = 'start'
    for _ in range(max_length):
        sequence = tokenizer.texts_to_sequences([in_text])[0]
        sequence = pad_sequences([sequence], maxlen=max_length)
        yhat = model.predict([np.expand_dims(features, axis=0), sequence], verbose=0)
        yhat = np.argmax(yhat)
        word = tokenizer.index_word.get(yhat, '')
        if word == 'endseq' or word == '':
            break
        in_text += ' ' + word

    return in_text.replace("start ", "")
