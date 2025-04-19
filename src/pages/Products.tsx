
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { IProduct } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import { Search } from 'lucide-react';

// Mock data - trong thực tế sẽ lấy từ API
const mockProducts: IProduct[] = [
  {
    id: "p1",
    name: "Parfum Lumière No.1",
    brand: "Parfum Lumière",
    description: "Hương thơm quyến rũ với notes hoa hồng và vanilla",
    images: ["/placeholder.svg", "/placeholder.svg"],
    category: "Women",
    scent_notes: ["Hoa hồng", "Vanilla", "Gỗ đàn hương"],
    variants: [
      { id: "v1", capacity: "50ml", price: 2500000, stock: 10 },
      { id: "v2", capacity: "100ml", price: 4500000, stock: 5 }
    ],
    rating: 4.5,
    reviews: [],
    featured: true,
    new_arrival: true
  },
  {
    id: "p2",
    name: "Parfum Lumière No.2",
    brand: "Parfum Lumière",
    description: "Hương thơm mạnh mẽ dành cho nam giới",
    images: ["/placeholder.svg", "/placeholder.svg"],
    category: "Men",
    scent_notes: ["Gỗ đàn hương", "Hổ phách", "Quả cam"],
    variants: [
      { id: "v3", capacity: "50ml", price: 2700000, stock: 10 },
      { id: "v4", capacity: "100ml", price: 4800000, stock: 5 }
    ],
    rating: 4.7,
    reviews: [],
    featured: true,
    new_arrival: false
  },
  {
    id: "p3",
    name: "Parfum Lumière No.3",
    brand: "Parfum Lumière",
    description: "Hương thơm nhẹ nhàng phù hợp với mọi giới tính",
    images: ["/placeholder.svg", "/placeholder.svg"],
    category: "Unisex",
    scent_notes: ["Hoa nhài", "Quả chanh", "Xạ hương"],
    variants: [
      { id: "v5", capacity: "50ml", price: 2300000, stock: 10 },
      { id: "v6", capacity: "100ml", price: 4200000, stock: 5 }
    ],
    rating: 4.3,
    reviews: [],
    featured: false,
    new_arrival: true
  }
];

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([1000000, 10000000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Lọc sản phẩm theo tìm kiếm, giá, và danh mục
  useEffect(() => {
    let filteredProducts = mockProducts;
    
    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Lọc theo giá
    filteredProducts = filteredProducts.filter(product => {
      const minProductPrice = Math.min(...product.variants.map(v => v.price));
      const maxProductPrice = Math.max(...product.variants.map(v => v.price));
      return maxProductPrice >= priceRange[0] && minProductPrice <= priceRange[1];
    });
    
    // Lọc theo danh mục
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setProducts(filteredProducts);
  }, [searchTerm, priceRange, selectedCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl mb-8 text-center">Sản phẩm nước hoa</h1>
        
        {/* Thanh tìm kiếm */}
        <div className="flex mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Bộ lọc */}
          <aside className="md:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-4">Danh mục</h3>
              <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="flex flex-col space-y-2 w-full">
                  <TabsTrigger value="all" className="w-full justify-start">Tất cả</TabsTrigger>
                  <TabsTrigger value="women" className="w-full justify-start">Nữ</TabsTrigger>
                  <TabsTrigger value="men" className="w-full justify-start">Nam</TabsTrigger>
                  <TabsTrigger value="unisex" className="w-full justify-start">Unisex</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-4">Giá (VNĐ)</h3>
              <div className="space-y-6">
                <Slider
                  defaultValue={[1000000, 10000000]}
                  min={1000000}
                  max={10000000}
                  step={500000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between">
                  <span>{new Intl.NumberFormat('vi-VN').format(priceRange[0])}đ</span>
                  <span>{new Intl.NumberFormat('vi-VN').format(priceRange[1])}đ</span>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Danh sách sản phẩm */}
          <div className="md:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Không tìm thấy sản phẩm nào phù hợp với tiêu chí tìm kiếm.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
