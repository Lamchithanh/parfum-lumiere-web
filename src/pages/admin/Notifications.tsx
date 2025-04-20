import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Search, Eye, MoreHorizontal, Bell, Users, Calendar } from 'lucide-react';

// Mock data cho thông báo
interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'all' | 'user' | 'order' | 'system';
  status: 'scheduled' | 'sent' | 'draft';
  recipients: string[];
  scheduledAt?: string;
  sentAt?: string;
  readCount: number;
}

const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    title: 'Cập nhật chính sách bảo mật',
    content: 'Chúng tôi đã cập nhật chính sách bảo mật mới...',
    type: 'all',
    status: 'sent',
    recipients: ['all_users'],
    sentAt: '2024-03-20T10:00:00',
    readCount: 1250
  },
  {
    id: 'notif2',
    title: 'Chương trình khuyến mãi mới',
    content: 'Giảm giá 30% cho tất cả sản phẩm nước hoa...',
    type: 'user',
    status: 'scheduled',
    recipients: ['premium_users'],
    scheduledAt: '2024-03-25T09:00:00',
    readCount: 0
  },
  {
    id: 'notif3',
    title: 'Bảo trì hệ thống',
    content: 'Hệ thống sẽ được bảo trì vào ngày...',
    type: 'system',
    status: 'draft',
    recipients: ['all_users'],
    readCount: 0
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = mockNotifications.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setNotifications(filtered);
    } else {
      setNotifications(mockNotifications);
    }
  };

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsViewDialogOpen(true);
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'all':
        return <Bell className="w-5 h-5 text-purple-600" />;
      case 'user':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'order':
        return <Calendar className="w-5 h-5 text-green-600" />;
      case 'system':
        return <Bell className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeText = (type: Notification['type']) => {
    switch (type) {
      case 'all':
        return 'Tất cả';
      case 'user':
        return 'Người dùng';
      case 'order':
        return 'Đơn hàng';
      case 'system':
        return 'Hệ thống';
      default:
        return type;
    }
  };

  const getStatusColor = (status: Notification['status']) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: Notification['status']) => {
    switch (status) {
      case 'sent':
        return 'Đã gửi';
      case 'scheduled':
        return 'Đã lên lịch';
      case 'draft':
        return 'Bản nháp';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Thông báo</h1>
          <p className="text-gray-600 mt-1">Quản lý thông báo hệ thống</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tạo thông báo
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Tìm kiếm thông báo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Tổng thông báo</h3>
              <p className="text-3xl font-bold mt-2">24</p>
              <p className="text-sm text-gray-600 mt-1">Trong tháng này</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Đã đọc</h3>
              <p className="text-3xl font-bold mt-2">1,250</p>
              <p className="text-sm text-green-600 mt-1">+12% so với tháng trước</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Đã lên lịch</h3>
              <p className="text-3xl font-bold mt-2">5</p>
              <p className="text-sm text-gray-600 mt-1">Trong tuần tới</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Danh sách thông báo */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Thông báo</TableHead>
              <TableHead className="font-semibold">Loại</TableHead>
              <TableHead className="font-semibold">Trạng thái</TableHead>
              <TableHead className="font-semibold">Đã đọc</TableHead>
              <TableHead className="font-semibold">Thời gian</TableHead>
              <TableHead className="w-[100px] font-semibold">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-800">{notification.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[300px]">
                      {notification.content}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(notification.type)}
                    <span>{getTypeText(notification.type)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                    {getStatusText(notification.status)}
                  </span>
                </TableCell>
                <TableCell>{notification.readCount.toLocaleString()}</TableCell>
                <TableCell>
                  {notification.sentAt
                    ? new Date(notification.sentAt).toLocaleDateString('vi-VN')
                    : notification.scheduledAt
                    ? `Lên lịch: ${new Date(notification.scheduledAt).toLocaleDateString('vi-VN')}`
                    : '-'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewNotification(notification)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Xem chi tiết</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Dialog tạo thông báo mới */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tạo thông báo mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tiêu đề</label>
              <Input placeholder="Nhập tiêu đề thông báo..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nội dung</label>
              <textarea
                rows={5}
                className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
                placeholder="Nhập nội dung thông báo..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Loại thông báo</label>
              <select className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]">
                <option value="all">Tất cả người dùng</option>
                <option value="user">Người dùng cụ thể</option>
                <option value="order">Đơn hàng</option>
                <option value="system">Hệ thống</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Thời gian gửi</label>
              <Input type="datetime-local" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button className="bg-[#1a1a1a] hover:bg-[#333] text-white">
              Tạo thông báo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xem chi tiết thông báo */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết thông báo</DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Tiêu đề</h3>
                <p className="mt-1">{selectedNotification.title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Nội dung</h3>
                <p className="mt-1">{selectedNotification.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Loại thông báo</h3>
                  <p className="mt-1">{getTypeText(selectedNotification.type)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Trạng thái</h3>
                  <p className="mt-1">{getStatusText(selectedNotification.status)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Số người đã đọc</h3>
                  <p className="mt-1">{selectedNotification.readCount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Thời gian</h3>
                  <p className="mt-1">
                    {selectedNotification.sentAt
                      ? new Date(selectedNotification.sentAt).toLocaleDateString('vi-VN')
                      : selectedNotification.scheduledAt
                      ? `Lên lịch: ${new Date(selectedNotification.scheduledAt).toLocaleDateString('vi-VN')}`
                      : '-'}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notifications; 