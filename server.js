// server.js
const express = require('express');
const path = require('path');
const uploadRoute = require('./api/uploadimage');
const listRoute = require('./api/listimages');

const app = express();
const PORT = 3000;

// Serve static files (like index.html, CSS, JS)
app.use(express.static(path.join(__dirname)));

// API routes
app.use('/api', uploadRoute);
app.use('/api', listRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
