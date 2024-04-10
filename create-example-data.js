const mongoose = require('mongoose');
const DiaryEntry = require('./models/DiaryEntry');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travel-diary', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const sampleEntries = [
  {
    title: 'Trip to Paris',
    description: 'A wonderful trip to the city of love',
    date: new Date('2023-01-15'),
    location: 'Paris, France',
    photos: ['paris1.jpg', 'paris2.jpg'],
  },
  {
    title: 'Beach Vacation',
    description: 'Relaxing time spent on the beach',
    date: new Date('2023-07-20'),
    location: 'Maui, Hawaii',
    photos: ['beach1.jpg', 'beach2.jpg'],
  },
  // Add more sample entries as needed
];

// Function to create sample entries
const createSampleEntries = async () => {
  try {
    // Delete existing entries
    await DiaryEntry.deleteMany();

    // Create sample entries
    await DiaryEntry.insertMany(sampleEntries);

    console.log('Sample entries created successfully');
  } catch (err) {
    console.error('Error creating sample entries:', err.message);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Call function to create sample entries
createSampleEntries();
