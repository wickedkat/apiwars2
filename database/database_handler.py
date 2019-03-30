from database import database_connection


@database_connection.connection_handler
def select_user_by_username(cursor, username):
    cursor.execute("""
                    SELECT id, creation_date, username, password
                    FROM users
                    WHERE username = %(username)s     
                    """,
                   {'username': username})

    user = cursor.fetchone()
    return user


@database_connection.connection_handler
def register_new_user(cursor, user):
    cursor.execute("""
                    INSERT INTO users (creation_date, username, password)
                    VALUES (NOW()::date, %(username)s, %(password)s)
                    """,
                   {'username': user['username'],
                    'password': user['password']})


@database_connection.connection_handler
def get_user_id_by_username(cursor, username):
    cursor.execute("""
                    SELECT id from users
                    where  username = %(username)s 
                    """,
                   {'username': username})

    user_id = cursor.fetchone()
    return user_id['id']


@database_connection.connection_handler
def add_planet_vote(cursor, vote):
    cursor.execute("""
                    INSERT INTO planets_vote (planet_id, planet_name, user_id, submission_time)
                    VALUES ( %(planet_id)s , %(planet_name)s, %(user_id)s, NOW()::timestamp ) 
                    """,
                   {'planet_id': vote['planet_id'],
                    'planet_name': vote['planet_name'],
                    'user_id': vote['user_id']})


@database_connection.connection_handler
def show_voting_statistics(cursor):
    cursor.execute("""
                    SELECT planet_name as planet_name, COUNT(*) as votes
                    FROM planets_vote
                    GROUP BY planet_name
                    """)

    statistics = cursor.fetchall()
    return statistics

