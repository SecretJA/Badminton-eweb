const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @desc    Get admin stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue from completed orders
    const completedOrders = await Order.find({ 
      status: 'delivered',
      paymentStatus: 'paid'
    });
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    const pageSize = 50;
    const page = Number(req.query.pageNumber) || 1;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const isActive = req.query.isActive || '';

    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) {
      query.role = role;
    }
    
    if (isActive !== '') {
      query.isActive = isActive === 'true';
    }

    const count = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      users,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Update user role (Admin only)
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
router.put('/users/:id/role', protect, admin, [
  body('role')
    .isIn(['user', 'admin'])
    .withMessage('Quyền hạn không hợp lệ')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dữ liệu không hợp lệ',
        errors: errors.array() 
      });
    }

    const { role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Prevent admin from changing their own role
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Bạn không thể thay đổi quyền của chính mình' });
    }

    user.role = role;
    await user.save();

    res.json({ message: 'Cập nhật quyền người dùng thành công' });
  } catch (error) {
    console.error('Update user role error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Update user status (Admin only)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
router.put('/users/:id/status', protect, admin, [
  body('isActive')
    .isBoolean()
    .withMessage('Trạng thái không hợp lệ')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dữ liệu không hợp lệ',
        errors: errors.array() 
      });
    }

    const { isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Prevent admin from deactivating themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Bạn không thể thay đổi trạng thái của chính mình' });
    }

    user.isActive = isActive;
    await user.save();

    res.json({ message: 'Cập nhật trạng thái người dùng thành công' });
  } catch (error) {
    console.error('Update user status error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Bạn không thể xóa chính mình' });
    }

    await user.remove();
    res.json({ message: 'Người dùng đã được xóa' });
  } catch (error) {
    console.error('Delete user error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Get all orders (Admin only)
// @route   GET /api/admin/orders
// @access  Private/Admin
router.get('/orders', protect, admin, async (req, res) => {
  try {
    console.log('Admin orders query params:', req.query);
    
    const pageSize = 50;
    const page = Number(req.query.pageNumber) || 1;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const paymentStatus = req.query.paymentStatus || '';

    console.log('Filters - status:', status, 'paymentStatus:', paymentStatus);

    let query = {};
    
    if (search) {
      query.$or = [
        { 'user.name': { $regex: search, $options: 'i' } },
        { 'user.email': { $regex: search, $options: 'i' } },
        { _id: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      query.status = status;
    }
    
    if (paymentStatus) {
      console.log('Processing payment status filter:', paymentStatus);
      if (paymentStatus === 'paid') {
        query.isPaid = true;
        console.log('Set query.isPaid = true');
      } else if (paymentStatus === 'unpaid') {
        query.$or = [
          { isPaid: false },
          { isPaid: { $exists: false } },
          { isPaid: null }
        ];
        console.log('Set query.$or for unpaid orders');
      }
      console.log('Applied payment filter:', { paymentStatus, query: JSON.stringify(query) });
    }

    console.log('Final query before database call:', JSON.stringify(query, null, 2));

    // First, let's check all orders to see what we have
    const allOrders = await Order.find({}).select('_id isPaid').limit(5);
    console.log('Sample of all orders in DB:', allOrders.map(o => ({ id: o._id.toString().slice(-8), isPaid: o.isPaid })));

    const count = await Order.countDocuments(query);
    console.log('Found orders count with query:', count);
    
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name mainImage')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    console.log('Retrieved orders:', orders.length);
    console.log('Orders isPaid values:', orders.map(o => ({ id: o._id.toString().slice(-8), isPaid: o.isPaid })));

    res.json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Get admin orders error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Fix orders isPaid field
// @route   POST /api/admin/fix-orders
// @access  Private/Admin
router.post('/fix-orders', protect, admin, async (req, res) => {
  try {
    // Update all orders without isPaid field
    const result = await Order.updateMany(
      { 
        $or: [
          { isPaid: { $exists: false } },
          { isPaid: null }
        ]
      },
      { 
        $set: { isPaid: false } 
      }
    );
    
    // Show current stats
    const totalOrders = await Order.countDocuments({});
    const paidOrders = await Order.countDocuments({ isPaid: true });
    const unpaidOrders = await Order.countDocuments({ isPaid: false });
    
    res.json({
      message: `Fixed ${result.modifiedCount} orders`,
      stats: {
        total: totalOrders,
        paid: paidOrders,
        unpaid: unpaidOrders
      }
    });
  } catch (error) {
    console.error('Fix orders error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router; 