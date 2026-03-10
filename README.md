Node Farm
A simple, dynamic web application built with Node.js that serves as a product overview and detail page for a fictional fruit shop. This project demonstrates the fundamentals of Node.js, including server creation, routing, and file system manipulation without the use of external frameworks like Express.

Features
Dynamic Routing: Handles routes for the homepage, product overview, individual product details, and a dedicated JSON API.

Server-Side Templating: Uses a custom replacement function to inject data from a JSON file into HTML templates ({%PRODUCTNAME%}, {%IMAGE%}, etc.).

File System (fs) Module: Demonstrates both synchronous (blocking) and asynchronous (non-blocking) methods for reading and writing files.

Built-in API: A /api route that serves raw product data in JSON format directly from the server.

Responsive Design: Includes CSS styling for a modern, card-based layout with "Organic" badges and hover effects.

Project Structure
index.js: The main entry point containing the HTTP server logic and routing.

dev-data/data.json: The data source containing product information like names, prices, and nutrients.

templates/: Contains HTML files used for the UI layout:

template-overview.html: The main container for the product list.

template-card.html: The reusable component for individual product cards.

template-product.html: The detailed view for a single selected product.

txt/: Examples of file system operations, including reading and writing text files.

Getting Started
Prerequisites
Node.js installed on your local machine.

Installation
Clone the repository:

Bash
git clone <your-repository-url>
Navigate to the project directory:

Bash
cd node-farm
Running the App
Start the server by running:

Bash
node index.js
The server will start listening on http://127.0.0.1:8000.

Available Routes
/ or /overview: Displays all products in a card-based grid.

/product?id=0: Displays the details for a specific product based on its ID.

/api: Returns the full product data in JSON format.
