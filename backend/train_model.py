import os
import numpy as np
import tensorflow as tf

from tensorflow.keras import layers, models
from tensorflow.keras.datasets import mnist


print("=" * 50)
print("3D MNIST PROJECT - MODEL TRAINING")
print("=" * 50)

# --------------------------------------------------
# 1. LOAD MNIST DATASET
# --------------------------------------------------

print("\nLoading MNIST dataset...")

(x_train, y_train), (x_test, y_test) = mnist.load_data()

print("Training images :", x_train.shape)
print("Training labels :", y_train.shape)
print("Testing images  :", x_test.shape)
print("Testing labels  :", y_test.shape)


# --------------------------------------------------
# 2. NORMALIZE IMAGE DATA
# --------------------------------------------------

print("\nPreprocessing images...")

x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0


# --------------------------------------------------
# 3. ADD CHANNEL DIMENSION
# --------------------------------------------------

x_train = np.expand_dims(x_train, axis=-1)
x_test = np.expand_dims(x_test, axis=-1)

print("Processed training shape:", x_train.shape)
print("Processed testing shape :", x_test.shape)


# --------------------------------------------------
# 4. CREATE CNN MODEL
# --------------------------------------------------

print("\nCreating CNN model...")

model = models.Sequential([
    layers.Input(shape=(28, 28, 1)),

    # First convolution layer
    layers.Conv2D(
        32,
        (3, 3),
        activation="relu"
    ),

    layers.MaxPooling2D(
        (2, 2)
    ),

    # Second convolution layer
    layers.Conv2D(
        64,
        (3, 3),
        activation="relu"
    ),

    layers.MaxPooling2D(
        (2, 2)
    ),

    # Convert feature maps to vector
    layers.Flatten(),

    # Fully connected layer
    layers.Dense(
        128,
        activation="relu"
    ),

    # Reduce overfitting
    layers.Dropout(0.3),

    # 10 digit classes: 0-9
    layers.Dense(
        10,
        activation="softmax"
    )
])


# --------------------------------------------------
# 5. COMPILE MODEL
# --------------------------------------------------

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)


# --------------------------------------------------
# 6. SHOW MODEL
# --------------------------------------------------

print("\nModel architecture:\n")

model.summary()


# --------------------------------------------------
# 7. TRAIN MODEL
# --------------------------------------------------

print("\n")
print("=" * 50)
print("STARTING TRAINING")
print("=" * 50)

history = model.fit(
    x_train,
    y_train,
    validation_split=0.1,
    epochs=5,
    batch_size=128,
    verbose=1
)


# --------------------------------------------------
# 8. TEST MODEL
# --------------------------------------------------

print("\n")
print("=" * 50)
print("TESTING MODEL")
print("=" * 50)

test_loss, test_accuracy = model.evaluate(
    x_test,
    y_test,
    verbose=1
)

print("\nTest Loss     :", test_loss)
print("Test Accuracy :", test_accuracy)


# --------------------------------------------------
# 9. CREATE MODEL DIRECTORY
# --------------------------------------------------

model_directory = os.path.join(
    os.path.dirname(__file__),
    "models"
)

os.makedirs(
    model_directory,
    exist_ok=True
)


# --------------------------------------------------
# 10. SAVE TRAINED MODEL
# --------------------------------------------------

model_path = os.path.join(
    model_directory,
    "mnist_digit_model.keras"
)

model.save(model_path)


# --------------------------------------------------
# 11. FINISHED
# --------------------------------------------------

print("\n")
print("=" * 50)
print("TRAINING COMPLETE")
print("=" * 50)

print("\nTrained model saved at:")
print(model_path)

print("\nYour project can now use this model to:")
print("1. Receive a handwritten digit")
print("2. Recognize the digit")
print("3. Extract its shape")
print("4. Convert the shape into 3D")
print("5. Display the 3D digit using Three.js")

print("\nDone!")