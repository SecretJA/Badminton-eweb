const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
require('dotenv').config();

// Test admin system functionality
async function testAdminSystem() {
  try {
    console.log('🧪 Testing Admin System...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Check if admin user exists
    console.log('\n📋 Test 1: Check Admin User');
    const adminUser = await User.findOne({ role: 'admin' });
    if (adminUser) {
      console.log('✅ Admin user found:', adminUser.email);
    } else {
      console.log('❌ No admin user found. Please create one.');
    }

    // Test 2: Check products
    console.log('\n📋 Test 2: Check Products');
    const productCount = await Product.countDocuments();
    console.log(`✅ Found ${productCount} products`);

    // Test 3: Check orders
    console.log('\n📋 Test 3: Check Orders');
    const orderCount = await Order.countDocuments();
    console.log(`✅ Found ${orderCount} orders`);

    // Test 4: Check users
    console.log('\n📋 Test 4: Check Users');
    const userCount = await User.countDocuments();
    console.log(`✅ Found ${userCount} users`);

    // Test 5: Check product categories
    console.log('\n📋 Test 5: Check Product Categories');
    const categories = await Product.distinct('category');
    console.log('✅ Product categories:', categories);

    // Test 6: Check order statuses
    console.log('\n📋 Test 6: Check Order Statuses');
    const orderStatuses = await Order.distinct('status');
    console.log('✅ Order statuses:', orderStatuses);

    // Test 7: Check user roles
    console.log('\n📋 Test 7: Check User Roles');
    const userRoles = await User.distinct('role');
    console.log('✅ User roles:', userRoles);

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📝 Admin System Status:');
    console.log(`   - Admin Users: ${await User.countDocuments({ role: 'admin' })}`);
    console.log(`   - Regular Users: ${await User.countDocuments({ role: 'user' })}`);
    console.log(`   - Total Products: ${productCount}`);
    console.log(`   - Total Orders: ${orderCount}`);
    console.log(`   - Active Products: ${await Product.countDocuments({ isActive: true })}`);
    console.log(`   - Pending Orders: ${await Order.countDocuments({ status: 'pending' })}`);

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the test
testAdminSystem(); 