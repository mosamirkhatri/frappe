from flask import Blueprint
from pymysql import MySQLError
from app.utils import call_procedure


report = Blueprint('report', __name__)


@report.route('/')
def get_report():
    """
    docstring
    """
    try:
        result = call_procedure("CALL get_report();")
        if isinstance(result, dict):
            result = [result]
        return {"data": result, "success": True}, 200
    except MySQLError as e:
        print(e.args)
        return {"success": False, "message": e.args[1]}, 500
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500
