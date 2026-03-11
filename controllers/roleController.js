const Role = require('../models/Role');

// Create Role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all Roles (excluding soft deleted)
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get Role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({ 
      _id: req.params.id, 
      isDeleted: false 
    });
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update Role
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Soft Delete Role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Role deleted successfully',
      data: role
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all users by role ID
exports.getUsersByRoleId = async (req, res) => {
  try {
    const User = require('../models/User');
    
    // Check if role exists
    const role = await Role.findOne({ 
      _id: req.params.id, 
      isDeleted: false 
    });
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    
    // Get all users with this role (excluding soft deleted users)
    const users = await User.find({ 
      role: req.params.id,
      isDeleted: false 
    }).populate('role');
    
    res.status(200).json({
      success: true,
      role: role.name,
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
