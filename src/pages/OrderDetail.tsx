import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';
import { orderService, Order as OrderType } from '@/lib/order';
import { productService } from '@/services/productService';
import { getCurrentUser } from '@/services/authService';
import { IProduct } from '@/types';
import { formatPrice, normalizeProductName } from '@/lib/utils';
import { toast } from 'sonner';

interface OrderWithProducts extends Omit<OrderType, 'items'> {
  products: (IProduct & { quantity: number; size: string })[];
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusText = {
  pending: 'Chờ xác nhận',
  processing: 'Đang xử lý',
  shipped: 'Đang giao hàng',
  delivered: 'Đã giao hàng',
  cancelled: 'Đã hủy',
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!id) {
          setError('Mã đơn hàng không hợp lệ');
          return;
        }

        const currentUser = getCurrentUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }

        const orderData = orderService.getOrderById(Number(id));
        if (!orderData) {
          setError('Không tìm thấy đơn hàng');
          return;
        }

        // Kiểm tra quyền truy cập
        if (orderData.userId !== currentUser.id) {
          setError('Bạn không có quyền xem đơn hàng này');
          return;
        }

        // Lấy danh sách sản phẩm
        const products = await productService.getAllProducts();
        
        // Map sản phẩm với items trong đơn hàng
        const orderWithProducts: OrderWithProducts = {
          ...orderData,
          products: orderData.items.map(item => {
            // Tìm sản phẩm theo tên
            const product = products.find(p => p.name === item.productName);
            if (!product) {
              console.warn(`Không tìm thấy sản phẩm: ${item.productName}`);
              return null;
            }
            return {
              ...product,
              quantity: item.quantity,
              size: item.size,
              price: item.price
            };
          }).filter(Boolean) as (IProduct & { quantity: number; size: string })[]
        };

        setOrder(orderWithProducts);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Có lỗi xảy ra khi tải thông tin đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{error}</h2>
            <Button
              onClick={() => navigate('/orders')}
              variant="outline"
              className="inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách đơn hàng
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Không tìm thấy đơn hàng
            </h2>
            <Button
              onClick={() => navigate('/orders')}
              variant="outline" 
              className="inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách đơn hàng
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/profile')}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        {/* Order header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold mb-2">
                Đơn hàng #{order.orderNumber}
              </h1>
              <p className="text-gray-600">Đặt ngày {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
            <Badge className={statusColors[order.status]}>
              {statusText[order.status]}
            </Badge>
          </div>

          {/* Tracking info */}
          {order.trackingNumber && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-2">Thông tin vận chuyển</h3>
              <p className="text-gray-600">Mã vận đơn: {order.trackingNumber}</p>
              {order.estimatedDelivery && (
                <p className="text-gray-600">
                  Dự kiến giao hàng: {order.estimatedDelivery}
                </p>
              )}
            </div>
          )}

          {/* Order progress */}
          <div className="relative">
            <div className="flex justify-between mb-2">
              {['pending', 'processing', 'shipped', 'delivered'].map((step) => {
                const isCompleted = ['delivered', 'shipped', 'processing'].includes(order.status) && 
                  ['pending', 'processing', 'shipped'].includes(step);
                const isCurrent = order.status === step;
                
                return (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-6 h-6 rounded-full ${
                        isCompleted || isCurrent
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      } flex items-center justify-center`}
                    >
                      {isCompleted && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{statusText[step as keyof typeof statusText]}</p>
                  </div>
                );
              })}
            </div>
            <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{
                  width:
                    order.status === 'delivered'
                      ? '100%'
                      : order.status === 'shipped'
                      ? '66%'
                      : order.status === 'processing'
                      ? '33%'
                      : '0%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Order details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Products */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Sản phẩm</h2>
              <div className="space-y-4">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded cursor-pointer"
                      onClick={() => navigate(`/product/${normalizeProductName(product.name)}`)}
                    />
                    <div className="flex-1">
                      <h3 
                        className="font-medium hover:text-primary cursor-pointer"
                        onClick={() => navigate(`/product/${normalizeProductName(product.name)}`)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-gray-600">
                        Size: {product.size} | Số lượng: {product.quantity}
                      </p>
                      <p className="font-medium">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>
                    {formatPrice(
                      order.products.reduce(
                        (acc, product) => acc + product.price * product.quantity,
                        0
                      )
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span>
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Địa chỉ giao hàng</h2>
              <div className="space-y-2">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600">{order.shippingAddress.phone}</p>
                <p className="text-gray-600">{order.shippingAddress.address}</p>
                <p className="text-gray-600">{order.shippingAddress.city}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
              <p className="text-gray-600">
                {order.paymentMethod === 'cod' 
                  ? 'Thanh toán khi nhận hàng' 
                  : 'Chuyển khoản ngân hàng'}
              </p>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Bạn cần hỗ trợ?</h2>
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  Liên hệ hỗ trợ
                </Button>
                {order.status === 'pending' && (
                  <Button className="w-full" variant="destructive">
                    Hủy đơn hàng
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail; 