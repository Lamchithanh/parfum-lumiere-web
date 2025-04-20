import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { normalizeProductName } from '@/lib/utils';

interface Brand {
  id: number;
  name: string;
  logo: string;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const brands: Brand[] = [
  {
    id: 1,
    name: "Chanel",
    logo: "https://i.pinimg.com/736x/5d/83/f2/5d83f26f9a6f7fce5eec41d5d95ae0d7.jpg",
    products: [
      {
        id: 1,
        name: "Chanel N°5",
        image: "https://i.pinimg.com/736x/55/08/1e/55081e2b49a6af596a133c7e6b1086be.jpg",
        price: 3450000
      },
      {
        id: 2,
        name: "Coco Mademoiselle",
        image: "https://i.pinimg.com/736x/9a/f9/6b/9af96b7b7a7cc7cd9e88cbd1b2fe56b4.jpg",
        price: 3250000
      }
    ]
  },
  {
    id: 2,
    name: "Dior",
    logo: "https://i.pinimg.com/736x/7c/04/b2/7c04b2b0742ec4445b0d74ce9203748d.jpg",
    products: [
      {
        id: 3,
        name: "J'adore",
        image: "https://i.pinimg.com/736x/03/31/64/03316405e2d1f066088e9c6e43a9826f.jpg",
        price: 2950000
      },
      {
        id: 4,
        name: "Miss Dior",
        image: "https://i.pinimg.com/736x/57/09/af/5709afb5d9b7af9ad93d89dae83506f8.jpg",
        price: 2850000
      }
    ]
  }
];

const BrandProducts = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const brandVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const productVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-[#f8f5f2]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl mb-4">Thương Hiệu Nổi Tiếng</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá các bộ sưu tập độc quyền từ những thương hiệu nước hoa hàng đầu thế giới
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={brandVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="md:col-span-1 p-8 flex flex-col justify-center items-center bg-gray-50"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-32 h-32 object-cover rounded-full mb-4"
                  />
                  <h3 className="font-serif text-2xl mb-2">{brand.name}</h3>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gold hover:text-gold/80 transition-colors"
                  >
                    Xem tất cả
                  </motion.button>
                </motion.div>
                
                <div className="md:col-span-3 p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {brand.products.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={productVariants}
                        className="group"
                      >
                        <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                to={`/product/${normalizeProductName(product.name)}`}
                                className="bg-white text-gray-900 px-6 py-2 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                              >
                                Xem chi tiết
                              </Link>
                            </motion.div>
                          </div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                        >
                          <h4 className="font-serif text-lg mb-2">{product.name}</h4>
                          <p className="text-gold font-medium">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                          </p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandProducts; 