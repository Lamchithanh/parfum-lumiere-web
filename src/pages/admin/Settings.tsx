import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Bell, Lock, User, Mail, Globe, Palette } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Cài đặt</h1>
        <p className="text-gray-600 mt-1">Quản lý cài đặt hệ thống</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            Chung
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Giao diện
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Thông báo
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Bảo mật
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Thông tin cửa hàng</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tên cửa hàng</Label>
                    <Input defaultValue="Parfum Lumière" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email liên hệ</Label>
                    <Input defaultValue="contact@parfumlumiere.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số điện thoại</Label>
                    <Input defaultValue="+84 123 456 789" />
                  </div>
                  <div className="space-y-2">
                    <Label>Địa chỉ</Label>
                    <Input defaultValue="123 Đường ABC, Quận XYZ, TP.HCM" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Cài đặt SEO</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Meta title</Label>
                    <Input defaultValue="Parfum Lumière - Nước hoa cao cấp chính hãng" />
                  </div>
                  <div className="space-y-2">
                    <Label>Meta description</Label>
                    <textarea
                      className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
                      rows={3}
                      defaultValue="Parfum Lumière - Cửa hàng nước hoa cao cấp chính hãng với đa dạng các thương hiệu nổi tiếng thế giới."
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Chế độ tối</Label>
                  <p className="text-sm text-gray-500">
                    Chuyển đổi giữa chế độ sáng và tối
                  </p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Màu sắc chủ đạo</h2>
                <div className="grid grid-cols-6 gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] cursor-pointer ring-2 ring-offset-2 ring-[#1a1a1a]" />
                  <div className="w-12 h-12 rounded-full bg-blue-600 cursor-pointer" />
                  <div className="w-12 h-12 rounded-full bg-green-600 cursor-pointer" />
                  <div className="w-12 h-12 rounded-full bg-purple-600 cursor-pointer" />
                  <div className="w-12 h-12 rounded-full bg-red-600 cursor-pointer" />
                  <div className="w-12 h-12 rounded-full bg-yellow-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Thông báo email</Label>
                  <p className="text-sm text-gray-500">
                    Nhận thông báo qua email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Thông báo đẩy</Label>
                  <p className="text-sm text-gray-500">
                    Nhận thông báo trực tiếp trên trình duyệt
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Đổi mật khẩu</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Mật khẩu hiện tại</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Mật khẩu mới</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Xác nhận mật khẩu mới</Label>
                    <Input type="password" />
                  </div>
                  <Button className="bg-[#1a1a1a] hover:bg-[#333] text-white">
                    Cập nhật mật khẩu
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Xác thực hai yếu tố</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Bảo mật hai lớp</Label>
                      <p className="text-sm text-gray-500">
                        Thêm một lớp bảo mật cho tài khoản của bạn
                      </p>
                    </div>
                    <Button variant="outline">Thiết lập</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings; 