
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { IOrder, IUser } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { Box, CreditCard, Gift, Package, Settings, User } from 'lucide-react';

// Hệ thống phân loại khách hàng
type CustomerTier = 'regular' | 'silver' | 'gold' | 'diamond' | 'vip';

interface CustomerTierInfo {
  type: CustomerTier;
  name: string;
  color: string;
  icon: JSX.Element;
  requiredSpending: number;
  benefits: string[];
}

const customerTiers: Record<CustomerTier, CustomerTierInfo> = {
  regular: {
    type: 'regular',
    name: 'Thường',
    color: 'bg-gray-200',
    icon: <User className="h-5 w-5" />,
    requiredSpending: 0,
    benefits: [
      'Ưu đãi sinh nhật',
      'Tích điểm mua hàng',
    ]
  },
  silver: {
    type: 'silver',
    name: 'Bạc',
    color: 'bg-gray-300',
    icon: <Gift className="h-5 w-5" />,
    requiredSpending: 5000000,
    benefits: [
      'Ưu đãi sinh nhật',
      'Tích điểm mua hàng',
      'Giảm 5% cho mỗi đơn hàng',
    ]
  },
  gold: {
    type: 'gold',
    name: 'Vàng',
    color: 'bg-yellow-100',
    icon: <Gift className="h-5 w-5 text-yellow-600" />,
    requiredSpending: 15000000,
    benefits: [
      'Ưu đãi sinh nhật',
      'Tích điểm mua hàng',
      'Giảm 10% cho mỗi đơn hàng',
      'Miễn phí vận chuyển',
    ]
  },
  diamond: {
    type: 'diamond',
    name: 'Kim cương',
    color: 'bg-blue-100',
    icon: <Gift className="h-5 w-5 text-blue-600" />,
    requiredSpending: 30000000,
    benefits: [
      'Ưu đãi sinh nhật',
      'Tích điểm mua hàng',
      'Giảm 15% cho mỗi đơn hàng',
      'Miễn phí vận chuyển',
      'Quà tặng hàng quý',
    ]
  },
  vip: {
    type: 'vip',
    name: 'VIP',
    color: 'bg-purple-100',
    icon: <Gift className="h-5 w-5 text-purple-600" />,
    requiredSpending: 50000000,
    benefits: [
      'Ưu đãi sinh nhật',
      'Tích điểm mua hàng',
      'Giảm 20% cho mỗi đơn hàng',
      'Miễn phí vận chuyển',
      'Quà tặng hàng quý',
      'Tư vấn viên cá nhân',
      'Sản phẩm độc quyền',
    ]
  }
};

// Mock data - trong thực tế sẽ lấy từ API
const mockUser: IUser = {
  id: "u1",
  name: "Nguyễn Thị Hương",
  email: "huong@example.com",
  favorites: ["p1", "p3"]
};

const mockOrders: IOrder[] = [
  {
    id: "o1",
    userId: "u1",
    items: [
      {
        productId: "p1",
        variantId: "v2",
        quantity: 1,
        product: {
          id: "p1",
          name: "Parfum Lumière No.1",
          brand: "Parfum Lumière",
          description: "",
          images: ["/placeholder.svg"],
          category: "Women",
          scent_notes: [],
          variants: [
            { id: "v2", capacity: "100ml", price: 4500000, stock: 5 }
          ],
          rating: 4.5,
          reviews: [],
          featured: true,
          new_arrival: true
        },
        variant: { id: "v2", capacity: "100ml", price: 4500000, stock: 5 }
      }
    ],
    status: 'delivered',
    total: 4500000,
    date: "2025-01-15",
    shipping_address: {
      name: "Nguyễn Thị Hương",
      address: "123 Đường Lê Lợi",
      city: "Quận 1",
      state: "TP.HCM",
      postal_code: "70000",
      country: "Việt Nam",
      phone: "+84912345678"
    }
  },
  {
    id: "o2",
    userId: "u1",
    items: [
      {
        productId: "p2",
        variantId: "v3",
        quantity: 1,
        product: {
          id: "p2",
          name: "Parfum Lumière No.2",
          brand: "Parfum Lumière",
          description: "",
          images: ["/placeholder.svg"],
          category: "Men",
          scent_notes: [],
          variants: [
            { id: "v3", capacity: "50ml", price: 2700000, stock: 10 }
          ],
          rating: 4.7,
          reviews: [],
          featured: true,
          new_arrival: false
        },
        variant: { id: "v3", capacity: "50ml", price: 2700000, stock: 10 }
      }
    ],
    status: 'delivered',
    total: 2700000,
    date: "2025-02-20",
    shipping_address: {
      name: "Nguyễn Thị Hương",
      address: "123 Đường Lê Lợi",
      city: "Quận 1",
      state: "TP.HCM",
      postal_code: "70000",
      country: "Việt Nam",
      phone: "+84912345678"
    }
  },
  {
    id: "o3",
    userId: "u1",
    items: [
      {
        productId: "p3",
        variantId: "v6",
        quantity: 2,
        product: {
          id: "p3",
          name: "Parfum Lumière No.3",
          brand: "Parfum Lumière",
          description: "",
          images: ["/placeholder.svg"],
          category: "Unisex",
          scent_notes: [],
          variants: [
            { id: "v6", capacity: "100ml", price: 4200000, stock: 5 }
          ],
          rating: 4.3,
          reviews: [],
          featured: false,
          new_arrival: true
        },
        variant: { id: "v6", capacity: "100ml", price: 4200000, stock: 5 }
      }
    ],
    status: 'processing',
    total: 8400000,
    date: "2025-04-10",
    shipping_address: {
      name: "Nguyễn Thị Hương",
      address: "123 Đường Lê Lợi",
      city: "Quận 1",
      state: "TP.HCM",
      postal_code: "70000",
      country: "Việt Nam",
      phone: "+84912345678"
    }
  }
];

