
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { IProduct } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: IProduct;
  toggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

const ProductCard = ({ 
  product, 
  toggleFavorite,
  isFavorite = false
}: ProductCardProps) => {
  const lowestPrice = Math.min(...product.variants.map(variant => variant.price));
  
  return (
    <div className="perfume-card group relative">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* New Arrival or Featured Tag */}
        {product.new_arrival && (
          <div className="absolute top-2 left-2 bg-perfume-pink px-3 py-1 text-xs uppercase tracking-wider">
            Mới
          </div>
        )}
        {!product.new_arrival && product.featured && (
          <div className="absolute top-2 left-2 bg-perfume-gold text-white px-3 py-1 text-xs uppercase tracking-wider">
            Nổi bật
          </div>
        )}
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white py-2 px-4 text-xs uppercase tracking-wider">
            Xem chi tiết
          </span>
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-serif text-lg">
              <Link to={`/products/${product.id}`} className="hover:text-perfume-gold transition-colors">
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          </div>
          
          {/* Favorite Button */}
          {toggleFavorite && (
            <button 
              onClick={() => toggleFavorite(product.id)}
              className="text-gray-400 hover:text-perfume-gold transition-colors"
              aria-label={isFavorite ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"}
            >
              <Heart className={isFavorite ? "fill-perfume-gold text-perfume-gold" : ""} size={20} />
            </button>
          )}
        </div>
        
        {/* Price */}
        <div className="flex justify-between items-center">
          <div>
            <span className="font-medium">{formatPrice(lowestPrice)}</span>
            {product.variants.length > 1 && <span className="text-sm text-gray-500"> trở lên</span>}
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            <span className="text-sm mr-1">{product.rating.toFixed(1)}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(product.rating)
                      ? 'text-perfume-gold'
                      : star <= product.rating
                      ? 'text-perfume-gold'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-6.327 3.323 1.209-7.04-5.117-4.981 7.079-1.029L10 0l3.156 5.858 7.079 1.029-5.117 4.981 1.209 7.04z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
