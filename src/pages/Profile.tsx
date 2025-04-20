import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/auth';
import Layout from '@/components/layout/Layout';
import { User, Mail, Phone, MapPin, Save, LogOut, Package, CreditCard, Settings, Box, Plus, Trash2, Bell, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Orders from '@/components/Orders';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
}

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // State cho địa chỉ
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Nhà riêng',
      phone: '0912345678',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      isDefault: true
    },
    {
      id: '2',
      name: 'Văn phòng',
      phone: '0987654321',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      isDefault: false
    }
  ]);

  // State cho phương thức thanh toán
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      cardNumber: '**** **** **** 1234',
      cardHolder: 'NGUYEN VAN A',
      expiryDate: '12/25',
      isDefault: true
    }
  ]);

  // State cho cài đặt
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      promotions: true
    },
    security: {
      twoFactor: false,
      passwordLength: 8,
      lastChanged: '2024-03-15'
    }
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
    });
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const success = authService.updateUser(user);
    if (success) {
      setIsEditing(false);
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin của bạn đã được cập nhật",
      });
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  // Xử lý địa chỉ
  const handleAddAddress = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      name: '',
      phone: '',
      address: '',
      isDefault: false
    };
    setAddresses([...addresses, newAddress]);
  };

  const handleRemoveAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({
      title: "Đã xóa địa chỉ",
      description: "Địa chỉ đã được xóa thành công",
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast({
      title: "Đã cập nhật",
      description: "Đã đặt làm địa chỉ mặc định",
    });
  };

  // Thêm hàm xử lý cập nhật địa chỉ
  const handleAddressChange = (id: string, field: keyof Address, value: string) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, [field]: value } : addr
    ));
  };

  // Xử lý phương thức thanh toán
  const handleAddPayment = () => {
    const newPayment: PaymentMethod = {
      id: Date.now().toString(),
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      isDefault: false
    };
    setPaymentMethods([...paymentMethods, newPayment]);
  };

  const handleRemovePayment = (id: string) => {
    setPaymentMethods(paymentMethods.filter(payment => payment.id !== id));
    toast({
      title: "Đã xóa",
      description: "Đã xóa phương thức thanh toán",
    });
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(paymentMethods.map(payment => ({
      ...payment,
      isDefault: payment.id === id
    })));
    toast({
      title: "Đã cập nhật",
      description: "Đã đặt làm phương thức thanh toán mặc định",
    });
  };

  // Thêm hàm xử lý cập nhật phương thức thanh toán
  const handlePaymentChange = (id: string, field: keyof PaymentMethod, value: string) => {
    setPaymentMethods(paymentMethods.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  // Xử lý cài đặt
  const handleToggleSetting = (category: 'notifications' | 'security', setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[typeof category]]
      }
    }));
    toast({
      title: "Đã cập nhật",
      description: "Cài đặt đã được lưu",
    });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới không khớp",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới phải có ít nhất 8 ký tự",
        variant: "destructive"
      });
      return;
    }

    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast({
        title: "Thành công",
        description: "Mật khẩu đã được cập nhật"
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật mật khẩu. Vui lòng thử lại sau",
        variant: "destructive"
      });
    }
  };

  // Hàm xử lý lưu thông tin mới
  const handleSaveNewAddress = (id: string) => {
    const address = addresses.find(a => a.id === id);
    if (!address?.name || !address?.phone || !address?.address) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin địa chỉ",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Thành công",
      description: "Đã lưu địa chỉ mới"
    });
  };

  const handleSaveNewPayment = (id: string) => {
    const payment = paymentMethods.find(p => p.id === id);
    if (!payment?.cardNumber || !payment?.cardHolder || !payment?.expiryDate) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin thanh toán",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Thành công",
      description: "Đã lưu phương thức thanh toán mới"
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] p-6 text-white">
              <h1 className="text-2xl font-serif">Thông tin cá nhân</h1>
              <p className="text-gray-300 mt-1">Quản lý thông tin tài khoản của bạn</p>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
                  <TabsTrigger value="profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Hồ sơ
                  </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center">
                <Box className="mr-2 h-4 w-4" />
                Đơn hàng
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
            
                {/* Tab Profile */}
                <TabsContent value="profile" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Avatar và thông tin cơ bản */}
                    <div className="flex flex-col items-center space-y-4 p-6 border border-gray-100 rounded-lg">
                      <div className="w-32 h-32 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-4xl">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-center">
                        <h2 className="text-xl font-medium text-[#1a1a1a]">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                    </div>

                    {/* Form thông tin */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Họ và tên
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            name="email"
                            value={user.email}
                            disabled
                            className="pl-10 bg-gray-50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số điện thoại
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Địa chỉ
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                          <Textarea
                            name="address"
                            value={user.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="pl-10 min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Đăng xuất
                    </Button>
                    {isEditing ? (
                      <Button
                        onClick={handleSave}
                        className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 flex items-center text-white"
                      >
                        <Save size={16} className="mr-2" />
                        Lưu thay đổi
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white"
                      >
                        Chỉnh sửa thông tin
                      </Button>
                    )}
                  </div>
                </TabsContent>

                {/* Tab Orders */}
                <TabsContent value="orders" className="mt-6">
                  <Orders />
                </TabsContent>

                {/* Tab Address */}
                <TabsContent value="address" className="mt-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Địa chỉ giao hàng</h3>
                      <Button
                        onClick={handleAddAddress}
                        className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white"
                      >
                        <Plus size={16} className="mr-2" />
                        Thêm địa chỉ mới
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`p-4 rounded-lg border ${
                            address.isDefault ? 'border-[#1a1a1a]' : 'border-gray-200'
                          }`}
                        >
                          {address.name && address.phone && address.address ? (
                            // Địa chỉ đã có thông tin đầy đủ
                            <>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-medium">{address.name}</h4>
                                  <p className="text-sm text-gray-600">{address.phone}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveAddress(address.id)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{address.address}</p>
                              {!address.isDefault && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSetDefaultAddress(address.id)}
                                  className="text-xs"
                                >
                                  Đặt làm mặc định
                                </Button>
                              )}
                              {address.isDefault && (
                                <span className="text-xs text-[#1a1a1a] font-medium">
                                  ✓ Địa chỉ mặc định
                                </span>
                              )}
                            </>
                          ) : (
                            // Form thêm địa chỉ mới
                            <div className="space-y-3">
                              <h4 className="font-medium">Thêm địa chỉ mới</h4>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Tên địa chỉ
                                </label>
                                <Input 
                                  value={address.name} 
                                  onChange={(e) => handleAddressChange(address.id, 'name', e.target.value)}
                                  placeholder="Ví dụ: Nhà riêng, Văn phòng..."
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Số điện thoại
                                </label>
                                <Input 
                                  value={address.phone} 
                                  onChange={(e) => handleAddressChange(address.id, 'phone', e.target.value)}
                                  placeholder="Số điện thoại nhận hàng"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Địa chỉ đầy đủ
                                </label>
                                <Textarea 
                                  value={address.address} 
                                  onChange={(e) => handleAddressChange(address.id, 'address', e.target.value)}
                                  placeholder="Địa chỉ chi tiết"
                                  className="min-h-[80px]"
                                />
                              </div>
                              <div className="pt-2 flex justify-between">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveAddress(address.id)}
                                >
                                  Hủy
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white"
                                  onClick={() => handleSaveNewAddress(address.id)}
                                >
                                  <Check size={16} className="mr-2" />
                                  Lưu địa chỉ
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Tab Payment */}
                <TabsContent value="payment" className="mt-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Phương thức thanh toán</h3>
                      <Button
                        onClick={handleAddPayment}
                        className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white"
                      >
                        <Plus size={16} className="mr-2" />
                        Thêm thẻ mới
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((payment) => (
                        <div
                          key={payment.id}
                          className={`p-4 rounded-lg border ${
                            payment.isDefault ? 'border-[#1a1a1a]' : 'border-gray-200'
                          }`}
                        >
                          {payment.cardNumber && payment.cardHolder && payment.expiryDate ? (
                            // Phương thức thanh toán đã có thông tin đầy đủ
                            <>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-medium">{payment.cardHolder}</h4>
                                  <p className="text-sm text-gray-600">{payment.cardNumber}</p>
                                  <p className="text-sm text-gray-600">Hết hạn: {payment.expiryDate}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemovePayment(payment.id)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </div>
                              {!payment.isDefault && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSetDefaultPayment(payment.id)}
                                  className="text-xs"
                                >
                                  Đặt làm mặc định
                                </Button>
                              )}
                              {payment.isDefault && (
                                <span className="text-xs text-[#1a1a1a] font-medium">
                                  ✓ Phương thức mặc định
                                </span>
                              )}
                            </>
                          ) : (
                            // Form thêm phương thức thanh toán mới
                            <div className="space-y-3">
                              <h4 className="font-medium">Thêm thẻ mới</h4>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Số thẻ
                                </label>
                                <Input 
                                  value={payment.cardNumber}
                                  onChange={(e) => handlePaymentChange(payment.id, 'cardNumber', e.target.value)}
                                  placeholder="Nhập số thẻ"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Tên chủ thẻ
                                </label>
                                <Input 
                                  value={payment.cardHolder}
                                  onChange={(e) => handlePaymentChange(payment.id, 'cardHolder', e.target.value)}
                                  placeholder="Tên in trên thẻ"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Ngày hết hạn
                                </label>
                                <Input 
                                  value={payment.expiryDate}
                                  onChange={(e) => handlePaymentChange(payment.id, 'expiryDate', e.target.value)}
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div className="pt-2 flex justify-between">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemovePayment(payment.id)}
                                >
                                  Hủy
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white"
                                  onClick={() => handleSaveNewPayment(payment.id)}
                                >
                                  <Check size={16} className="mr-2" />
                                  Lưu thẻ
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Tab Settings */}
                <TabsContent value="settings" className="mt-6">
                  <div className="space-y-8">
                    {/* Thông báo */}
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Bell size={20} className="mr-2" />
                        Thông báo
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications" className="flex-1">
                            <span className="font-medium">Thông báo qua email</span>
                            <p className="text-sm text-gray-500">
                              Nhận thông báo về đơn hàng qua email
                            </p>
                          </Label>
                          <Switch
                            id="email-notifications"
                            checked={settings.notifications.email}
                            onCheckedChange={() => handleToggleSetting('notifications', 'email')}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-notifications" className="flex-1">
                            <span className="font-medium">Thông báo qua SMS</span>
                            <p className="text-sm text-gray-500">
                              Nhận thông báo về đơn hàng qua SMS
                            </p>
                          </Label>
                          <Switch
                            id="sms-notifications"
                            checked={settings.notifications.sms}
                            onCheckedChange={() => handleToggleSetting('notifications', 'sms')}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="promo-notifications" className="flex-1">
                            <span className="font-medium">Thông báo khuyến mãi</span>
                            <p className="text-sm text-gray-500">
                              Nhận thông tin về các chương trình khuyến mãi
                            </p>
                          </Label>
                          <Switch
                            id="promo-notifications"
                            checked={settings.notifications.promotions}
                            onCheckedChange={() => handleToggleSetting('notifications', 'promotions')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bảo mật */}
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Lock size={20} className="mr-2" />
                        Bảo mật
                      </h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="two-factor" className="flex-1">
                            <span className="font-medium">Xác thực 2 lớp</span>
                            <p className="text-sm text-gray-500">
                              Bảo vệ tài khoản bằng xác thực 2 lớp
                            </p>
                          </Label>
                          <Switch
                            id="two-factor"
                            checked={settings.security.twoFactor}
                            onCheckedChange={() => handleToggleSetting('security', 'twoFactor')}
                          />
                        </div>
                        
                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="font-medium mb-4">Mật khẩu và bảo mật</h4>
                          
                          {!isChangingPassword ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Mật khẩu</p>
                                  <p className="text-sm text-gray-500">
                                    Thay đổi lần cuối: {new Date(settings.security.lastChanged).toLocaleDateString('vi-VN')}
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  onClick={() => setIsChangingPassword(true)}
                                >
                                  Đổi mật khẩu
                                </Button>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Phiên đăng nhập</p>
                                  <p className="text-sm text-gray-500">
                                    Quản lý các thiết bị đang đăng nhập
                                  </p>
                                </div>
                                <Button variant="outline">
                                  Xem thiết bị
                                </Button>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Xác thực email</p>
                                  <p className="text-sm text-gray-500">
                                    Email của bạn đã được xác thực
                                  </p>
                                </div>
                                <span className="text-green-600 text-sm font-medium">✓ Đã xác thực</span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                                <div className="relative mt-1">
                                  <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordForm.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="pr-10"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                  </button>
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                                <div className="relative mt-1">
                                  <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    className="pr-10"
                                  />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Mật khẩu phải có ít nhất 8 ký tự
                                </p>
                              </div>
                              
                              <div>
                                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                                <div className="relative mt-1">
                                  <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="pr-10"
                                  />
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 pt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setIsChangingPassword(false);
                                    setPasswordForm({
                                      currentPassword: '',
                                      newPassword: '',
                                      confirmPassword: ''
                                    });
                                  }}
                                >
                                  Hủy
                                </Button>
                                <Button
                                  onClick={handleChangePassword}
                                  className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white"
                                >
                                  Cập nhật mật khẩu
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="font-medium mb-4">Hoạt động gần đây</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm">Đăng nhập từ Chrome - Windows</p>
                                <p className="text-xs text-gray-500">Hôm nay, 15:30</p>
                              </div>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Thiết bị hiện tại
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm">Đăng nhập từ Safari - iPhone</p>
                                <p className="text-xs text-gray-500">Hôm qua, 20:15</p>
                              </div>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                Đăng xuất
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
