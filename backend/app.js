const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');

// Create Express app
const app = express();

// Middleware
app.use(morgan('dev')); // Logger middleware for logging HTTP requests
app.use(cors()); // CORS middleware for enabling Cross-Origin Resource Sharing

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/recipes', recipesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
