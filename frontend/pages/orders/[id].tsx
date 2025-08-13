import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from '../../lib/axios';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { ProtectedRoute } from '../../components/Auth';
import { FiPackage } from 'react-icons/fi';

const OrderDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: order, isLoading, error } = useQuery(
    ['order', id],
    async () => {
      const response = await axios.get(`/orders/${id}`);
      return response.data;
    },
    { enabled: !!id }
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'confirmed': return 'Đã xác nhận';
      case 'shipped': return 'Đang giao hàng';
      case 'delivered': return 'Đã giao hàng';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute requireAuth>
        <Header />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ProtectedRoute>
    );
  }

  if (error || !order) {
    return (
      <ProtectedRoute requireAuth>
        <Header />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <FiPackage className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy đơn hàng</h3>
              <p className="text-gray-600 mb-6">
                Đơn hàng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              <button
                onClick={() => router.push('/orders')}
                className="btn-primary"
              >
                Quay lại danh sách đơn hàng
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAuth>
      <Head>
        <title>Chi tiết đơn hàng #{order._id?.toString().slice(-8).toUpperCase()} - Badminton Shop</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/orders')}
              className="text-gray-600 hover:text-gray-800 mb-4 flex items-center"
            >
              ← Quay lại danh sách đơn hàng
            </button>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                Đơn hàng #{order._id?.toString().slice(-8).toUpperCase()}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            <p className="text-gray-600 mt-2">
              Đặt lúc {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Sản phẩm đã đặt</h2>
                <div className="space-y-4">
                  {(order.orderItems || []).map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || item.product?.mainImage || '/placeholder-product.jpg'}
                          alt={item.name || item.product?.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.name || item.product?.name}
                        </h3>
                        <p className="text-gray-600">
                          Số lượng: {item.quantity}
                        </p>
                        <p className="text-gray-600">
                          Đơn giá: {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span>{formatPrice(order.itemsPrice || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span>{formatPrice(order.shippingPrice || 0)}</span>
                  </div>
                  {order.taxPrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thuế:</span>
                      <span>{formatPrice(order.taxPrice)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Tổng cộng:</span>
                      <span className="text-primary-600">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Địa chỉ giao hàng</h3>
                <div className="text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">{order.shippingAddress?.name}</p>
                  <p>{order.shippingAddress?.phone}</p>
                  <p>
                    {order.shippingAddress?.address?.street}
                  </p>
                  <p>
                    {order.shippingAddress?.address?.district}, {order.shippingAddress?.address?.city}
                  </p>
                  {order.shippingAddress?.address?.zipCode && (
                    <p>{order.shippingAddress.address.zipCode}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
                <p className="text-gray-600">
                  {order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : order.paymentMethod}
                </p>
                {order.isPaid && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ Đã thanh toán lúc {formatDate(order.paidAt)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
};

export default OrderDetailPage; 