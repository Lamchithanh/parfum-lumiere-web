
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { IProduct } from '@/types';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Mock data - trong thực tế sẽ lấy từ API
const mockFavorites: IProduct[] = [
  {
    id: "p1",
    name: "Parfum Lumière No.1",
    brand: "Parfum Lumière",
    description: "Hương thơm quyến rũ với notes hoa hồng và vanilla",
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<IProduct[]>(mockFavorites);
  
  const handleRemoveFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(product => product.id !== productId));
    toast({
      title: "Đã xóa khỏi danh sách yêu thích",
    });
  };
  
  const handleAddToCart = (product: IProduct) => {
    // Trong thực tế sẽ kết nối với context hoặc redux store
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} (${product.variants[0].capacity})`,
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl mb-8 text-center">Sản phẩm yêu thích</h1>
        
        {favorites.length > 0 ? (
          <div className="space-y-8">
            {favorites.map(product => (
              <div key={product.id} className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden">
                {/* Hình ảnh */}
                <div className="md:w-1/4 bg-gray-100">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover aspect-square"
                    />
                  </Link>
                </div>
                
                {/* Thông tin sản phẩm */}
                <div className="flex-grow p-6 flex flex-col justify-between">
                  <div>
                    <Link to={`/products/${product.id}`} className="hover:text-perfume-gold">
                      <h2 className="text-xl font-medium">{product.name}</h2>
                    </Link>
                    <p className="text-gray-600 mt-1">{product.brand}</p>
                    <p className="text-gray-700 mt-3 line-clamp-2">{product.description}</p>
                    
                    <div className="mt-4">
                      <h3 className="font-medium">Mùi hương:</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product.scent_notes.map((note, index) => (
                          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-perfume-gold">
                        {formatPrice(product.variants[0].price)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.variants.map(v => v.capacity).join(' / ')}
                      </p>
                    </div>
                    
                    <div className="flex space-x-3 mt-4 sm:mt-0">
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveFromFavorites(product.id)}
                        className="flex items-center"
                      >
                        <Heart className="mr-2 h-4 w-4 fill-current" />
                        Xóa
                      </Button>
                      
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center"
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Chưa có sản phẩm yêu thích</h2>
            <p className="text-gray-600 mb-8">
              Thêm các sản phẩm yêu thích vào danh sách này để dễ dàng theo dõi và mua sau.
            </p>
            <Button asChild className="px-6 py-6">
              <Link to="/products">Khám phá sản phẩm</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
