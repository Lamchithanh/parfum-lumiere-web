import { toast } from '@/components/ui/use-toast';
import { IProduct } from '@/types';

export interface CartItem {
  productId: number;
  quantity: number;
  size: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

const CART_KEY = 'cart';
const ORDERS_KEY = 'orders';

// Khởi tạo giỏ hàng và đơn hàng nếu chưa có
const initializeStorage = () => {
  if (!localStorage.getItem(CART_KEY)) {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(ORDERS_KEY)) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
  }
};

initializeStorage();

export const cartService = {
  // Lấy tất cả sản phẩm trong giỏ hàng
  getCartItems: (): CartItem[] => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: (productId: number, quantity: number = 1, size: string = 'CHIẾT 10ML'): CartItem[] => {
    const cartItems = cartService.getCartItems();
    const existingItem = cartItems.find(
      item => item.productId === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ productId, quantity, size });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));

    toast({
      title: 'Thêm vào giỏ hàng thành công',
      description: 'Sản phẩm đã được thêm vào giỏ hàng',
    });

    return cartItems;
  },

  // Cập nhật số lượng sản phẩm
  updateQuantity: (productId: number, quantity: number, size: string): CartItem[] => {
    if (quantity < 1) return cartService.removeFromCart(productId, size);

    const cartItems = cartService.getCartItems();
    const itemIndex = cartItems.findIndex(
      item => item.productId === productId && item.size === size
    );

    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = quantity;
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }

    return cartItems;
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: (productId: number, size: string): CartItem[] => {
    const cartItems = cartService.getCartItems();
    const updatedItems = cartItems.filter(
      item => !(item.productId === productId && item.size === size)
    );

    localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));

    toast({
      title: 'Đã xóa sản phẩm',
      description: 'Sản phẩm đã được xóa khỏi giỏ hàng',
    });

    return updatedItems;
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: () => {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    return [];
  },

  // Tính tổng số lượng sản phẩm
  getTotalItems: (): number => {
    const cartItems = cartService.getCartItems();
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  // Tính tổng tiền
  getTotalPrice: (products: IProduct[]): number => {
    const cartItems = cartService.getCartItems();
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  },

  // Kiểm tra sản phẩm có trong giỏ hàng không
  isInCart: (productId: number, size: string): boolean => {
    const cartItems = cartService.getCartItems();
    return cartItems.some(
      item => item.productId === productId && item.size === size
    );
  },

  // Lấy danh sách đơn hàng
  getOrders: (): Order[] => {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  },

  // Tạo đơn hàng mới
  createOrder: (products: IProduct[]): Order => {
    const cartItems = cartService.getCartItems();
    const totalAmount = cartService.getTotalPrice(products);
    
    const newOrder: Order = {
      id: Date.now().toString(),
      items: cartItems,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const orders = cartService.getOrders();
    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    // Xóa giỏ hàng sau khi tạo đơn
    cartService.clearCart();

    toast({
      title: 'Đặt hàng thành công',
      description: 'Đơn hàng của bạn đã được tạo',
    });

    return newOrder;
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: (orderId: string, status: Order['status']): Order[] => {
    const orders = cartService.getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }

    return orders;
  }
}; 