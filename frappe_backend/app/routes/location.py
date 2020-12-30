from flask import Blueprint, request
from app.utils import call_procedure, generate_unique_code, new_product_location_schema, validate_request


location = Blueprint('location', __name__)


@location.route('/')
def get_locations():
    """
    docstring
    """
    try:
        result = call_procedure("CALL get_all_locations();")
        if isinstance(result, dict):
            result = [result]
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500


@location.route('/<string:location_id>')
def get_one_location(location_id):
    """
    docstring
    """
    try:
        result = call_procedure("CALL get_one_location(%s);", (location_id))
        if not result:
            return {"success": False, "message": "Not Found"}, 404
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e)
        return {"success": False, "message": str(e.args)}, 500


@location.route('/new', methods=['POST'])
def new_location():
    """
    docstring
    """
    try:
        request_data = request.get_json()
        schema = new_product_location_schema()
        [valid, error] = validate_request(request_data, schema)
        if not valid:
            return {"success": False, "message": str(error)}, 400
        name = request_data.get('name')
        location_id = generate_unique_code("L-")
        duplicate_check = call_procedure(
            "CALL get_one_location(%s);", (location_id))
        while duplicate_check:
            location_id = generate_unique_code("L-")
            duplicate_check = call_procedure(
                "CALL get_one_location(%s);", (location_id))
        result = call_procedure(
            "CALL add_location(%s,%s);", (location_id, name))
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500


@location.route('/edit/<string:location_id>', methods=['POST'])
def edit_location(location_id):
    """
    docstring
    """
    try:
        request_data = request.get_json()
        schema = new_product_location_schema()
        [valid, error] = validate_request(request_data, schema)
        if not valid:
            return {"success": False, "message": str(error)}, 400
        name = request_data.get('name')
        check = call_procedure("CALL get_one_location(%s);", (location_id))
        if not check:
            return {"success": False, "message": "Not Found"}, 404
        result = call_procedure(
            "CALL update_location(%s,%s);", (location_id, name))
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500


@location.route('/delete/<string:location_id>', methods=['POST'])
def delete_location(location_id):
    """
    docstring
    """
    try:
        result = call_procedure("CALL get_one_location(%s);", (location_id))
        if not result:
            return {"success": False, "message": "Not Found"}, 404
        call_procedure("CALL delete_location(%s);", (location_id))
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500
