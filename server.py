import os
import psycopg2
import urllib

urllib.parse.uses_netloc.append('postgres')
url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
connection = psycopg2.connect(
    database=url.path[1:],
    user=url.username,
    password=url.password,
    host=url.hostname,
    port=url.port
)

from flask import Flask, render_template, request, session, redirect, json
from psycopg2 import errorcodes

from login_handler import user_validation, hash_handler
from database import database_handler

app = Flask(__name__)
app.secret_key = 'Lookingforamindatwork'


@app.route('/')
def mainpage():
    return render_template('main.html')


@app.route('/register', methods=['POST','GET'])
def register_new_user():
    username = request.get_json()['username']
    password = request.get_json()['password']
    if user_validation.check_user_in_database(username):
        message = 'User already in database'
        json_message = json.dumps(message)
        return json_message
    else:
        hashed_password = hash_handler.hash_password(password)
        user = {
            'username': username,
            'password': hashed_password}
        database_handler.register_new_user(user)
        session['username'] = user['username']
        message = "Registration succesful"
        json_message = json.dumps(message)
        return json_message


@app.route('/login', methods=['POST','GET'])
def login_user():
    log_user = {
        'username': request.get_json()['username'],
        'password': request.get_json()['password']
    }

    if user_validation.check_user_in_database(log_user['username']):
        let_pass = user_validation.verify_user(log_user)
        if let_pass:
            session['username'] = log_user['username']
            message = "Log in succesful"
            json_message = json.dumps(message)
            return json_message
        else:
            message = "Wrong password. Try again."
            json_message = json.dumps(message)
            return json_message
    else:
        message = "User doesn't exist. Please register"
        json_message = json.dumps(message)
        return json_message

@app.route('/vote_planet', methods=['GET', 'POST'])
def vote_planet():
    planet_id = request.get_json()['planet_id']
    planet_name= request.get_json()['planet_name']
    user_id = database_handler.get_user_id_by_username(session['username'])
    vote = {
        'planet_id': planet_id,
        'planet_name':planet_name,
        'user_id':user_id
    }
    try:
        database_handler.add_planet_vote(vote)
        message = "Your vote has been saved"
        json_message = json.dumps(message)
        return json_message
    except errorcodes:
        message = "Database error. Please try again later"
        json_message = json.dumps(message)
        return json_message


@app.route('/statistics', methods=['GET'])
def show_voting_statistics():
    statistics = database_handler.show_voting_statistics()
    statistics = json.dumps(statistics)
    return statistics


@app.route('/logout')
def logout():
    del session['username']
    return redirect('/')


if __name__ == '__main__':
    app.run(
        debug=True,
        port=5000
    )
