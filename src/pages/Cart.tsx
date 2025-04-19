
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { ICartItem, IProduct, IProductVariant } from '@/types';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock data - trong thực tế sẽ lấy từ context hoặc redux store
const mockProducts: IProduct[] = [
  {
    id: "p1",
    name: "Parfum Lumière No.1",
    brand: "Parfum Lumière",
    description: "Hương thơm quyến rũ với notes hoa hồng và vanilla",
    images: ["/placeholder.svg"],
    category: "Women",
    scent_notes: ["Hoa hồng", "Vanilla", "Gỗ đàn hương"],
    variants: [
      { id: "v1", capacity: "50ml", price: 2500000, stock: 10 },
      { id: "v2", capacity: "100ml", price: 4500000, stock: 5 }
    ],
    rating: 4.5,
    reviews: [],
    featured: true,
    new_arrival: true
  },
  {
    id: "p2",
    name: "Parfum Lumière No.2",
    brand: "Parfum Lumière",
    description: "Hương thơm mạnh mẽ dành cho nam giới",
    images: ["/placeholder.svg"],
    category: "Men",
    scent_notes: ["Gỗ đàn hương", "Hổ phách", "Quả cam"],
    variants: [
      { id: "v3", capacity: "50ml", price: 2700000, stock: 10 },
      { id: "v4", capacity: "100ml", price: 4800000, stock: 5 }
    ],
    rating: 4.7,
    reviews: [],
    featured: true,
    new_arrival: false
  }
];

const getCartItemWithDetails = (cartItem: ICartItem): ICartItem => {
  const product = mockProducts.find(p => p.id === cartItem.productId);
  const variant = product?.variants.find(v => v.id === cartItem.variantId);
  
  return {
    ...cartItem,
    product,
    variant
  };
};

const mockCartItems: ICartItem[] = [
  {
    productId: "p1",
    variantId: "v2",
    quantity: 1
  },
  {
    productId: "p2",
    variantId: "v3",
    quantity: 2
  }
];

const calculateTotal = (items: ICartItem[]): number => {
  return items.reduce((total, item) => {
    const cartItem = getCartItemWithDetails(item);
    return total + (cartItem.variant?.price || 0) * item.quantity;
  }, 0);
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>(mockCartItems);
  
  const handleQuantityChange = (productId: string, variantId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  const handleRemoveItem = (productId: string, variantId: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.productId === productId && item.variantId === variantId)
      )
    );
    toast({
      title: "Đã xóa sản phẩm khỏi giỏ hàng",
    });
  };
  
  const handleCheckout = () => {
    toast({
      title: "Đang chuyển đến trang thanh toán",
      description: "Tính năng này đang được phát triển.",
    });
  };
  
  const cartTotal = calculateTotal(cartItems);
  const shippingCost = cartTotal > 5000000 ? 0 : 50000;
  const finalTotal = cartTotal + shippingCost;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl mb-8 text-center">Giỏ hàng</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => {
                const cartItem = getCartItemWithDetails(item);
                if (!cartItem.product || !cartItem.variant) return null;
                
                return (
                  <div key={`${cartItem.productId}-${cartItem.variantId}`} className="flex border border-gray-200 rounded-lg overflow-hidden">
                    {/* Hình ảnh */}
                    <div className="w-1/4 md:w-1/5 bg-gray-100">
                      <Link to={`/products/${cartItem.productId}`}>
                        <img
                          src={cartItem.product.images[0]}
                          alt={cartItem.product.name}
                          className="w-full h-full object-cover aspect-square"
                        />
                      </Link>
                    </div>
                    
                    {/* Thông tin sản phẩm */}
                    <div className="flex-grow p-4 md:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <div>
                            <Link to={`/products/${cartItem.productId}`} className="hover:text-perfume-gold">
                              <h2 className="text-lg font-medium">{cartItem.product.name}</h2>
                            </Link>
                            <p className="text-gray-600 text-sm mt-1">
                              {cartItem.product.brand} - {cartItem.variant.capacity}
                            </p>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(cartItem.productId, cartItem.variantId)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-end">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => handleQuantityChange(cartItem.productId, cartItem.variantId, cartItem.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{cartItem.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(cartItem.productId, cartItem.variantId, cartItem.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-medium text-perfume-gold">
                            {formatPrice(cartItem.variant.price * cartItem.quantity)}
                          </p>
                          {cartItem.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              {formatPrice(cartItem.variant.price)} / mỗi sản phẩm
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-6">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-medium">
                      <span>Tổng cộng</span>
                      <span className="text-lg text-perfume-gold">{formatPrice(finalTotal)}</span>
                    </div>
                    {cartTotal < 5000000 && (
                      <p className="text-sm text-gray-600 mt-2">
                        Mua thêm {formatPrice(5000000 - cartTotal)} để được miễn phí vận chuyển
                      </p>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full mt-6 py-6 bg-black hover:bg-gray-800"
                >
                  Tiến hành thanh toán
                </Button>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Chúng tôi chấp nhận:</h3>
                  <div className="flex gap-2">
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">VISA</span>
                    </div>
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">MC</span>
                    </div>
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">MOMO</span>
                    </div>
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">COD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-medium mb-4">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-8">
              Hãy thêm sản phẩm vào giỏ hàng để tiến hành thanh toán.
            </p>
            <Button asChild className="px-6 py-6">
              <Link to="/products">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
