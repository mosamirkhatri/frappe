from flask import Blueprint, request
from app.utils import call_procedure, generate_unique_code, validate_request, new_product_location_schema


product = Blueprint('product', __name__)


@product.route('/')
def get_products():
    """
    docstring
    """
    try:
        result = call_procedure("CALL get_all_products();")
        if isinstance(result, dict):
            result = [result]
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500


@product.route('/<string:product_id>')
def get_one_product(product_id):
    """
    docstring
    """
    try:
        result = call_procedure("CALL get_one_product(%s);", (product_id))
        if not result:
            return {"success": False, "message": "Not Found"}, 404
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e)
        return {"success": False, "message": str(e.args)}, 500


@product.route('/new', methods=['POST'])
def new_product():
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
        product_id = generate_unique_code("P-")
        duplicate_check = call_procedure(
            "CALL get_one_product(%s);", (product_id))
        while duplicate_check:
            product_id = generate_unique_code("P-")
            duplicate_check = call_procedure(
                "CALL get_one_product(%s);", (product_id))
        result = call_procedure("CALL add_product(%s,%s);", (product_id, name))
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e)
        return {"success": False, "message": str(e.args)}, 500


@product.route('/edit/<string:product_id>', methods=['POST'])
def edit_product(product_id):
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
        check = call_procedure("CALL get_one_product(%s);", (product_id))
        if not check:
            return {"success": False, "message": "Not Found"}, 404
        result = call_procedure(
            "CALL update_product(%s,%s);", (product_id, name))
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500


@product.route('/delete/<string:product_id>', methods=['POST'])
def delete_product(product_id):
    """
    docstring
    """
    try:
        result = call_procedure("CALL get_one_product(%s);", (product_id))
        if not result:
            return {"success": False, "message": "Not Found"}, 404
        call_procedure("CALL delete_product(%s);", (product_id))
        return {"data": result, "success": True}, 200
    except Exception as e:
        print(e.args)
        return {"success": False, "message": str(e.args)}, 500
