import os
import io
import base64
from PIL import Image
import numpy as np
from keras.datasets import mnist
from keras.models import load_model
from keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from django.conf import settings
from .models import AnnModel, HyperparamsModel, DataParamsModel

def saveAnn(ann): 
  hyperparams = HyperparamsModel.objects.get_or_create(
    activation = ann.activation, 
    learning_rate = ann.learning_rate, 
    epochs = ann.epochs
  )

  params = DataParamsModel.objects.get_or_create(
    batch_size = ann.batch_size, 
    ratio_train = ann.ratio_train
  )

  new_ann = AnnModel.objects.create(
    arquitecture = ','.join(ann.arquitecture), 
    loss = ann.test_loss, 
    accuracy = ann.test_acc, 
    data_params = params[0], 
    hyperparams = hyperparams[0]
  )

  model_root = os.path.join('data', 'keras_models', f'ann-{new_ann.id}.keras')
  ann.model.save(model_root)
  new_ann.model_file = model_root
  new_ann.save()

  return new_ann

def loadAnn(id): 
  ann_model = AnnModel.objects.get(id = id)
  model_root = os.path.join(settings.BASE_DIR, ann_model.model_file)
  ann = load_model(model_root)
  return ann

def getImageMatrix(image_base64): 
  image = image_base64.split('base64,')[1]

  img_bytes = base64.b64decode(image)
  img = Image.open(io.BytesIO(img_bytes))
  img_resized = img.resize((28, 28), Image.LANCZOS)
  img_resized = img_resized.convert('L') 

  img_matrix = formatImage(img_resized)
  img_matrix = img_matrix.reshape(784, )
  return img_matrix

def formatImage(image): 
    img_matrix = np.array(image)
    pxs = np.where(img_matrix < 250)
    min_y, max_y = np.min(pxs[0]), np.max(pxs[0])
    min_x, max_x = np.min(pxs[1]), np.max(pxs[1])
    
    (left, upper, right, lower) = (min_x, min_y, max_x, max_y)
    image = image.crop((left, upper, right, lower))
    image_scaled = scaleImage(image)
    new_image = centerImage(image_scaled)
    
    img_matrix = np.array(new_image)
    img_matrix = 255 - img_matrix
    img_matrix = img_matrix.astype(np.float32) / 255
    return img_matrix

def centerImage(image, target_size = (28, 28)):
    width, height = image.size
    
    new_image = Image.new('L', target_size, color = 255)
    offset = ((target_size[0] - width) // 2, (target_size[1] - height) // 2)
    new_image.paste(image, offset)
    return new_image

def scaleImage(image, target_size = 20):
    width, height = image.size
    
    if height > width:
        scale =  target_size / height
        new_height = target_size
        new_width = int(width * scale)
    elif height < width:
        scale =  target_size / width
        new_width = target_size
        new_height = int(height * scale)
    else: 
        new_width = target_size
        new_height = target_size
    
    new_image = image.resize((new_width, new_height))
    return new_image

def randomTest(id): 
  ann_model = AnnModel.objects.get(id = id)
  ratio_train = ann_model.data_params.ratio_train
  (x_train, y_train), (x_test, y_test) = mnist.load_data()

  X = np.vstack((x_train, x_test))
  y = np.hstack((y_train, y_test))
  y = to_categorical(y, num_classes = 10)

  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 1 - ratio_train, random_state = 42, stratify = y)
  n = np.random.randint(0, X_test.shape[0])

  img_test = X_test[n].astype(np.float32) / 255
  img_test = img_test.reshape(784, )

  image_matrix = (255 - X_test[n]).astype('uint8')
  image = Image.fromarray(image_matrix)

  buffer = io.BytesIO()
  image.save(buffer, format = 'JPEG')
  image_bytes = buffer.getvalue()
  base64_str = base64.b64encode(image_bytes).decode('utf-8')

  image_base64 = f'data:image/jpeg;base64,{base64_str}'
  return image_base64, img_test