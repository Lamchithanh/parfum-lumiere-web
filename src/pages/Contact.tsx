
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';
import { IContactForm } from '@/types';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<IContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Giả lập API call
    setTimeout(() => {
      toast({
        title: "Gửi thông tin thành công",
        description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl mb-2 text-center">Liên hệ</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Hãy liên hệ với chúng tôi để được tư vấn về sản phẩm hoặc gửi phản hồi của bạn. Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form liên hệ */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Gửi tin nhắn cho chúng tôi</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Nhập địa chỉ email của bạn"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Nhập số điện thoại của bạn"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Tin nhắn
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Nhập tin nhắn của bạn"
                  className="min-h-[120px]"
                />
              </div>
              
              <Button type="submit" className="w-full py-6" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </Button>
            </form>
          </div>
          
          {/* Thông tin liên hệ */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-6">Thông tin liên hệ</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-perfume-gold mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Địa chỉ</h3>
                    <p className="text-gray-600 mt-1">123 Đường Hoa Hồng, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-perfume-gold mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Điện thoại</h3>
                    <p className="text-gray-600 mt-1">+84 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-perfume-gold mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600 mt-1">info@parfumlumiere.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-6">Giờ làm việc</h2>
              <div className="space-y-2 text-gray-600">
                <p>Thứ 2 - Thứ 6: 9:00 - 20:00</p>
                <p>Thứ 7: 9:00 - 18:00</p>
                <p>Chủ nhật: 10:00 - 16:00</p>
              </div>
            </div>
            
            <div className="pt-4">
              <img 
                src="/placeholder.svg" 
                alt="Showroom Parfum Lumière" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
