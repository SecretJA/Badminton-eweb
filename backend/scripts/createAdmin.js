require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { encrypt } = require('../utils/encryption');
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

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      return;
    }

    // Create admin user
    const adminData = {
      name: 'Admin',
      email: 'admin@badmintonshop.com', // Temporarily store plain email
      password: 'admin123456',
      phone: encrypt('0123456789'), // Use valid phone format
      role: 'admin',
      address: {
        street: encrypt('123 Admin Street'),
        city: 'Ho Chi Minh City',
        district: 'District 1',
        zipCode: '70000'
      },
      isActive: true
    };

    const admin = await User.create(adminData);
    console.log('✅ Admin user created successfully');
    console.log(`📧 Email: admin@badmintonshop.com`);
    console.log(`🔑 Password: admin123456`);
    console.log(`🆔 User ID: ${admin._id}`);

  } catch (error) {
    console.error('❌ Failed to create admin:', error);
  }
};

// Main function
const main = async () => {
  console.log('🔧 Creating Admin User\n');
  
  try {
    // Connect to database
    await connectDB();
    
    // Create admin
    await createAdmin();
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
main(); 