import { useState, useEffect } from 'react';
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
import { productService } from '@/services/productService';
import { IProduct } from '@/types';

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000] as [number, number],
    brands: [] as string[],
    categories: [] as string[],
    sortBy: 'newest' as 'price-asc' | 'price-desc' | 'rating' | 'newest'
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const allProducts = await productService.getAllProducts();
    setProducts(allProducts);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await productService.searchProducts(searchQuery);
      setProducts(results);
    } else {
      loadProducts();
    }
  };

  const handleFilter = async () => {
    const filteredProducts = await productService.filterProducts(filters);
    setProducts(filteredProducts);
    setIsFilterDialogOpen(false);
  };

  const handleEditProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    // Implement delete logic here
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý sản phẩm</h1>
          <p className="text-gray-600 mt-1">Quản lý tất cả sản phẩm trong hệ thống</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsFilterDialogOpen(true)} variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Lọc
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
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
              <TableHead className="font-semibold">Sản phẩm</TableHead>
              <TableHead className="font-semibold">Thương hiệu</TableHead>
              <TableHead className="font-semibold">Danh mục</TableHead>
              <TableHead className="font-semibold">Giá</TableHead>
              <TableHead className="font-semibold">Trạng thái</TableHead>
              <TableHead className="w-[100px] font-semibold">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 mr-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{product.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[300px]">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{product.brand}</TableCell>
                <TableCell className="text-gray-600">{product.category}</TableCell>
                <TableCell className="text-gray-600">{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.featured
                      ? 'bg-purple-100 text-purple-700'
                      : product.new_arrival
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {product.featured ? 'Nổi bật' : product.new_arrival ? 'Mới' : 'Thường'}
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
                      <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteProduct(product.id)}
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

      {/* Dialog lọc sản phẩm */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lọc sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Khoảng giá</label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Từ"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                  })}
                />
                <Input
                  type="number"
                  placeholder="Đến"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                  })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Sắp xếp theo</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({
                  ...filters,
                  sortBy: e.target.value as typeof filters.sortBy
                })}
                className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="rating">Đánh giá</option>
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

      {/* Dialog thêm sản phẩm - Sẽ implement sau */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tên sản phẩm</label>
              <Input placeholder="Nhập tên sản phẩm..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mô tả</label>
              <textarea
                rows={3}
                className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
                placeholder="Nhập mô tả sản phẩm..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Thương hiệu</label>
                <Input placeholder="Nhập thương hiệu..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Danh mục</label>
                <select className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]">
                  <option value="">Chọn danh mục</option>
                  <option value="nam">Nước hoa Nam</option>
                  <option value="nu">Nước hoa Nữ</option>
                  <option value="unisex">Nước hoa Unisex</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Giá</label>
                <Input type="number" placeholder="Nhập giá sản phẩm..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Số lượng</label>
                <Input type="number" placeholder="Nhập số lượng..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Hình ảnh</label>
              <Input type="file" multiple accept="image/*" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Trạng thái</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]" />
                  <span className="ml-2">Sản phẩm nổi bật</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]" />
                  <span className="ml-2">Sản phẩm mới</span>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button className="bg-[#1a1a1a] hover:bg-[#333] text-white">
              Thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog chỉnh sửa sản phẩm - Sẽ implement sau */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Form chỉnh sửa sản phẩm */}
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

export default Products; 