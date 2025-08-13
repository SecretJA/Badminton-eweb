import React, { useState } from 'react';
import Head from 'next/head';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from '../../lib/axios';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { FiStar, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Product {
  _id: string;
  name: string;
  image: string;
}

interface Review {
  _id: string;
  user: User;
  product: Product;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsResponse {
  reviews: Review[];
  totalReviews: number;
  totalPages: number;
  currentPage: number;
}

const AdminReviews = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Component để hiển thị hình ảnh với fallback
  const ProductImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);

    React.useEffect(() => {
      setImageError(false);
      setImageSrc(src);
    }, [src]);

    const handleImageError = () => {
      setImageError(true);
    };

    const getImageUrl = (url: string) => {
      if (!url) return '';
      if (url.startsWith('http')) return url;
      if (url.startsWith('/uploads')) return `http://localhost:5000${url}`;
      return `http://localhost:5000/uploads/${url}`;
    };

    if (imageError || !imageSrc) {
      return (
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      );
    }

    return (
      <img
        src={getImageUrl(imageSrc)}
        alt={alt}
        className={className}
        onError={handleImageError}
      />
    );
  };

  // Fetch reviews with pagination and filters
  const { data: reviewsData, isLoading, error } = useQuery(
    ['admin-reviews', currentPage, searchTerm, filterRating],
    async () => {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '10',
          ...(searchTerm && { search: searchTerm }),
          ...(filterRating && { rating: filterRating.toString() })
        });
        
        const response = await axios.get(`/products/reviews/all?${params}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      enabled: user?.role === 'admin',
      keepPreviousData: true,
      retry: 2
    }
  );

  // Delete review mutation
  const deleteReviewMutation = useMutation(
    async ({ productId, reviewId }: { productId: string; reviewId: string }) => {
      await axios.delete(`/api/products/${productId}/reviews/${reviewId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['admin-reviews']);
        toast.success('Đánh giá đã được xóa thành công!');
      },
      onError: () => {
        toast.error('Có lỗi xảy ra khi xóa đánh giá!');
      }
    }
  );

  const handleDeleteReview = (productId: string, reviewId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      deleteReviewMutation.mutate({ productId, reviewId });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Truy cập bị từ chối</h1>
            <p className="text-gray-600">Bạn không có quyền truy cập trang này.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Quản lý đánh giá - Admin</title>
      </Head>

      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý đánh giá</h1>
          <p className="text-gray-600">Xem và quản lý tất cả đánh giá sản phẩm</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên sản phẩm hoặc người dùng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FiFilter className="w-4 h-4" />
              Bộ lọc
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lọc theo rating
                  </label>
                  <select
                    value={filterRating || ''}
                    onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tất cả</option>
                    <option value="5">5 sao</option>
                    <option value="4">4 sao</option>
                    <option value="3">3 sao</option>
                    <option value="2">2 sao</option>
                    <option value="1">1 sao</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reviews List */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Đang tải...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center text-red-600">
              <p>Có lỗi xảy ra khi tải dữ liệu</p>
              <p className="text-sm mt-2">Chi tiết: {(error as any)?.message || 'Unknown error'}</p>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        ) : !reviewsData ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center text-gray-500">
              <p>Không có dữ liệu reviews</p>
              <p className="text-sm mt-2">User role: {user?.role}</p>
              <p className="text-sm">Enabled: {user?.role === 'admin' ? 'true' : 'false'}</p>
            </div>
          </div>
        ) : reviewsData?.reviews?.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center text-gray-500">
              <p>Không có đánh giá nào</p>
              <p className="text-sm mt-2">Total reviews in response: {reviewsData.totalReviews}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {reviewsData?.reviews?.map((review: Review) => (
              <div key={review._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Product Info */}
                  <div className="flex items-center gap-3 lg:w-1/4">
                    <ProductImage
                      src={review.product.image}
                      alt={review.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {review.product.name}
                      </h3>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {review.user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{review.user.name}</div>
                          <div className="text-sm text-gray-500">{review.user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-600">({review.rating}/5)</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <div className="text-sm text-gray-500 mb-3">
                      {formatDate(review.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteReview(review.product._id, review._id)}
                      disabled={deleteReviewMutation.isLoading}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Xóa đánh giá"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {reviewsData && reviewsData.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              
              {[...Array(reviewsData.totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 border rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(reviewsData.totalPages, currentPage + 1))}
                disabled={currentPage === reviewsData.totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}

        {/* Statistics */}
        {reviewsData && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thống kê</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{reviewsData.totalReviews}</div>
                <div className="text-sm text-gray-600">Tổng đánh giá</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{reviewsData.totalPages}</div>
                <div className="text-sm text-gray-600">Tổng trang</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{currentPage}</div>
                <div className="text-sm text-gray-600">Trang hiện tại</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminReviews;
