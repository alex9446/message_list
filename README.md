# Message List [API]
Main repository: https://gitlab.com/alex9446/message_list_api

master branch deploy: https://master-message-list.herokuapp.com/messages \
dev branch deploy: https://dev-message-list.herokuapp.com/messages

## Short description
Server side REST API service for saving and managing messages. \
Made for educational purposes for the study of python and flask.

## Installation
Some dependencies are needed, use requirements.txt to install them
```
pip install -r requirements.txt
```

## Usage
```
python server.py
# or
gunicorn wsgi:app --log-file -
```
