import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Nước Hoa Nam",
    description: "Mạnh mẽ và lịch lãm",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Nước Hoa Nữ",
    description: "Quyến rũ và tinh tế",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Nước Hoa Unisex",
    description: "Phá cách và độc đáo",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-perfume-cream">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl mb-4">Danh Mục Sản Phẩm</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập đa dạng với những mùi hương độc đáo và sang trọng
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-5">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-2xl mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-200 mb-4">{category.description}</p>
                    <Link 
                      to="/products"
                      className="inline-block bg-white text-gray-900 px-6 py-2 rounded-full text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      Khám phá ngay
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
