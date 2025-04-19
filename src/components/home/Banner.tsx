
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface BannerItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const bannerItems: BannerItem[] = [
  {
    id: 1,
    title: "Bộ sưu tập mùa xuân 2025",
    description: "Khám phá những mùi hương mới nhất với sự tinh tế và đẳng cấp",
    imageUrl: "/placeholder.svg",
    link: "/products"
  },
  {
    id: 2,
    title: "Amber Oud - Mùi hương đông phương",
    description: "Sự kết hợp giữa hổ phách và gỗ trầm hương tạo nên một mùi hương đầy bí ẩn",
    imageUrl: "/placeholder.svg",
    link: "/products/5"
  },
  {
    id: 3,
    title: "Elysium Parfum - Tinh tế và sang trọng",
    description: "Một mùi hương gợi cảm với những nốt hương hoa và gỗ",
    imageUrl: "/placeholder.svg",
    link: "/products/1"
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {bannerItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            zIndex: index === currentSlide ? 10 : 0,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/40 z-10" />
          <div className="absolute inset-0 bg-perfume-gold/10 z-10" />
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          />
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4">
              <div className="max-w-lg mx-auto md:mx-0 md:ml-12 bg-white/30 backdrop-blur-sm p-8 rounded-sm">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 animate-slide-in">
                  {item.title}
                </h2>
                <p className="text-white text-lg mb-6 animate-fade-in">
                  {item.description}
                </p>
                <Link
                  to={item.link}
                  className="luxury-button inline-block animate-fade-in"
                >
                  Khám phá ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30">
        <div className="flex space-x-2">
          {bannerItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-perfume-gold w-8' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
