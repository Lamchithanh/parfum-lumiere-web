
import Layout from '@/components/layout/Layout';
import Banner from '@/components/home/Banner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';

const Home = () => {
  return (
    <Layout>
      <Banner />
      <FeaturedProducts />
      <Categories />
      
      <section className="py-16 bg-perfume-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl mb-6">Đăng ký nhận tin</h2>
          <p className="max-w-xl mx-auto mb-8 text-gray-600">
            Đăng ký để nhận thông tin về các sản phẩm mới và chương trình khuyến mãi đặc biệt.
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className="flex-grow border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-perfume-gold"
            />
            <button className="luxury-button whitespace-nowrap">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
