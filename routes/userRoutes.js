// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const validate = require('../middleware/validationMiddleware'); // Import validation middleware

// User registration route with validation
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], validate, userController.register);

// User login route
router.post('/login', userController.login);

// Update user route with validation
router.put('/:id', [
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('password').optional().notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], validate, userController.update);

// Delete user route
router.delete('/:id', userController.deleteUser);

module.exports = router;
