import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { mockBrands } from '@/data/mockBrands';

const BrandBanner = () => {
  const navigate = useNavigate();

  const handleViewBrand = (brandName: string) => {
    navigate(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  const handleViewAll = () => {
    navigate('/products');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const brandVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("/images/pattern.png")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
        }} />
      </motion.div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-semibold mb-6 text-white">
            Bộ Sưu Tập Nổi Bật
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Trải nghiệm hương thơm đẳng cấp từ những bộ sưu tập độc quyền, được chọn lọc kỹ lưỡng
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {mockBrands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={brandVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleViewBrand(brand.name)}
            >
              <motion.div 
                initial={{ scale: 1.2, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="h-48 bg-center bg-cover"
                style={{ backgroundImage: `url(${brand.image})` }}
              />
              <div className="p-6">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl font-semibold mb-2 text-gray-900"
                >
                  {brand.name}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-gray-600 mb-4 line-clamp-2"
                >
                  {brand.description}
                </motion.p>
                <div className="flex justify-between items-center">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm text-gray-500"
                  >
                    {brand.productCount} sản phẩm
                  </motion.span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewBrand(brand.name);
                      }}
                      className="hover:bg-gray-100 border-gray-200"
                    >
                      Xem bộ sưu tập
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              onClick={handleViewAll}
              className="px-8 py-6 bg-white text-[#1a1a1a] hover:bg-white/90"
            >
              Xem tất cả thương hiệu
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandBanner; 