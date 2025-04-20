import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cartService } from '@/lib/cart';
import { orderService, ShippingInfo } from '@/lib/order';
import { userInfoService, UserShippingInfo } from '@/lib/userInfo';
import { productService } from '@/services/productService';
import { IProduct } from '@/types';
import { formatPrice } from '@/lib/utils';
import authService from '@/services/authService';
import { toast } from 'sonner';

interface CartItemWithProduct {
  productId: number;
  quantity: number;
  size: string;
  product: IProduct;
}

const formSchema = z.object({
  fullName: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
  city: z.string().min(2, 'Thành phố không hợp lệ'),
  note: z.string().optional(),
  paymentMethod: z.enum(['cod', 'banking'], {
    required_error: 'Vui lòng chọn phương thức thanh toán',
  }),
});

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);

  // Lấy thông tin giao hàng có sẵn
  const savedInfo = userInfoService.getShippingInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: savedInfo?.fullName || '',
      phone: savedInfo?.phone || '',
      email: savedInfo?.email || '',
      address: savedInfo?.address || '',
      city: savedInfo?.city || '',
      note: '',
      paymentMethod: 'cod',
    },
  });

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

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập để tiếp tục');
      navigate('/login');
      return;
    }

    const { paymentMethod, note, ...shippingInfo } = values;
    
    // Lưu thông tin giao hàng để dùng lần sau
    const userShippingInfo: UserShippingInfo = {
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      address: values.address,
      city: values.city
    };
    userInfoService.saveShippingInfo(userShippingInfo);
    
    const orderItems = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      size: item.size,
      price: item.product.price
    }));

    // Tạo đơn hàng với thông tin giao hàng và ghi chú
    const validShippingInfo: ShippingInfo = {
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      address: values.address,
      city: values.city,
      note: note || undefined
    };

    orderService.createOrder(currentUser.id, orderItems, validShippingInfo, paymentMethod);
    cartService.clearCart();
    navigate('/profile');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-medium mb-8">Thanh toán</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form thanh toán */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập họ và tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số điện thoại" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập địa chỉ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thành phố</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập thành phố" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi chú</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Nhập ghi chú cho đơn hàng" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Phương thức thanh toán</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod">Thanh toán khi nhận hàng (COD)</Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="banking" id="banking" />
                            <Label htmlFor="banking">Chuyển khoản ngân hàng</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-[#1a1a1a] hover:bg-[#1a1a1a]/90"
                >
                  Đặt hàng ({formatPrice(totalAmount)})
                </Button>
              </form>
            </Form>
          </div>

          {/* Thông tin đơn hàng */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Thông tin đơn hàng</h2>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.productId} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">{item.product.brand}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm">
                          {item.size} x {item.quantity}
                        </p>
                        <p className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-4">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout; 