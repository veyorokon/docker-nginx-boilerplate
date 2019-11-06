#!/usr/bin/env python3

############################################################################
############                    IMPORTS                         ############
############################################################################

import os
import json
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask import Flask, url_for


############################################################################
############                    GLOBALS                         ############
############################################################################

CPORT = os.environ.get('CPORT', 8000)

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
CORS(app)

############################################################################
############                    FUNCTNS                         ############
############################################################################

def has_no_empty_params(rule):
    """
    Util function for displaying sitemap
    """
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)



############################################################################
############                 FLASK ENDPNTS                      ############
############################################################################

@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@cross_origin()
@app.route('/')
def index():
    links = []
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))
    return jsonify({'site-map':links})


@cross_origin()
@app.route('/example', methods=['GET'])
def services():
    return jsonify({'data': 'example string data'})


def main():
    app.run(debug=True, host='0.0.0.0', port=CPORT)
