import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const bannerSlides = [
  {
    id: 1,
    title: "Amber Oud - Mùi hương đông phương",
    description: "Sự kết hợp giữa hổ phách và gỗ trầm hương tạo nên một mùi hương đầy bí ẩn",
    image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=1000&auto=format&fit=crop",
    buttonText: "Khám phá ngay"
  },
  {
    id: 2,
    title: "Rose Elixir - Tinh túy của hoa hồng",
    description: "Hương thơm thuần khiết từ những cánh hoa hồng Bulgaria",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    buttonText: "Mua ngay"
  },
  {
    id: 3,
    title: "Ocean Breeze - Hương biển nhiệt đới",
    description: "Cảm nhận làn gió biển mát lành cùng hương thơm của muối biển",
    image: "https://i.pinimg.com/736x/a1/56/2b/a1562bfcf13a4cf5c385640941cce954.jpg",
    buttonText: "Tìm hiểu thêm"
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {bannerSlides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1
          }}
          transition={{ duration: 1 }}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
              <div className="container mx-auto px-4 h-full flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0,
                    x: currentSlide === index ? 0 : -50
                  }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-xl text-white"
                >
                  <h1 className="font-serif text-5xl mb-6">{slide.title}</h1>
                  <p className="text-lg mb-8">{slide.description}</p>
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors">
                    {slide.buttonText}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
