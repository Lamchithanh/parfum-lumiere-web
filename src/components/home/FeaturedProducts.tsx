
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { products } from '@/data/products';
import { IProduct } from '@/types';

const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const featuredProducts = products.filter(product => product.featured);
  const newArrivals = products.filter(product => product.new_arrival);
  
  const [activeTab, setActiveTab] = useState<'featured' | 'new'>('featured');
  const displayProducts = activeTab === 'featured' ? featuredProducts : newArrivals;
  
  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl mb-6">Bộ sưu tập nổi bật</h2>
          <div className="flex justify-center">
            <button
              className={`px-4 py-2 border-b-2 ${
                activeTab === 'featured'
                  ? 'border-perfume-gold text-perfume-gold'
                  : 'border-transparent text-gray-500 hover:text-perfume-gold'
              } transition-colors mx-2`}
              onClick={() => setActiveTab('featured')}
            >
              Sản phẩm nổi bật
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                activeTab === 'new'
                  ? 'border-perfume-gold text-perfume-gold'
                  : 'border-transparent text-gray-500 hover:text-perfume-gold'
              } transition-colors mx-2`}
              onClick={() => setActiveTab('new')}
            >
              Sản phẩm mới
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(product.id)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products" className="luxury-button">
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
