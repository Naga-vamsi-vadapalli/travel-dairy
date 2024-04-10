// app.js (or index.js)

// Import required modules
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const diaryEntryRoutes = require('./routes/diaryEntryRoutes');
const errorHandler = require('./middleware/errorMiddleware');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/diaryEntries', diaryEntryRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
