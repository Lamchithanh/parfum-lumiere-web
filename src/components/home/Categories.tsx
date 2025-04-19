
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'women',
    name: 'Nước hoa nữ',
    description: 'Khám phá những mùi hương tinh tế và gợi cảm dành cho phái đẹp',
    image: '/placeholder.svg',
    link: '/products?category=Women'
  },
  {
    id: 'men',
    name: 'Nước hoa nam',
    description: 'Những mùi hương mạnh mẽ và nam tính dành cho phái mạnh',
    image: '/placeholder.svg',
    link: '/products?category=Men'
  },
  {
    id: 'unisex',
    name: 'Nước hoa unisex',
    description: 'Những mùi hương đa dạng phù hợp cho cả nam và nữ',
    image: '/placeholder.svg',
    link: '/products?category=Unisex'
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-perfume">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl text-center mb-12">Bộ sưu tập theo danh mục</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="relative group overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="font-serif text-white text-2xl mb-2">{category.name}</h3>
                  <p className="text-white text-sm mb-4 max-w-xs opacity-90">{category.description}</p>
                  <Link
                    to={category.link}
                    className="border border-white text-white hover:bg-white hover:text-gray-900 transition-colors px-6 py-2 uppercase tracking-wider text-sm"
                  >
                    Khám phá
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
