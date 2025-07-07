require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { encrypt } = require('../utils/encryption');

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

// Test admin creation with validation
const testCreateAdmin = async () => {
  try {
    console.log('🧪 Testing admin creation...');
    
    // Test data
    const adminData = {
      name: 'Test Admin',
      email: 'testadmin@badmintonshop.com',
      password: 'admin123456',
      phone: '0123456789', // Valid phone format
      role: 'admin',
      address: {
        street: '123 Test Street',
        city: 'Ho Chi Minh City',
        district: 'District 1',
        zipCode: '70000'
      },
      isActive: true
    };

    // Validate phone format
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(adminData.phone)) {
      console.log('❌ Invalid phone format');
      return;
    }

    console.log('✅ Phone format is valid');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      return;
    }

    // Create admin user
    const admin = await User.create({
      name: adminData.name,
      email: adminData.email,
      password: adminData.password,
      phone: encrypt(adminData.phone),
      role: adminData.role,
      address: {
        street: encrypt(adminData.address.street),
        city: adminData.address.city,
        district: adminData.address.district,
        zipCode: adminData.address.zipCode
      },
      isActive: adminData.isActive
    });

    console.log('✅ Admin user created successfully');
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`🔑 Password: ${adminData.password}`);
    console.log(`📱 Phone: ${adminData.phone}`);
    console.log(`🆔 User ID: ${admin._id}`);

  } catch (error) {
    console.error('❌ Failed to create admin:', error);
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.error(`  - ${key}: ${error.errors[key].message}`);
      });
    }
  }
};

// Main function
const main = async () => {
  console.log('🔧 Testing Admin Creation\n');
  
  try {
    // Connect to database
    await connectDB();
    
    // Test admin creation
    await testCreateAdmin();
    
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