// Tính tổng chi tiêu của khách hàng
const calculateTotalSpending = (orders: IOrder[]): number => {
  return orders.reduce((total, order) => total + order.total, 0);
};

// Xác định hạng khách hàng dựa trên tổng chi tiêu
const determineCustomerTier = (totalSpending: number): CustomerTier => {
  if (totalSpending >= customerTiers.vip.requiredSpending) return 'vip';
  if (totalSpending >= customerTiers.diamond.requiredSpending) return 'diamond';
  if (totalSpending >= customerTiers.gold.requiredSpending) return 'gold';
  if (totalSpending >= customerTiers.silver.requiredSpending) return 'silver';
  return 'regular';
};

const Profile = () => {
  const [user] = useState<IUser>(mockUser);
  const [orders] = useState<IOrder[]>(mockOrders);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: "+84912345678",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM"
  });
  
  const totalSpending = calculateTotalSpending(orders);
  const customerTier = determineCustomerTier(totalSpending);
  const tierInfo = customerTiers[customerTier];
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Hồ sơ đã được cập nhật",
      description: "Thông tin cá nhân của bạn đã được lưu thành công.",
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
            {/* Avatar và thông tin cơ bản */}
            <div className="w-full md:w-auto flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg" alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-medium">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            {/* Thông tin khách hàng thân thiết */}
            <div className="flex-grow w-full">
              <div className={`${tierInfo.color} rounded-lg p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Khách hàng hạng {tierInfo.name}</h3>
                    <p className="text-gray-600 text-sm">
                      Tổng chi tiêu: {formatPrice(totalSpending)}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    customerTier === 'gold' ? 'bg-yellow-200' :
                    customerTier === 'vip' ? 'bg-purple-200' :
                    customerTier === 'diamond' ? 'bg-blue-200' :
                    'bg-gray-200'
                  }`}>
                    {tierInfo.icon}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Quyền lợi của bạn:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {tierInfo.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                {customerTier !== 'vip' && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Chi tiêu thêm {formatPrice(customerTiers[
                        customerTier === 'regular' ? 'silver' :
                        customerTier === 'silver' ? 'gold' :
                        customerTier === 'gold' ? 'diamond' :
                        'vip'
                      ].requiredSpending - totalSpending)} để lên hạng tiếp theo
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          customerTier === 'regular' ? 'bg-gray-500' :
                          customerTier === 'silver' ? 'bg-yellow-500' :
                          customerTier === 'gold' ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`} 
                        style={{ 
                          width: `${Math.min(100, (totalSpending / (customerTiers[
                            customerTier === 'regular' ? 'silver' :
                            customerTier === 'silver' ? 'gold' :
                            customerTier === 'gold' ? 'diamond' :
                            'vip'
                          ].requiredSpending)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="orders">
            <TabsList className="border-b border-gray-200 w-full overflow-auto">
              <TabsTrigger value="orders" className="flex items-center">
                <Box className="mr-2 h-4 w-4" />
                Đơn hàng
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Hồ sơ
              </TabsTrigger>
              <TabsTrigger value="address" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Địa chỉ
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Thanh toán
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Cài đặt
              </TabsTrigger>
            </TabsList>
            
            {/* Tab Đơn hàng */}
            <TabsContent value="orders" className="pt-6">
              <h3 className="text-xl font-medium mb-6">Lịch sử đơn hàng</h3>
              
              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Đơn hàng #{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status === 'delivered' ? 'Đã giao hàng' :
                             order.status === 'processing' ? 'Đang xử lý' :
                             order.status === 'shipped' ? 'Đang vận chuyển' :
                             order.status === 'pending' ? 'Chờ xác nhận' : 'Đã hủy'}
                          </span>
                          <p className="text-lg font-medium mt-1">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center py-4 border-b border-gray-100 last:border-0">
                            <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden mr-4">
                              <img
                                src={item.product?.images[0] || "/placeholder.svg"}
                                alt={item.product?.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{item.product?.name}</h4>
                              <p className="text-sm text-gray-600">
                                {item.variant?.capacity} x {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {formatPrice((item.variant?.price || 0) * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
                  <Button asChild className="mt-4">
                    <Link to="/products">Khám phá sản phẩm</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Tab Hồ sơ */}
            <TabsContent value="profile" className="pt-6">
              <h3 className="text-xl font-medium mb-6">Thông tin cá nhân</h3>
              
              <form onSubmit={handleProfileUpdate} className="max-w-xl space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Họ và tên
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Số điện thoại
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Địa chỉ
                  </label>
                  <Input
                    id="address"
                    name="address"
                    value={profileForm.address}
                    onChange={handleChange}
                  />
                </div>
                
                <Button type="submit" className="mt-4">
                  Lưu thay đổi
                </Button>
              </form>
            </TabsContent>
            
            {/* Tab khác (placeholder) */}
            <TabsContent value="address" className="pt-6">
              <h3 className="text-xl font-medium mb-6">Địa chỉ giao hàng</h3>
              <p className="text-gray-600">Tính năng này đang được phát triển.</p>
            </TabsContent>
            
            <TabsContent value="payment" className="pt-6">
              <h3 className="text-xl font-medium mb-6">Phương thức thanh toán</h3>
              <p className="text-gray-600">Tính năng này đang được phát triển.</p>
            </TabsContent>
            
            <TabsContent value="settings" className="pt-6">
              <h3 className="text-xl font-medium mb-6">Cài đặt tài khoản</h3>
              <p className="text-gray-600">Tính năng này đang được phát triển.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
