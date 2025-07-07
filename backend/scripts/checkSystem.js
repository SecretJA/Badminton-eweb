require('dotenv').config();
const mongoose = require('mongoose');
const { runAllChecks } = require('../utils/syncCheck');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Main function
const main = async () => {
  console.log('🔧 Badminton Shop - System Check Tool\n');
  
  try {
    // Connect to database
    await connectDB();
    
    // Run all checks
    const success = await runAllChecks();
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    
    // Exit with appropriate code
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('❌ System check failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
main(); 