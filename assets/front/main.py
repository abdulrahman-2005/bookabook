# Importing Image class from PIL module
from PIL import Image
import os
# Opens a image in RGB mode

for i in os.listdir("."):
    if i != "main.py":
        im = Image.open(i)
        im.resize((350, 600))
        im.save(i)
