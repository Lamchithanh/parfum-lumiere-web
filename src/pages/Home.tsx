import Layout from '@/components/layout/Layout';
import Banner from '@/components/home/Banner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import BrandBanner from '@/components/home/BrandBanner';
import BrandProducts from '@/components/home/BrandProducts';
import NewsSection from '@/components/home/NewsSection';

const Home = () => {
  return (
    <Layout>
      <Banner />
      <FeaturedProducts />
      <Categories />
      <BrandProducts />
      <BrandBanner />
      <NewsSection />
      
      <section className="py-16 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl mb-6">Đăng ký nhận tin</h2>
          <p className="max-w-xl mx-auto mb-8 text-gray-300">
            Đăng ký để nhận thông tin về các sản phẩm mới và chương trình khuyến mãi đặc biệt.
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className="flex-grow bg-white/10 border border-white/20 px-4 py-2 rounded-l-full text-white placeholder-gray-400 focus:outline-none focus:border-gold"
            />
            <button className="bg-gold hover:bg-gold/90 text-white px-8 py-2 rounded-r-full transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
