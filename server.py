from datetime import datetime

from flask import Flask, redirect
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy

from parameters import get_parameter

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = get_parameter('database_url')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Suppress logged warning
db = SQLAlchemy(app)

api = Api(app)


# Creates a string similar to rfc3339 format
def dt_as_rfc3339(dt: datetime) -> str:
    return dt.isoformat('T') + 'Z'


def init_db() -> None:
    db.create_all()


# Return dict with error as a key
def dict_with_error(message: str) -> dict:
    return {
        'error': message
    }


def not_found_error(message: str) -> tuple:
    return dict_with_error(message), 404


def bad_request_error(message: str) -> tuple:
    return dict_with_error(message), 400


@app.route('/')
def index() -> tuple:
    return redirect(get_parameter('redirect_url'), code=301)


# Return error 404 as JSON
@app.errorhandler(404)
def page_not_found(e) -> tuple:
    return not_found_error('Page not found!')


class Options(db.Model):
    name = db.Column(db.String, primary_key=True)
    value = db.Column(db.String, nullable=False)

    def to_dict(self) -> dict:
        return {
            'name': self.name,
            'value': self.value
        }


# Get an option saved in the database
def get_option(name: str) -> Options:
    return Options.query.filter_by(name=name).first()


# Edit an option saved in the database, if not exist create it
def set_option(name: str, value: str) -> Options:
    option = get_option(name=name)
    if option is None:
        option = Options(name=name, value=value)
        db.session.add(option)
    else:
        option.value = value
    db.session.commit()
    return option


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    edited = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'text': self.text,
            'created': dt_as_rfc3339(self.created),
            'edited': dt_as_rfc3339(self.edited)
        }


# Edit 'last_action_on_messages' option with current time, using rfc3339 format
def set_laom_option() -> Options:
    return set_option(name='last_action_on_messages',
                      value=dt_as_rfc3339(datetime.utcnow()))


class LastActionOnMessages(Resource):
    # Return the time when last action on messages occour
    # (adding, editing, deleting)
    def get(self):
        # LAOM == last action on messsages
        laom_option = get_option(name='last_action_on_messages')
        if laom_option is None:
            laom_option = set_laom_option()
        return laom_option.to_dict(), 200


class Messages(Resource):
    # Parse the JSON of a request and return the text key
    @staticmethod
    def get_request_text() -> str:
        parser = reqparse.RequestParser()
        parser.add_argument('text', type=str, required=True, nullable=False)
        return parser.parse_args()['text']

    # Return all messages if an ID is not provided
    def get(self, id: int = None):
        if id:
            message = Message.query.get(id)
            if message:
                return message.to_dict(), 200
            return not_found_error('Message not found!')
        # Returns all messages sorted by creation date
        all_messages = Message.query.order_by(Message.created.asc()).all()
        return [message.to_dict() for message in all_messages], 200

    # Create a new message and return it
    def post(self, id: int = None):
        message = Message(text=self.get_request_text())
        db.session.add(message)
        db.session.commit()
        set_laom_option()
        return message.to_dict(), 200

    # Function that brings together the underlying ones
    def patch_or_delete(self, id: int = None, delete: bool = False):
        if id:
            message = Message.query.get(id)
            if message:
                if delete:
                    db.session.delete(message)
                else:
                    message.text = self.get_request_text()
                    message.edited = datetime.utcnow()
                db.session.commit()
                set_laom_option()
                return message.to_dict(), 200
            return not_found_error('ID not found!')
        return bad_request_error('ID is required')

    # Edit a message and return it
    def patch(self, id: int = None):
        return self.patch_or_delete(id=id, delete=False)

    # Delete a message and return it
    def delete(self, id: int = None):
        return self.patch_or_delete(id=id, delete=True)


# Declaration of the allowed cors requests
allowed_cors = get_parameter('allowed_cors')
if allowed_cors:
    CORS(app, resources={
        r'^\/(last_action_on_messages|messages(\/\d+)?)$': {
            'origins': allowed_cors
        }
    })
# Declaration of the REST endpoints
api.add_resource(LastActionOnMessages, '/last_action_on_messages')
api.add_resource(Messages, '/messages', '/messages/<int:id>')


if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=int(get_parameter('port')))
