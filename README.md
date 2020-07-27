# Nodejs-Python {Server_Model} Code

Code to use NodeJS with a Python layer for the model.

This code is a template for connecting nodejs with python server. This could help in running ML models on python and then sending result to nodejs server

By default this code sends 'Hello World From Python' response to node js server

## Setup

In the root folder:

``` bash
npm install
pip install -r requirements.txt
```

## Demo with default code

``` bash
npm start
```

## Deploying your own Model

Save your model in folloing format

/models
  ├──/CNN.model
  │   ├──/assets
  │   ├──saved_model.pb
  │   └──/variables
  ├── model.h5

  Then copy the models folder and paste in the root directory of projecrt

Make changes in `model_run.py`.
Add the Driver code for your model in the `model_run.py`

## Default UI

By default the WebPage UI includes a image upload input which saves the images in the imgs folder in root directory of project and then these images could be used on Python server for further processing.
