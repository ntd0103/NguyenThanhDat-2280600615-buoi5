require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'User and Role Management API',
    endpoints: {
      users: {
        'POST /api/users': 'Create user',
        'GET /api/users': 'Get all users',
        'GET /api/users/:id': 'Get user by ID',
        'PUT /api/users/:id': 'Update user',
        'DELETE /api/users/:id': 'Soft delete user',
        'POST /api/users/enable': 'Enable user (requires email and username)',
        'POST /api/users/disable': 'Disable user (requires email and username)'
      },
      roles: {
        'POST /api/roles': 'Create role',
        'GET /api/roles': 'Get all roles',
        'GET /api/roles/:id': 'Get role by ID',
        'PUT /api/roles/:id': 'Update role',
        'DELETE /api/roles/:id': 'Soft delete role',
        'GET /api/roles/:id/users': 'Get all users with specific role'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
