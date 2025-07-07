require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

// Test user creation
const testUserCreation = async () => {
  try {
    console.log('🧪 Testing user creation...');
    
    // Create test user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phone: '0123456789',
      role: 'customer',
      isActive: true
    });
    
    console.log('✅ Test user created:', testUser.email);
    return testUser;
  } catch (error) {
    console.error('❌ User creation failed:', error);
    return null;
  }
};

// Test user login
const testUserLogin = async (email, password) => {
  try {
    console.log('🧪 Testing user login...');
    
    // Find user
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log('❌ User not found');
      return false;
    }
    
    console.log('✅ User found:', user.email);
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      console.log('✅ Password match');
      return true;
    } else {
      console.log('❌ Password mismatch');
      return false;
    }
  } catch (error) {
    console.error('❌ Login test failed:', error);
    return false;
  }
};

// List all users
const listUsers = async () => {
  try {
    console.log('📋 Listing all users...');
    const users = await User.find({});
    console.log(`Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });
  } catch (error) {
    console.error('❌ Failed to list users:', error);
  }
};

// Main function
const main = async () => {
  console.log('🔧 Testing Authentication System\n');
  
  try {
    // Connect to database
    await connectDB();
    
    // List existing users
    await listUsers();
    console.log('');
    
    // Test user creation
    const testUser = await testUserCreation();
    console.log('');
    
    if (testUser) {
      // Test login
      await testUserLogin('test@example.com', 'password123');
      console.log('');
    }
    
    // List users again
    await listUsers();
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
main(); 