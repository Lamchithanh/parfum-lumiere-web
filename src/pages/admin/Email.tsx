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
import { Plus, Search, Eye, MoreHorizontal, Send } from 'lucide-react';

// Mock data cho chiến dịch email
interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: 'draft' | 'scheduled' | 'sent';
  recipients: number;
  openRate: number;
  clickRate: number;
  sentDate?: string;
  scheduledDate?: string;
}

const mockCampaigns: EmailCampaign[] = [
  {
    id: 'camp1',
    name: 'Khuyến mãi mùa hè 2024',
    subject: 'Giảm giá lên đến 50% các sản phẩm nước hoa cao cấp',
    content: 'Nội dung email về chương trình khuyến mãi mùa hè...',
    status: 'sent',
    recipients: 1500,
    openRate: 45.5,
    clickRate: 12.3,
    sentDate: '2024-03-15'
  },
  {
    id: 'camp2',
    name: 'Ra mắt bộ sưu tập mới',
    subject: 'Khám phá bộ sưu tập nước hoa mới nhất 2024',
    content: 'Nội dung email về bộ sưu tập mới...',
    status: 'scheduled',
    recipients: 2000,
    openRate: 0,
    clickRate: 0,
    scheduledDate: '2024-03-25'
  },
  {
    id: 'camp3',
    name: 'Chào mừng khách hàng mới',
    subject: 'Chào mừng bạn đến với Parfum Lumière',
    content: 'Nội dung email chào mừng...',
    status: 'draft',
    recipients: 0,
    openRate: 0,
    clickRate: 0
  }
];

const Email = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = mockCampaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCampaigns(filtered);
    } else {
      setCampaigns(mockCampaigns);
    }
  };

  const handleViewCampaign = (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status: EmailCampaign['status']) => {
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

  const getStatusText = (status: EmailCampaign['status']) => {
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
          <h1 className="text-2xl font-semibold text-gray-800">Email Marketing</h1>
          <p className="text-gray-600 mt-1">Quản lý chiến dịch email marketing</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tạo chiến dịch mới
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Tìm kiếm chiến dịch..."
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
          <h3 className="text-lg font-semibold text-gray-800">Tổng số người nhận</h3>
          <p className="text-3xl font-bold mt-2">3,500</p>
          <p className="text-sm text-gray-600 mt-1">+250 trong tháng này</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800">Tỷ lệ mở email</h3>
          <p className="text-3xl font-bold mt-2">45.5%</p>
          <p className="text-sm text-green-600 mt-1">+5.2% so với tháng trước</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800">Tỷ lệ click</h3>
          <p className="text-3xl font-bold mt-2">12.3%</p>
          <p className="text-sm text-green-600 mt-1">+2.1% so với tháng trước</p>
        </Card>
      </div>

      {/* Danh sách chiến dịch */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Tên chiến dịch</TableHead>
              <TableHead className="font-semibold">Trạng thái</TableHead>
              <TableHead className="font-semibold">Người nhận</TableHead>
              <TableHead className="font-semibold">Tỷ lệ mở</TableHead>
              <TableHead className="font-semibold">Tỷ lệ click</TableHead>
              <TableHead className="font-semibold">Ngày gửi</TableHead>
              <TableHead className="w-[100px] font-semibold">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-800">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.subject}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {getStatusText(campaign.status)}
                  </span>
                </TableCell>
                <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                <TableCell>{campaign.openRate}%</TableCell>
                <TableCell>{campaign.clickRate}%</TableCell>
                <TableCell>
                  {campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString('vi-VN') : 
                   campaign.scheduledDate ? `Lên lịch: ${new Date(campaign.scheduledDate).toLocaleDateString('vi-VN')}` : 
                   '-'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewCampaign(campaign)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Xem chi tiết</span>
                      </DropdownMenuItem>
                      {campaign.status === 'draft' && (
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          <span>Gửi ngay</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Dialog tạo chiến dịch mới */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tạo chiến dịch email mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tên chiến dịch</label>
              <Input placeholder="Nhập tên chiến dịch..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tiêu đề email</label>
              <Input placeholder="Nhập tiêu đề email..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nội dung email</label>
              <textarea
                rows={10}
                className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
                placeholder="Soạn nội dung email..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Đối tượng nhận</label>
              <select className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]">
                <option value="all">Tất cả khách hàng</option>
                <option value="new">Khách hàng mới</option>
                <option value="active">Khách hàng thường xuyên</option>
                <option value="inactive">Khách hàng không hoạt động</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button className="bg-[#1a1a1a] hover:bg-[#333] text-white">
              Tạo chiến dịch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xem chi tiết chiến dịch */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết chiến dịch</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Tên chiến dịch</h3>
                <p className="mt-1">{selectedCampaign.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Tiêu đề email</h3>
                <p className="mt-1">{selectedCampaign.subject}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Nội dung</h3>
                <p className="mt-1">{selectedCampaign.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Số người nhận</h3>
                  <p className="mt-1">{selectedCampaign.recipients.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Trạng thái</h3>
                  <p className="mt-1">{getStatusText(selectedCampaign.status)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Tỷ lệ mở</h3>
                  <p className="mt-1">{selectedCampaign.openRate}%</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Tỷ lệ click</h3>
                  <p className="mt-1">{selectedCampaign.clickRate}%</p>
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

export default Email; 