from flask import Blueprint, request
from app.utils import (balance_schema, call_procedure, get_utcnow_time_string,
                       generate_unique_code, new_movement_schema, validate_request)
from pymysql import MySQLError


product_movement = Blueprint('product_movement', __name__)


@product_movement.route('/')
def get_product_movements():
    """
    docstring
    """
    try:
        result = call_procedure("CALL get_all_product_movements();")
        if isinstance(result, dict):
            result = [result]
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500


@product_movement.route('/<string:product_movement_id>')
def get_one_product_movement(product_movement_id):
    """
    docstring
    """
    try:
        result = call_procedure(
            "CALL get_one_product_movement(%s);", (product_movement_id))
        if not result:
            return {"success": False, "message": "Not Found"}, 404
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e)
        return {"success": False, "message": str(e.args)}, 500


@product_movement.route('/new', methods=['POST'])
def new_product_movement():
    """
    docstring
    """
    try:
        request_data = request.get_json()
        schema = new_movement_schema()
        [valid, error] = validate_request(request_data, schema)
        if not valid:
            return {"success": False, "message": str(error)}, 400
        movement_id = generate_unique_code("PM-")
        duplicate_check = call_procedure(
            "CALL get_one_product_movement(%s);", (movement_id))
        while duplicate_check:
            movement_id = generate_unique_code("PM-")
            duplicate_check = call_procedure(
                "CALL get_one_product_movement(%s);", (movement_id))
        timestamp = get_utcnow_time_string()
        from_location = request_data.get('from_location')
        to_location = request_data.get('to_location')
        # Check if from and to location => both are not null
        if from_location == to_location:
            return {"success": False, "message": "From And To Locations cannot be Same " +
                    "OR Both cannot be Null (Need to specify either one in that case)"}, 400
        product_id = request_data.get('product_id')
        qty = request_data.get('qty')
        print("QTY", qty)
        # check sufficient qty available in from location if from_location is not null
        if from_location:
            check = call_procedure(
                "CALL check_available_quantity(%s,%s)", (product_id, from_location))
            if not check:
                return {"success": False, "message": "Insufficient Qty in From Location"}, 400
            elif qty > check['qty']:
                return {"success": False, "message": "Insufficient Qty in From Location"}, 400
        result = call_procedure("CALL add_product_movement(%s, %s, %s, %s, %s, %s);",
                                (movement_id, timestamp, from_location, to_location, product_id, qty))
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500


@product_movement.route('/edit/<string:product_movement_id>', methods=['POST'])
def edit_product_movement(product_movement_id):
    """
    docstring
    """
    try:
        request_data = request.get_json()

        schema = new_movement_schema()
        [valid, error] = validate_request(request_data, schema)
        if not valid:
            return {"success": False, "message": str(error)}, 400

        timestamp = get_utcnow_time_string()

        new_from_location = request_data.get('from_location')
        new_to_location = request_data.get('to_location')

        if new_from_location == new_to_location:
            return {"success": False, "message": "From And To Locations cannot be Same " +
                    "OR Both cannot be Null (Need to specify either one in that case)"}, 400

        new_product_id = request_data.get('product_id')

        result = call_procedure(
            "CALL get_one_product_movement(%s);", (product_movement_id))

        if not result:
            return {"success": False, "message": "Not Found"}, 404

        new_qty = request_data.get('qty')

        old_from_location = result.get('from_location')
        old_to_location = result.get('to_location')
        old_product_id = result.get('product_id')
        old_qty = result.get('qty')

        print("product id", old_product_id)

        query_output = call_procedure("CALL update_product_movement(%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                                      (product_movement_id, old_from_location, old_to_location, old_product_id,
                                       old_qty, new_from_location, new_to_location, new_product_id, new_qty))
        return {"success": True, "data": query_output}, 200
    except MySQLError as e:
        return {"success": False, "message": e.args[1]}, 500
    except Exception as e:
        print(e.args)
        return {"success": False, "message": e.args}, 500


@product_movement.route('/balance', methods=['POST'])
def balance_qty():
    """
    docstring
    """
    try:
        request_data = request.get_json()
        schema = balance_schema()
        [valid, error] = validate_request(request_data, schema)
        if not valid:
            return {"success": False, "message": str(error)}, 400
        product = request_data.get('product')
        location = request_data.get('location')
        result = call_procedure("CALL balance(%s,%s);", (product, location))
        result['total_qty'] = int(result['total_qty'])
        return {"success": True, "data": result}, 200
    except Exception as e:
        return {"success": False, "message": str(e.args)}, 500
