import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { normalizeProductName } from '@/lib/utils';
import { mockProducts } from '@/data/mockProducts';

const FeaturedProducts = () => {
  // Lấy 4 sản phẩm đầu tiên làm sản phẩm nổi bật
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl mb-4"
          >
            Sản Phẩm Nổi Bật
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Khám phá bộ sưu tập nước hoa cao cấp được chọn lọc kỹ lưỡng
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-lg shadow-lg overflow-hidden h-[450px] flex flex-col"
            >
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link 
                    to={`/product/${normalizeProductName(product.name)}`}
                    className="bg-white text-gray-900 px-6 py-2 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow p-4">
                <p className="text-sm text-gray-500">{product.brand}</p>
                <h3 className="font-serif text-lg mt-1 mb-2 flex-grow">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
