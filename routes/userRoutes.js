const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD Routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Enable/Disable Routes
router.post('/enable', userController.enableUser);
router.post('/disable', userController.disableUser);

module.exports = router;
