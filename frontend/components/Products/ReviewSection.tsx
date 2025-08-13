import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { FiStar, FiUser } from 'react-icons/fi';
import axios from '../../lib/axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSectionProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  productId, 
  reviews, 
  averageRating, 
  totalReviews 
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Check if user already reviewed
  const hasReviewed = user && reviews.some(review => review.user._id === user._id);

  // Submit review mutation
  const submitReviewMutation = useMutation(
    async (reviewData: { rating: number; comment: string }) => {
      const response = await axios.post(`/products/${productId}/reviews`, reviewData);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Đánh giá của bạn đã được gửi!');
        setShowReviewForm(false);
        setRating(5);
        setComment('');
        queryClient.invalidateQueries(['product', productId]);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
      }
    }
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim().length < 10) {
      toast.error('Bình luận phải có ít nhất 10 ký tự');
      return;
    }
    submitReviewMutation.mutate({ rating, comment: comment.trim() });
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-12">
      {/* Review Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Đánh giá sản phẩm</h3>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-sm text-gray-600">{totalReviews} đánh giá</div>
          </div>
          
          {/* Rating Distribution */}
          <div className="flex-1 max-w-md">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter(r => r.rating === star).length;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center text-sm mb-1">
                  <span className="w-3">{star}</span>
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current mx-1" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Form */}
        {user && !hasReviewed && (
          <div className="border-t pt-6">
            {!showReviewForm ? (
              <button
                onClick={() => setShowReviewForm(true)}
                className="btn-primary"
              >
                Viết đánh giá
              </button>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đánh giá của bạn
                  </label>
                  {renderStars(rating, true)}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bình luận
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    maxLength={500}
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {comment.length}/500 ký tự
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={submitReviewMutation.isLoading}
                    className="btn-primary"
                  >
                    {submitReviewMutation.isLoading ? 'Đang gửi...' : 'Gửi đánh giá'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="btn-secondary"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {hasReviewed && (
          <div className="border-t pt-6">
            <p className="text-sm text-gray-600">
              Bạn đã đánh giá sản phẩm này. Cảm ơn phản hồi của bạn!
            </p>
          </div>
        )}

        {!user && (
          <div className="border-t pt-6">
            <p className="text-sm text-gray-600">
              <a href="/login" className="text-primary-600 hover:text-primary-700">
                Đăng nhập
              </a>{' '}
              để viết đánh giá
            </p>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-gray-500" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{review.name}</h4>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
        
        {reviews.length === 0 && (
          <div className="text-center py-12">
            <FiStar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có đánh giá nào
            </h3>
            <p className="text-gray-600">
              Hãy là người đầu tiên đánh giá sản phẩm này!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
