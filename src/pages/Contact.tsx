import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { IContactForm } from '@/types';

const formSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  subject: z.string().min(5, 'Tiêu đề phải có ít nhất 5 ký tự'),
  message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      // Giả lập gửi form
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data:', data);
      toast.success('Gửi thông tin liên hệ thành công!');
      form.reset();
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  
  return (
    <Layout>
      {/* Banner Section */}
      <div className="relative h-[350px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/src/assest/backgroud_login.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-[#1a1a1a]" />
        </div>
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-white px-4">
          <motion.h1 
            className="font-serif text-5xl mb-4 text-center"
            {...fadeInUp}
          >
            Liên Hệ
          </motion.h1>
          <motion.p 
            className="text-lg text-center max-w-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Hãy để chúng tôi lắng nghe và hỗ trợ bạn tìm kiếm mùi hương phù hợp nhất
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-2xl font-serif mb-8 text-[#1a1a1a]">Thông Tin Liên Hệ</h2>
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#1a1a1a]/5 rounded-full flex items-center justify-center mr-4 group-hover:bg-[#1a1a1a]/10 transition-colors">
                    <MapPin className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-[#1a1a1a]">Địa Chỉ</h3>
                    <p className="text-gray-600 mt-1">123 Đường Hoa Hồng, Quận 1,<br/>TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#1a1a1a]/5 rounded-full flex items-center justify-center mr-4 group-hover:bg-[#1a1a1a]/10 transition-colors">
                    <Phone className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-[#1a1a1a]">Điện Thoại</h3>
                    <p className="text-gray-600 mt-1">+84 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#1a1a1a]/5 rounded-full flex items-center justify-center mr-4 group-hover:bg-[#1a1a1a]/10 transition-colors">
                    <Mail className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-[#1a1a1a]">Email</h3>
                    <p className="text-gray-600 mt-1">info@parfumlumiere.com</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-[#1a1a1a]/5 rounded-full flex items-center justify-center mr-4 group-hover:bg-[#1a1a1a]/10 transition-colors">
                    <Clock className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-[#1a1a1a]">Giờ Làm Việc</h3>
                    <div className="text-gray-600 mt-1 space-y-1">
                      <p>Thứ 2 - Thứ 6: 9:00 - 20:00</p>
                      <p>Thứ 7: 9:00 - 18:00</p>
                      <p>Chủ nhật: 10:00 - 16:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="h-[300px] rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197276!2d106.69765661533417!3d10.778789792319695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8d1bb3%3A0xc4b3b6340de93df6!2zMTIzIMSQxrDhu51uZyBIb2EgSOG7k25nLCBQaMaw4budbmcgMiwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1647846245012!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif mb-8 text-[#1a1a1a]">Gửi Tin Nhắn</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập họ và tên" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập số điện thoại" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tiêu đề" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Nhập nội dung tin nhắn" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
