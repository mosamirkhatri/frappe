from flask import Flask
from flask_cors import CORS

from .routes.product import product
from .routes.location import location
from .routes.product_movement import product_movement
from .routes.report import report

app = Flask(__name__)
CORS(app)

app.register_blueprint(product, url_prefix='/api/product')
app.register_blueprint(location, url_prefix='/api/location')
app.register_blueprint(product_movement, url_prefix='/api/product_movement')
app.register_blueprint(report, url_prefix='/api/report')


@app.route('/')
def health():
    """
    docstring
    """
    return "Working"
