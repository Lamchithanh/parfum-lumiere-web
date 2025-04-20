import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { favoritesService } from '@/lib/favorites';
import { productService } from '@/services/productService';
import { IProduct } from '@/types';
import ProductCard from '@/components/products/ProductCard';

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const products = await productService.getAllProducts();
        const favorites = favoritesService.getFavorites();
        const favoriteProducts = products.filter(product => 
          favorites.includes(product.id)
        );
        setFavoriteProducts(favoriteProducts);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
      setLoading(false);
    };

    loadFavorites();
  }, []);

  const handleToggleFavorite = (productId: number) => {
    favoritesService.toggleFavorite(productId);
    setFavoriteProducts(prev => prev.filter(product => product.id !== productId));
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Chưa có sản phẩm yêu thích</h2>
            <p className="text-gray-500 mb-8">Hãy thêm sản phẩm vào danh sách yêu thích của bạn</p>
            <Button asChild className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white">
              <Link to="/products">Khám phá sản phẩm</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-medium mb-8">Sản phẩm yêu thích</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              toggleFavorite={handleToggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
