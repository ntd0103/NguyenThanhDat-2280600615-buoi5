const User = require('../models/User');

// Create User
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all Users (excluding soft deleted)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }).populate('role');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ 
      _id: req.params.id, 
      isDeleted: false 
    }).populate('role');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('role');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Soft Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Enable User
exports.enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    
    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email and username are required'
      });
    }
    
    const user = await User.findOne({ 
      email, 
      username,
      isDeleted: false 
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with provided email and username'
      });
    }
    
    user.status = true;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'User enabled successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Disable User
exports.disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    
    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email and username are required'
      });
    }
    
    const user = await User.findOne({ 
      email, 
      username,
      isDeleted: false 
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with provided email and username'
      });
    }
    
    user.status = false;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'User disabled successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
