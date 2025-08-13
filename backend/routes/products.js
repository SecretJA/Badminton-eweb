const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @desc    Get all products with filtering and pagination
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('Products query params:', req.query);
    
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
            { brand: { $regex: req.query.keyword, $options: 'i' } },
            { category: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {};

    const categoryFilter = req.query.category ? { category: req.query.category } : {};
    const brandFilter = req.query.brand ? { brand: req.query.brand } : {};
    
    // Handle price range filter
    let priceFilter = {};
    if (req.query.priceRange) {
      const [minPrice, maxPrice] = req.query.priceRange.split('-').map(Number);
      priceFilter = {
        price: {
          $gte: minPrice,
          $lte: maxPrice
        }
      };
    } else if (req.query.minPrice || req.query.maxPrice) {
      priceFilter = {
        price: {
          ...(req.query.minPrice && { $gte: Number(req.query.minPrice) }),
          ...(req.query.maxPrice && { $lte: Number(req.query.maxPrice) })
        }
      };
    }

    const filters = {
      ...keyword,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      isActive: true
    };

    console.log('Applied filters:', JSON.stringify(filters, null, 2));

    const count = await Product.countDocuments(filters);
    const products = await Product.find(filters)
      .populate('reviews.user', 'name')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Get user's favorite products
// @route   GET /api/products/favorites
// @access  Private
router.get('/favorites', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Get product brands
// @route   GET /api/products/brands
// @access  Public
router.get('/brands', async (req, res) => {
  try {
    const brands = await Product.distinct('brand');
    res.json(brands);
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ 
      isFeatured: true, 
      isActive: true 
    })
    .populate('reviews.user', 'name')
    .limit(8);

    res.json(products);
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('reviews.user', 'name');

    if (product && product.isActive) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    console.error('Get product error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Tên sản phẩm phải từ 2-100 ký tự'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Mô tả phải từ 10-1000 ký tự'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Giá phải là số dương'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Số lượng tồn kho phải là số nguyên không âm'),
  body('category')
    .isIn(['Vợt cầu lông', 'Cầu lông', 'Giày cầu lông', 'Túi đựng vợt', 'Quần áo cầu lông', 'Phụ kiện'])
    .withMessage('Danh mục không hợp lệ'),
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Thương hiệu là bắt buộc'),
  body('mainImage')
    .notEmpty()
    .withMessage('Hình ảnh chính là bắt buộc')
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

    const product = new Product(req.body);
    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Tên sản phẩm phải từ 2-100 ký tự'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Mô tả phải từ 10-1000 ký tự'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Giá phải là số dương'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Số lượng tồn kho phải là số nguyên không âm')
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

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Update product specifications
// @route   PUT /api/products/:id/specifications
// @access  Private/Admin
router.put('/:id/specifications', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Update specifications
    product.specifications = {
      ...product.specifications,
      ...req.body
    };

    const updatedProduct = await product.save();
    res.json({
      message: 'Cập nhật thông số kỹ thuật thành công',
      specifications: updatedProduct.specifications
    });
  } catch (error) {
    console.error('Update specifications error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    await product.remove();
    res.json({ message: 'Sản phẩm đã được xóa' });
  } catch (error) {
    console.error('Delete product error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Đánh giá phải từ 1-5 sao'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Bình luận phải từ 10-500 ký tự')
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

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này' });
    }

    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Đánh giá đã được thêm' });
  } catch (error) {
    console.error('Create review error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Get all reviews (Admin)
// @route   GET /api/products/reviews/all
// @access  Private/Admin
router.get('/reviews/all', protect, admin, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || '';
    const rating = req.query.rating ? Number(req.query.rating) : null;

    const products = await Product.find({ 'reviews.0': { $exists: true } })
      .populate({
        path: 'reviews.user',
        select: 'name email',
        options: { strictPopulate: false }
      })
      .select('name mainImage reviews')
      .sort({ 'reviews.createdAt': -1 });

    // Flatten all reviews with product info
    const allReviews = [];
    products.forEach(product => {
      product.reviews.forEach(review => {
        // Handle case where user might not exist
        const userInfo = review.user || { name: review.name || 'Unknown User', email: '' };
        
        allReviews.push({
          _id: review._id,
          product: {
            _id: product._id,
            name: product.name,
            image: product.mainImage
          },
          user: {
            _id: userInfo._id || '',
            name: userInfo.name || review.name || 'Unknown User',
            email: userInfo.email || ''
          },
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt
        });
      });
    });

    // Filter by search
    let filteredReviews = allReviews;
    if (search) {
      filteredReviews = allReviews.filter(review => 
        review.product.name.toLowerCase().includes(search.toLowerCase()) ||
        review.user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by rating
    if (rating) {
      filteredReviews = filteredReviews.filter(review => review.rating === rating);
    }

    // Sort by date and paginate
    filteredReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const total = filteredReviews.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

    res.json({
      reviews: paginatedReviews,
      totalReviews: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// @desc    Delete a review (Admin)
// @route   DELETE /api/products/:productId/reviews/:reviewId
// @access  Private/Admin
router.delete('/:productId/reviews/:reviewId', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    const reviewIndex = product.reviews.findIndex(
      review => review._id.toString() === req.params.reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }

    // Remove review
    product.reviews.splice(reviewIndex, 1);
    
    // Recalculate rating and numReviews
    product.numReviews = product.reviews.length;
    if (product.reviews.length > 0) {
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    } else {
      product.rating = 0;
    }

    await product.save();
    res.json({ message: 'Đánh giá đã được xóa' });
  } catch (error) {
    console.error('Delete review error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm hoặc đánh giá' });
    }
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Add product to favorites
// @route   POST /api/products/:id/favorite
// @access  Private
router.post('/:id/favorite', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.favorites.includes(req.params.id)) {
      user.favorites.push(req.params.id);
      await user.save();
    }
    res.json({ message: 'Đã thêm vào yêu thích' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @desc    Remove product from favorites
// @route   DELETE /api/products/:id/favorite
// @access  Private
router.delete('/:id/favorite', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.favorites = user.favorites.filter(pid => pid.toString() !== req.params.id);
    await user.save();
    res.json({ message: 'Đã xóa khỏi yêu thích' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});



module.exports = router; 