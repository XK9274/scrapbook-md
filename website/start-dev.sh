#!/bin/bash

# Start the API server in the background
echo "starting TODO API server on port 3001..."
node server.js &

# Start Docusaurus dev server
echo "starting Docusaurus dev server on port 3000..."
npm start -- --host 0.0.0.0 --port 3000

# Wait for any process to exit
wait