require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const logRoutes = require('./routes/log');
const foodRoutes = require('./routes/food');

// Initialize Express app
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const USE_MONGODB = false; // Running without MongoDB

// In-memory data storage
global.inMemoryDB = {
  users: [],
  logs: [],
  foods: []
};

// Seed in-memory food data
const seedInMemoryFood = () => {
  global.inMemoryDB.foods = [
    // Lose Weight
    { id: 1, goalType: 'Lose Weight', name: 'Grilled Chicken Salad', calories: 280, protein: 35, imageURL: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
    { id: 2, goalType: 'Lose Weight', name: 'Greek Yogurt with Berries', calories: 150, protein: 15, imageURL: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
    { id: 3, goalType: 'Lose Weight', name: 'Vegetable Soup', calories: 120, protein: 8, imageURL: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' },
    { id: 4, goalType: 'Lose Weight', name: 'Quinoa Bowl', calories: 220, protein: 10, imageURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
    { id: 5, goalType: 'Lose Weight', name: 'Steamed Fish', calories: 180, protein: 30, imageURL: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
    { id: 6, goalType: 'Lose Weight', name: 'Green Smoothie', calories: 140, protein: 6, imageURL: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400' },
    // Gain Muscle
    { id: 7, goalType: 'Gain Muscle', name: 'Chicken Breast & Rice', calories: 550, protein: 50, imageURL: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400' },
    { id: 8, goalType: 'Gain Muscle', name: 'Protein Shake', calories: 320, protein: 40, imageURL: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400' },
    { id: 9, goalType: 'Gain Muscle', name: 'Salmon with Sweet Potato', calories: 480, protein: 42, imageURL: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400' },
    { id: 10, goalType: 'Gain Muscle', name: 'Beef Steak & Vegetables', calories: 520, protein: 45, imageURL: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400' },
    { id: 11, goalType: 'Gain Muscle', name: 'Eggs & Avocado Toast', calories: 420, protein: 25, imageURL: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400' },
    { id: 12, goalType: 'Gain Muscle', name: 'Tuna & Pasta', calories: 580, protein: 38, imageURL: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400' },
    // Stay Fit
    { id: 13, goalType: 'Stay Fit', name: 'Mixed Fruit Bowl', calories: 180, protein: 4, imageURL: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=400' },
    { id: 14, goalType: 'Stay Fit', name: 'Whole Grain Sandwich', calories: 320, protein: 18, imageURL: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400' },
    { id: 15, goalType: 'Stay Fit', name: 'Oatmeal with Nuts', calories: 280, protein: 12, imageURL: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400' },
    { id: 16, goalType: 'Stay Fit', name: 'Veggie Wrap', calories: 340, protein: 15, imageURL: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400' },
    { id: 17, goalType: 'Stay Fit', name: 'Buddha Bowl', calories: 380, protein: 20, imageURL: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400' },
    { id: 18, goalType: 'Stay Fit', name: 'Poke Bowl', calories: 420, protein: 28, imageURL: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400' }
  ];
};

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Initialize in-memory data on first request
let isInitialized = false;
app.use((req, res, next) => {
  if (!isInitialized) {
    seedInMemoryFood();
    isInitialized = true;
    console.log('📦 In-memory data initialized');
  }
  next();
});

// Logging middleware for development
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/log', logRoutes);
app.use('/api/food', foodRoutes);

// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

// Catch-all route - serve index.html for any other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

/**
 * Start the server (without MongoDB)
 */
async function startServer() {
  try {
    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.warn('⚠️  WARNING: JWT_SECRET is not set. Using default (not secure for production)');
      process.env.JWT_SECRET = 'default-secret-key-change-this-in-production';
    }

    // Seed in-memory food data
    if (!isInitialized) {
      console.log('📦 Loading food data into memory...');
      seedInMemoryFood();
      isInitialized = true;
      console.log(`✅ Loaded ${global.inMemoryDB.foods.length} food items`);
    }

    // Start Express server (skip in Vercel serverless)
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🏋️‍♂️  CultFit Clone Server Running');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📍 Server: http://localhost:${PORT}`);
        console.log(`🔗 API: http://localhost:${PORT}/api`);
        console.log(`💾 Database: In-Memory (no persistence)`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✨ Ready to track fitness!');
        console.log('⚠️  Note: Data will be lost on server restart');
        console.log('Press Ctrl+C to stop the server');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      });
    }

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  console.log('✅ Server closed');
  process.exit(0);
});

// Start the server (only in non-serverless environment)
if (require.main === module) {
  startServer();
}

module.exports = app;
