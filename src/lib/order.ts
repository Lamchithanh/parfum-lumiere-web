import { toast } from 'sonner';
import { IProduct } from '@/types';

const STORAGE_KEY = 'parfum_lumiere_orders';

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  size: string;
}

export interface Order {
  id: number;
  userId: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: 'cod' | 'banking';
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const getStoredOrders = (): Order[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveOrders = (orders: Order[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

const generateOrderNumber = (): string => {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `PL${timestamp}${random}`;
};

export const orderService = {
  createOrder: (
    userId: string,
    items: OrderItem[],
    totalAmount: number,
    shippingAddress: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod']
  ): Order => {
    const orders = getStoredOrders();
    const newOrder: Order = {
      id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
      userId,
      orderNumber: generateOrderNumber(),
      status: 'pending',
      items: items.map(item => ({
        ...item,
        productName: item.productName || 'Unknown Product'
      })),
      totalAmount,
      shippingAddress,
      paymentMethod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.push(newOrder);
    saveOrders(orders);
    return newOrder;
  },

  getUserOrders: (userId: string): Order[] => {
    const orders = getStoredOrders();
    return orders
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getOrderById: (orderId: number): Order | null => {
    const orders = getStoredOrders();
    return orders.find(order => order.id === orderId) || null;
  },

  updateOrderStatus: (orderId: number, status: Order['status']): boolean => {
    const orders = getStoredOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return false;
    
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    
    saveOrders(orders);
    return true;
  },

  addTrackingInfo: (
    orderId: number, 
    trackingNumber: string, 
    estimatedDelivery?: string
  ): boolean => {
    const orders = getStoredOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return false;
    
    orders[orderIndex].trackingNumber = trackingNumber;
    orders[orderIndex].estimatedDelivery = estimatedDelivery;
    orders[orderIndex].updatedAt = new Date().toISOString();
    
    saveOrders(orders);
    return true;
  },

  // Hàm này dùng để khởi tạo dữ liệu mẫu cho đơn hàng
  seedSampleOrders: (userId: string): void => {
    const existingOrders = orderService.getUserOrders(userId);
    
    if (existingOrders.length > 0) return;
    
    const sampleOrders: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>[] = [
      {
        userId,
        status: 'delivered',
        items: [
          { productId: 1, productName: 'Chanel N°5', quantity: 1, price: 2500000, size: '100ml' },
          { productId: 3, productName: 'Dior J\'adore', quantity: 1, price: 1800000, size: '50ml' }
        ],
        totalAmount: 4300000,
        shippingAddress: {
          fullName: 'Nguyễn Văn A',
          phone: '0901234567',
          address: '123 Đường Lê Lợi',
          city: 'TP. Hồ Chí Minh'
        },
        paymentMethod: 'banking',
        trackingNumber: 'VNP12345678',
        estimatedDelivery: '20/04/2024'
      },
      {
        userId,
        status: 'processing',
        items: [
          { productId: 5, productName: 'Gucci Bloom', quantity: 2, price: 3200000, size: '100ml' }
        ],
        totalAmount: 6400000,
        shippingAddress: {
          fullName: 'Nguyễn Văn A',
          phone: '0901234567',
          address: '123 Đường Lê Lợi',
          city: 'TP. Hồ Chí Minh'
        },
        paymentMethod: 'cod'
      },
      {
        userId,
        status: 'pending',
        items: [
          { productId: 2, productName: 'Marc Jacobs Daisy', quantity: 1, price: 1950000, size: '30ml' }
        ],
        totalAmount: 1950000,
        shippingAddress: {
          fullName: 'Nguyễn Văn A',
          phone: '0901234567',
          address: '123 Đường Lê Lợi',
          city: 'TP. Hồ Chí Minh'
        },
        paymentMethod: 'cod'
      }
    ];
    
    sampleOrders.forEach(order => {
      orderService.createOrder(
        order.userId,
        order.items,
        order.totalAmount,
        order.shippingAddress,
        order.paymentMethod
      );
    });
    
    // Cập nhật trạng thái và thông tin vận chuyển
    const orders = getStoredOrders().filter(o => o.userId === userId);
    
    if (orders.length >= 3) {
      orderService.updateOrderStatus(orders[0].id, 'delivered');
      orderService.addTrackingInfo(orders[0].id, 'VNP12345678', '20/04/2024');
      
      orderService.updateOrderStatus(orders[1].id, 'processing');
    }
  }
}; 