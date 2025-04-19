
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      {/* Banner */}
      <div className="relative h-[50vh] bg-perfume-cream overflow-hidden">
        <img
          src="/placeholder.svg"
          alt="Parfum Lumière Brand"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <h1 className="font-serif text-5xl font-semibold mb-4">Về Parfum Lumière</h1>
            <p className="text-lg max-w-xl mx-auto">
              Hành trình kiến tạo mùi hương đẳng cấp và sang trọng
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl mb-6">Câu chuyện của chúng tôi</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Parfum Lumière được thành lập vào năm 2020 bởi những chuyên gia hàng đầu trong ngành nước hoa, với
                  tham vọng mang đến những mùi hương đẳng cấp và khác biệt cho thị trường Việt Nam.
                </p>
                <p>
                  Với sự kết hợp giữa nguyên liệu nhập khẩu từ các vùng nguyên liệu nổi tiếng của Pháp, Ý và Nhật Bản,
                  cùng với bí quyết gia truyền độc đáo, Parfum Lumière đã tạo ra những dòng sản phẩm mang đậm dấu ấn
                  riêng, kết hợp hài hòa giữa văn hóa phương Đông và phương Tây.
                </p>
                <p>
                  Chúng tôi tin rằng mỗi mùi hương là một tác phẩm nghệ thuật, là cách để bạn thể hiện cá tính và
                  phong cách riêng. Vì vậy, mỗi chai nước hoa của Parfum Lumière đều được chăm chút tỉ mỉ từ khâu
                  nghiên cứu, pha chế đến thiết kế và đóng gói.
                </p>
              </div>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-perfume-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl mb-12">Giá trị cốt lõi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-perfume-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-perfume-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Đam mê sáng tạo</h3>
              <p className="text-gray-700">
                Chúng tôi không ngừng tìm tòi, sáng tạo để mang đến những mùi hương độc đáo và khác biệt, phù hợp
                với văn hóa và thị hiếu của người Việt Nam.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-perfume-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-perfume-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Tôn trọng khách hàng</h3>
              <p className="text-gray-700">
                Chúng tôi đặt khách hàng vào trung tâm của mọi quyết định, cam kết mang đến những sản phẩm 
                chất lượng cao nhất với dịch vụ tận tâm.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-perfume-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-perfume-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Chất lượng xuất sắc</h3>
              <p className="text-gray-700">
                Mỗi chai nước hoa đều được kiểm định nghiêm ngặt về chất lượng, từ nguyên liệu đầu vào
                đến thành phẩm cuối cùng, đảm bảo an toàn cho người sử dụng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl mb-12 text-center">Đội ngũ chuyên gia</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(index => (
              <div key={index} className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto" style={{ maxWidth: '200px' }}>
                  <img
                    src="/placeholder.svg"
                    alt={`Team Member ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Nguyễn Văn A</h3>
                <p className="text-gray-600">Chuyên gia pha chế</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl mb-4">Trải nghiệm Parfum Lumière</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Khám phá bộ sưu tập nước hoa đẳng cấp và sang trọng của chúng tôi. Mỗi chai nước hoa là một tác phẩm nghệ thuật, 
            là câu chuyện riêng mà bạn muốn kể.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="px-8 py-6 bg-perfume-gold hover:bg-perfume-gold/90">
              <Link to="/products">Khám phá bộ sưu tập</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 py-6 text-white border-white hover:bg-white/10">
              <Link to="/contact">Liên hệ với chúng tôi</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
