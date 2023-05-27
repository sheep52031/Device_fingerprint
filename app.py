import os
import platform
from datetime import datetime
import pytz
import requests
from flask import Flask, render_template, request, jsonify
# ProxyCheck.io
PROXYCHECK_API_KEY = os.environ.get('PROXYCHECK_API_KEY', '')

# IPQualityScore API
IPQUALITYSCORE_API_KEY = os.environ.get('IPQUALITYSCORE_API_KEY', '')

app = Flask(__name__)

@app.route("/")
def index():
    os_name = platform.system()
    os_version = platform.release()
    platform_name = platform.platform()
    local_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    timezone = datetime.now(pytz.timezone('UTC')).strftime('%Z')
    timezone_offset = datetime.now(pytz.timezone('UTC')).strftime('%z')
    
    system_info = {
        'os_name': os_name,
        'os_version': os_version,
        'platform_name': platform_name,
        'local_time': local_time,
        'timezone': timezone,
        'timezone_offset': timezone_offset
    }

    return render_template("index.html", system_info=system_info)

@app.route("/hardware_info", methods=["POST"])
def hardware_info():
    data = request.json

    print(data)
    # Process the data using Python
    # ...
    return jsonify(data)

@app.route("/screen_info", methods=["POST"])
def screen_info():
    data = request.json
    print(data)
    return jsonify(data)


@app.route("/browser_info", methods=["POST"])
def browser_info():
    data = request.json
    print(data)
    return jsonify(data)

@app.route('/ip_info', methods=['GET'])
def get_ip_info():
    res_ipapi = requests.get("http://ip-api.com/json/?fields=50591711")
    ip_data = res_ipapi.json()
    print(ip_data)

    return jsonify(ip_data)


@app.route('/system_info', methods=['GET'])
def get_system_info():
    os_name = platform.system()
    os_version = platform.release()
    platform_name = platform.platform()
    local_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    timezone = datetime.now(pytz.timezone('UTC')).strftime('%Z')
    timezone_offset = datetime.now(pytz.timezone('UTC')).strftime('%z')
    
    system_info = {
        'os_name': os_name,
        'os_version': os_version,
        'platform_name': platform_name,
        'local_time': local_time,
        'timezone': timezone,
        'timezone_offset': timezone_offset
    }

    return jsonify(system_info)

if __name__ == "__main__":
    app.run(port=6003, debug=True)
