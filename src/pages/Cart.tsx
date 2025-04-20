import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { cartService } from '@/lib/cart';
import { productService } from '@/services/productService';
import { IProduct } from '@/types';
import { formatPrice } from '@/lib/utils';
import authService from '@/services/authService';
import { toast } from 'sonner';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartItemWithProduct extends CartItem {
  product: IProduct;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      setLoading(true);
      try {
        const products = await productService.getAllProducts();
        const currentCart = cartService.getCartItems();
        
        const cartWithProducts = currentCart.map(item => ({
          ...item,
          product: products.find(p => p.id === item.productId)!
        }));

        setCartItems(cartWithProducts.filter(item => item.product));
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
      setLoading(false);
    };

    loadCartItems();
  }, []);

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      cartService.removeFromCart(productId, '');
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } else {
      cartService.updateQuantity(productId, newQuantity, '');
      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (productId: number) => {
    cartService.removeFromCart(productId, '');
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

  const handleCheckout = () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập để tiếp tục');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }

    navigate('/checkout');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-8">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
            <Button asChild className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white">
              <Link to="/products">Khám phá sản phẩm</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-medium mb-8">Giỏ hàng</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.productId} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
                <Link to={`/product/${item.productId}`} className="shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </Link>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-lg font-medium hover:text-[#1a1a1a] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-gray-600 text-sm">{item.product.brand}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#1a1a1a]">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.product.price)} / sản phẩm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-medium mb-4">Tổng giỏ hàng</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium text-lg mb-6">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white"
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
