import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import authService from '@/services/authService';
import dglogin from '@/assest/images/backgroud_login_3.jpg';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { userInfoService } from '@/lib/userInfo';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await authService.login(values.email, values.password);
      
      if (response.success) {
        toast.success('Đăng nhập thành công', {
          description: 'Chào mừng bạn quay trở lại!'
        });
        const redirectUrl = userInfoService.getAndClearRedirectUrl() || '/';
        navigate(redirectUrl);
      } else {
        toast.error('Đăng nhập thất bại', {
          description: response.message || 'Email hoặc mật khẩu không chính xác'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Đăng nhập thất bại', {
        description: 'Đã có lỗi xảy ra khi đăng nhập'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Image Section */}
      <div className="hidden lg:block relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={dglogin}
            alt="Login Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center p-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h2 className="text-5xl font-serif mb-6">Chào mừng trở lại</h2>
              <p className="text-xl text-gray-200 max-w-lg mx-auto">
                Đăng nhập để tiếp tục khám phá thế giới nước hoa độc đáo và đẳng cấp
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-8 bg-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-white mb-2">Parfum Lumière</h1>
            <h2 className="text-2xl font-serif text-white mb-2">Đăng nhập tài khoản</h2>
            <p className="text-gray-400">
              Đăng nhập để trải nghiệm dịch vụ của chúng tôi
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập email của bạn"
                        className="bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Nhập mật khẩu"
                          className="bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-400"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1a1a1a] text-gray-400">
                    Đăng nhập nhanh bằng mạng xã hội
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  className="p-2 rounded-full bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a] transition-colors"
                >
                  <Facebook size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a] transition-colors"
                >
                  <Instagram size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a] transition-colors"
                >
                  <Twitter size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a] transition-colors"
                >
                  <Mail size={20} />
                </button>
              </div>

              <div className="flex justify-between text-sm">
                <Link
                  to="/forgot-password"
                  className="text-pink-500 hover:text-pink-400"
                >
                  Quên mật khẩu?
                </Link>
                <p className="text-gray-400">
                  Chưa có tài khoản?{' '}
                  <Link
                    to="/register"
                    className="text-pink-500 hover:text-pink-400"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
} 