const express = require('express');
const cors = require('cors');
const corsOptions = require('./cors');
const routes = require('../routes');
const errorHandler = require('../middleware/errorHandler');

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

module.exports = app;