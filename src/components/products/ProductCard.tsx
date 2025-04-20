import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { IProduct } from '@/types';
import { formatPrice, normalizeProductName } from '@/lib/utils';

interface ProductCardProps {
  product: IProduct;
  toggleFavorite?: (productId: number) => void;
  isFavorite?: boolean;
}

const ProductCard = ({ product, toggleFavorite, isFavorite }: ProductCardProps) => {
  const productUrl = `/product/${normalizeProductName(product.name)}`;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden">
      {toggleFavorite && (
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-2 right-2 p-2 z-10 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : 'text-gray-600 hover:text-primary'}`}
          />
        </button>
      )}

      <Link to={productUrl}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white text-gray-900 px-6 py-2 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Xem chi tiết
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={productUrl}>
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-gray-900 font-medium">{formatPrice(product.price)}</p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
