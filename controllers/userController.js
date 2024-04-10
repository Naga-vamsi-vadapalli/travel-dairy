// controllers/userController.js

const User = require('../models/User');

const UserController = {
  register: async (req, res) => {
    try {
      // Extract user data from request body
      const { username, email, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      user = new User({ username, email, password });

      // Save user to database
      await user.save();

      res.status(201).json({ message: 'User registered successfully', data: user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  login: async (req, res) => {
    try {
      // Extract user data from request body
      const { email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Validate password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // User authenticated, generate token
      const token = user.generateAuthToken();

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getUserProfile: async (req, res) => {
    try {
      // Get user profile data from request
      const { userId } = req.params;

      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ data: user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      // Get user ID from request params
      const { userId } = req.params;

      // Update user profile with data from request body
      const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User profile updated successfully', data: user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  deleteUser: async (req, res) => {
    try {
      // Get user ID from request params
      const { userId } = req.params;

      // Delete user from database
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = UserController;
