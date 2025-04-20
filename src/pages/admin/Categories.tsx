import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
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

// Mock data cho danh mục
interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  productCount: number;
  image: string;
  featured: boolean;
}

const mockCategories: Category[] = [
  {
    id: 'cat1',
    name: 'Nước hoa Nam',
    description: 'Các loại nước hoa dành cho nam giới',
    slug: 'nuoc-hoa-nam',
    productCount: 25,
    image: 'https://i.pinimg.com/736x/3c/9f/51/3c9f51ae9aa0daa34a01e3373b3a6971.jpg',
    featured: true
  },
  {
    id: 'cat2',
    name: 'Nước hoa Nữ',
    description: 'Các loại nước hoa dành cho nữ giới',
    slug: 'nuoc-hoa-nu',
    productCount: 35,
    image: 'https://i.pinimg.com/736x/72/36/0e/72360ec43a3bb6a73fab60dbdaa95001.jpg',
    featured: true
  },
  {
    id: 'cat3',
    name: 'Nước hoa Unisex',
    description: 'Các loại nước hoa dùng được cho cả nam và nữ',
    slug: 'nuoc-hoa-unisex',
    productCount: 20,
    image: 'https://i.pinimg.com/736x/01/fd/8d/01fd8dc733176214a6bed4b9605f2aa2.jpg',
    featured: false
  }
];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: ''
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = mockCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCategories(filtered);
    } else {
      setCategories(mockCategories);
    }
  };

  const handleAddCategory = () => {
    const category: Category = {
      id: `cat${Date.now()}`,
      name: newCategory.name,
      description: newCategory.description,
      slug: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      productCount: 0,
      image: newCategory.image || 'https://via.placeholder.com/150',
      featured: false
    };

    setCategories([...categories, category]);
    setIsAddDialogOpen(false);
    setNewCategory({
      name: '',
      description: '',
      image: ''
    });
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    if (!selectedCategory) return;

    const updatedCategories = categories.map(category =>
      category.id === selectedCategory.id ? selectedCategory : category
    );

    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    setCategories(updatedCategories);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý danh mục</h1>
          <p className="text-gray-600 mt-1">Quản lý các danh mục sản phẩm</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Thêm danh mục
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Tìm kiếm danh mục..."
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
              <TableHead className="font-semibold">Danh mục</TableHead>
              <TableHead className="font-semibold">Mô tả</TableHead>
              <TableHead className="font-semibold">Số sản phẩm</TableHead>
              <TableHead className="font-semibold">Trạng thái</TableHead>
              <TableHead className="w-[100px] font-semibold">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 mr-3">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="font-medium text-gray-800">{category.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{category.description}</TableCell>
                <TableCell className="text-gray-600">{category.productCount}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.featured
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {category.featured ? 'Nổi bật' : 'Thường'}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteCategory(category.id)}
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

      {/* Dialog thêm danh mục */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tên danh mục</label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Nhập tên danh mục..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mô tả</label>
              <Input
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Nhập mô tả..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Hình ảnh</label>
              <Input
                value={newCategory.image}
                onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                placeholder="Nhập URL hình ảnh..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddCategory} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
              Thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog chỉnh sửa danh mục */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tên danh mục</label>
              <Input
                value={selectedCategory?.name}
                onChange={(e) => setSelectedCategory(selectedCategory ? {
                  ...selectedCategory,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                } : null)}
                placeholder="Nhập tên danh mục..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mô tả</label>
              <Input
                value={selectedCategory?.description}
                onChange={(e) => setSelectedCategory(selectedCategory ? {
                  ...selectedCategory,
                  description: e.target.value
                } : null)}
                placeholder="Nhập mô tả..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Hình ảnh</label>
              <Input
                value={selectedCategory?.image}
                onChange={(e) => setSelectedCategory(selectedCategory ? {
                  ...selectedCategory,
                  image: e.target.value
                } : null)}
                placeholder="Nhập URL hình ảnh..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={selectedCategory?.featured}
                onChange={(e) => setSelectedCategory(selectedCategory ? {
                  ...selectedCategory,
                  featured: e.target.checked
                } : null)}
                className="rounded border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Đánh dấu là danh mục nổi bật
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleUpdateCategory} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories; 