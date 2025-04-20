import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, MoreHorizontal, Filter } from 'lucide-react';
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

// Mock data cho blog
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishDate: string;
  status: 'draft' | 'published';
  featured: boolean;
}

const mockPosts: BlogPost[] = [
  {
    id: 'post1',
    title: 'Cách chọn nước hoa phù hợp với từng mùa trong năm',
    excerpt: 'Khám phá cách chọn nước hoa phù hợp với từng mùa để tạo nên dấu ấn riêng của bạn.',
    content: 'Nội dung chi tiết về cách chọn nước hoa theo mùa...',
    image: 'https://i.pinimg.com/736x/72/36/0e/72360ec43a3bb6a73fab60dbdaa95001.jpg',
    author: {
      name: 'Nguyễn Thị A',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    category: 'Hướng dẫn',
    tags: ['nước hoa', 'mùa', 'hướng dẫn'],
    publishDate: '2024-03-20',
    status: 'published',
    featured: true
  },
  {
    id: 'post2',
    title: 'Top 10 mùi hương được yêu thích nhất 2024',
    excerpt: 'Điểm qua những mùi hương đang được ưa chuộng nhất trong năm 2024.',
    content: 'Nội dung chi tiết về top 10 mùi hương...',
    image: 'https://i.pinimg.com/736x/3c/9f/51/3c9f51ae9aa0daa34a01e3373b3a6971.jpg',
    author: {
      name: 'Trần Văn B',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    category: 'Xu hướng',
    tags: ['top 10', 'xu hướng', '2024'],
    publishDate: '2024-03-18',
    status: 'published',
    featured: true
  },
  {
    id: 'post3',
    title: 'Bí quyết giữ mùi hương nước hoa lâu hơn',
    excerpt: 'Những mẹo hay giúp mùi hương nước hoa của bạn lưu giữ được lâu hơn.',
    content: 'Nội dung chi tiết về cách giữ mùi hương...',
    image: 'https://i.pinimg.com/736x/01/fd/8d/01fd8dc733176214a6bed4b9605f2aa2.jpg',
    author: {
      name: 'Lê Thị C',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    category: 'Mẹo hay',
    tags: ['mẹo hay', 'nước hoa', 'hướng dẫn'],
    publishDate: '2024-03-15',
    status: 'draft',
    featured: false
  }
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    featured: 'all'
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = mockPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPosts(filtered);
    } else {
      setPosts(mockPosts);
    }
  };

  const handleFilter = () => {
    let filtered = [...mockPosts];

    if (filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(post => post.status === filters.status);
    }

    if (filters.featured !== 'all') {
      filtered = filtered.filter(post => 
        filters.featured === 'true' ? post.featured : !post.featured
      );
    }

    setPosts(filtered);
    setIsFilterDialogOpen(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditDialogOpen(true);
  };

  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  const getStatusColor = (status: BlogPost['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: BlogPost['status']) => {
    switch (status) {
      case 'published':
        return 'Đã đăng';
      case 'draft':
        return 'Bản nháp';
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý Blog</h1>
          <p className="text-gray-600 mt-1">Quản lý bài viết và tin tức</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsFilterDialogOpen(true)} variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Lọc
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Thêm bài viết
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Bài viết</TableHead>
              <TableHead className="font-semibold">Tác giả</TableHead>
              <TableHead className="font-semibold">Danh mục</TableHead>
              <TableHead className="font-semibold">Ngày đăng</TableHead>
              <TableHead className="font-semibold">Trạng thái</TableHead>
              <TableHead className="w-[100px] font-semibold">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 mr-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{post.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[300px]">
                        {post.excerpt}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 mr-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="text-gray-600">{post.author.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{post.category}</TableCell>
                <TableCell className="text-gray-600">
                  {new Date(post.publishDate).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {getStatusText(post.status)}
                    </span>
                    {post.featured && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        Nổi bật
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditPost(post)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Xóa</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog lọc bài viết */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lọc bài viết</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Danh mục</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
              >
                <option value="all">Tất cả</option>
                <option value="Hướng dẫn">Hướng dẫn</option>
                <option value="Xu hướng">Xu hướng</option>
                <option value="Mẹo hay">Mẹo hay</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Trạng thái</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
              >
                <option value="all">Tất cả</option>
                <option value="published">Đã đăng</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bài viết nổi bật</label>
              <select
                value={filters.featured}
                onChange={(e) => setFilters({ ...filters, featured: e.target.value })}
                className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
              >
                <option value="all">Tất cả</option>
                <option value="true">Nổi bật</option>
                <option value="false">Không nổi bật</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilterDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleFilter} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
              Áp dụng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog thêm bài viết - Sẽ implement sau */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm bài viết mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${currentStep === 1 ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100'}`}>
                    1
                  </div>
                  <span className="ml-2">Thông tin cơ bản</span>
                </div>
                <div className={`flex items-center ${currentStep === 2 ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100'}`}>
                    2
                  </div>
                  <span className="ml-2">Nội dung</span>
                </div>
                <div className={`flex items-center ${currentStep === 3 ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 3 ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100'}`}>
                    3
                  </div>
                  <span className="ml-2">Cài đặt</span>
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tiêu đề</label>
                  <Input placeholder="Nhập tiêu đề bài viết..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tóm tắt</label>
                  <textarea
                    rows={3}
                    className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
                    placeholder="Nhập tóm tắt bài viết..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Danh mục</label>
                    <select className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]">
                      <option value="">Chọn danh mục</option>
                      <option value="huong-dan">Hướng dẫn</option>
                      <option value="xuat-huong">Xu hướng</option>
                      <option value="meo-hay">Mẹo hay</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tác giả</label>
                    <Input placeholder="Nhập tên tác giả..." />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nội dung</label>
                  <textarea
                    rows={10}
                    className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
                    placeholder="Nhập nội dung bài viết..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Hình ảnh</label>
                  <Input type="file" accept="image/*" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tags</label>
                  <Input placeholder="Nhập tags, cách nhau bằng dấu phẩy..." />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Trạng thái</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="status" value="draft" className="rounded-full border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]" />
                      <span className="ml-2">Bản nháp</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="status" value="published" className="rounded-full border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]" />
                      <span className="ml-2">Đăng ngay</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]" />
                    <span className="ml-2">Đánh dấu là bài viết nổi bật</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Hủy
              </Button>
              <div className="flex items-center space-x-2">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Quay lại
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
                    Tiếp tục
                  </Button>
                ) : (
                  <Button className="bg-[#1a1a1a] hover:bg-[#333] text-white">
                    Thêm bài viết
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog chỉnh sửa bài viết - Sẽ implement sau */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Form chỉnh sửa bài viết */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button className="bg-[#1a1a1a] hover:bg-[#333] text-white">
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog; 