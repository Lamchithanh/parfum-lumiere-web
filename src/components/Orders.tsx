import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, orderService } from '@/lib/order';
import { getCurrentUser } from '@/services/authService';
import { productService } from '@/services/productService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice, normalizeProductName } from '@/lib/utils';
import { Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { IProduct } from '@/types';

interface OrderWithProducts extends Order {
  products: (IProduct & { quantity: number; size: string })[];
}

const ITEMS_PER_PAGE = 5;

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = orders.slice(startIndex, endIndex);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }

        // Lấy tất cả sản phẩm
        const products = await productService.getAllProducts();
        
        // Lấy đơn hàng và map với thông tin sản phẩm
        const userOrders = orderService.getUserOrders(currentUser.id);
        const ordersWithProducts = userOrders.map(order => ({
          ...order,
          products: order.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return null;
            return {
              ...product,
              quantity: item.quantity,
              size: item.size,
              price: item.price
            };
          }).filter(Boolean)
        }));

        setOrders(ordersWithProducts);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'processing':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'shipped':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'delivered':
        return 'bg-green-500 hover:bg-green-600';
      case 'cancelled':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? "bg-[#1a1a1a] text-white" : ""}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Chưa có đơn hàng</h3>
        <p className="mt-2 text-gray-500">Bạn chưa có đơn hàng nào.</p>
        <Button className="mt-4" onClick={() => navigate('/products')}>
          Mua sắm ngay
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Đơn hàng của tôi</h2>
        <Button variant="outline" size="sm" onClick={() => navigate('/orders')}>
          Xem tất cả
        </Button>
      </div>

      {currentOrders.map((order) => (
        <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">
                  Đơn hàng #{order.id}
                </h3>
                <p className="text-sm text-gray-500">
                  Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {getStatusText(order.status)}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Sản phẩm</h4>
                <div className="space-y-3">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-16 h-16 bg-center bg-cover rounded-md border border-gray-100" 
                        style={{ 
                          backgroundImage: `url(${product.images?.[0] || '/images/placeholder.jpg'})` 
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm truncate hover:text-primary cursor-pointer" 
                            onClick={() => navigate(`/product/${normalizeProductName(product.name)}`)}>
                          {product.name}
                        </h5>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-xs text-gray-600">
                            <span>{product.size}</span>
                            <span className="mx-1">•</span>
                            <span>SL: {product.quantity}</span>
                          </div>
                          <span className="text-sm font-medium">
                            {formatPrice(product.price * product.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-600">
                  {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                </div>
                <div className="text-right">
                  <span className="text-gray-600">Tổng cộng: </span>
                  <span className="font-bold text-primary ml-1">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                Xem chi tiết
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {renderPagination()}
    </div>
  );
};

export default Orders; 