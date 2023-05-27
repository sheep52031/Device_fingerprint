
# Overview
This project is a web application built using Flask, a Python web framework. The application aims to display information about the visitor's computer on the web page, including hardware information, operating system information, IP information, and browser information. The application retrieves and presents this information using JavaScript and various Python libraries.

該項目是一個使用 Python 網絡框架 Flask 構建的網絡應用程序。該應用程序旨在在網頁上顯示訪問者計算機的信息，包括硬件信息、操作系統信息、IP信息和瀏覽器信息。該應用程序使用 JavaScript 和各種 Python 庫檢索並呈現此信息。


## Project Structure
```
├── README.md
├── app.py
├── requirements.txt
├── static
│   ├── browser_info.js
│   ├── hardware.js
│   ├── ip_info.js
│   └── screen_info.js
└── templates
    └── index.html
```


* `app.py` is the main Python file that contains the Flask application code.
* `static` directory holds JavaScript files responsible for retrieving and displaying various information.
* `templates` directory contains the main HTML template for the web page.


## Functionality
The application consists of multiple JavaScript files that fetch and present different types of information:

1. `browser_info.js` retrieves and displays the visitor's browser information, such as the browser name, version, and rendering engine.
2. `hardware.js` retrieves and displays the visitor's hardware information, including device type, model, brand, CPU architecture, memory (RAM), GPU information, battery status, APU, device pointing method, and maximum touch points.
3. `ip_info.js` retrieves and displays the visitor's IP information, including the source IP, foundation, intranet IP, source location, request IP, request location, ISP, IP hostname, and flags indicating if the IP is a proxy, Tor, VPN, or cloud server.
4. `screen_info.js` retrieves and displays the visitor's screen information, such as the screen width, height, pixel ratio, and color depth.

The Flask application integrates these JavaScript files into the HTML template (`index.html`), resulting in a web page that dynamically presents the visitor's computer information.


## API Keys
To use this application, you will need to obtain API keys for two external services: `ProxyCheck.io` and `IPQualityScore`. Follow the steps below to add the API keys to the project:

1. Create a file named `.env` in the project's root directory.
2. Open the `.env` file in a text editor.
3. Add the following lines to the file, replacing 'YOURS' with your actual API keys:

```.env
# ProxyCheck.io
PROXYCHECK_API_KEY = 'YOURS'

# IPQualityScore API
IPQUALITYSCORE_API_KEY = 'YOURS'
```

4. Save the .env file.
Make sure to obtain the API keys by signing up for the respective services on their websites:

* ProxyCheck.io: https://proxycheck.io/
* IPQualityScore: https://www.ipqualityscore.com/
  
By adding the API keys to the `.env` file, the Flask application will be able to access the external services and retrieve the necessary information.


## Deployment and Usage
To deploy and use the application, follow these steps:

1. Clone the project repository from GitHub.
2. Set up a virtual environment and activate it.
3. Install the required Python packages using the command `pip install -r requirements.txt`
4. Run the Flask application using the command `python app.py`
5. Access the application in a web browser by navigating to the provided URL.
Upon accessing the web page, the visitor's computer information will be fetched and displayed dynamically.



## Conclusion
This project demonstrates the use of Flask, JavaScript, and various Python libraries to create a web application that provides detailed information about the visitor's computer. It showcases the ability to retrieve and present hardware, IP, browser, and screen information in a user-friendly manner. The modular structure of the project allows for easy extension and customization to accommodate additional functionality or information.

該項目演示了使用 Flask、JavaScript 和各種 Python 庫來創建一個 Web 應用程序，該應用程序提供有關訪問者計算機的詳細信息。它展示了以用戶友好的方式檢索和呈現硬件、IP、瀏覽器和屏幕信息的能力。該項目的模塊化結構允許輕鬆擴展和定制以適應額外的功能或信息。
