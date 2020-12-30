from datetime import datetime
import random
import string
import pymysql.cursors
from pymysql import MySQLError
from cerberus import Validator
from .config import Config


def call_procedure(query, parameter_values=None):
    connection = pymysql.connect(host=Config.MySql.DATABASE_SERVER, user=Config.MySql.DATABASE_USER,
                                 password=Config.MySql.DATABASE_PASS, db=Config.MySql.DATABASE_NAME,
                                 cursorclass=pymysql.cursors.DictCursor)
    try:
        cursor = connection.cursor()
        cursor.execute(query, parameter_values)
        result = []
        if cursor.rowcount == 1:
            result = cursor.fetchone()
        elif cursor.rowcount > 1:
            result = cursor.fetchall()
        return result
    except MySQLError as e:
        connection.rollback()
        # print("Error %d: %s" % (e.args[0], e.args[1]))
        raise e
    finally:
        connection.commit()
        # cursor.close()
        connection.close()


def generate_unique_code(prefix):
    length = 4
    code = ''.join(random.choices(string.digits, k=length))
    code = prefix + code
    return code


def get_utcnow_time_string():
    """
    docstring
    """
    return datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")


def validate_request(request_body, schema):
    v = Validator()
    valid = v.validate(request_body, schema)
    return valid, v.errors


def new_product_location_schema():
    """
    docstring
    """
    schema = {
        'name': {"type": "string", "minlength": 3, "maxlength": 50, "required": True, "regex": "^[a-z]+$"}
    }
    return schema


def new_movement_schema():
    """
    docstring
    """
    schema = {
        'from_location': {"type": "string", "minlength": 3, "maxlength": 10},
        'to_location': {"type": "string", "minlength": 3, "maxlength": 10},
        'product_id': {"type": "string", "minlength": 3, "maxlength": 10, "required": True},
        'qty': {"type": "number", "required": True}
    }
    return schema


def balance_schema():
    """
    docstring
    """
    schema = {
        'location': {"type": "string", "minlength": 3, "maxlength": 10, "required": True},
        'product': {"type": "string", "minlength": 3, "maxlength": 10, "required": True},
    }
    return schema
