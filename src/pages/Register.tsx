import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import authService from '@/services/authService';
import dgregister from '@/assest/images/backgroud_login_2.jpg';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }
    setLoading(true);

    try {
      const response = await authService.register(
        formData.email,
        formData.password,
        formData.fullName
      );
      
      if (response.success) {
        toast.success(response.message);
        navigate('/login');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi đăng ký');
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
            src={dgregister}
            alt="Register Background"
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
              <h2 className="text-5xl font-serif mb-6">Chào mừng đến với Parfum Lumière</h2>
              <p className="text-xl text-gray-200 max-w-lg mx-auto">
                Khám phá thế giới nước hoa độc đáo và đẳng cấp, nơi mỗi hương thơm kể một câu chuyện riêng
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
            <h2 className="text-2xl font-serif text-white mb-2">Đăng ký tài khoản</h2>
            <p className="text-gray-400">
              Tạo tài khoản để trải nghiệm dịch vụ của chúng tôi
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Họ và tên
              </label>
              <Input
                type="text"
                placeholder="Nhập họ và tên của bạn"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Số điện thoại
              </label>
              <Input
                type="tel"
                placeholder="Nhập số điện thoại của bạn"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Mật khẩu
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a1a1a] text-gray-400">
                  Đăng ký nhanh bằng mạng xã hội
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

            <p className="text-center text-gray-400 text-sm">
              Đã có tài khoản?{' '}
              <Link 
                to="/login" 
                className="font-medium text-pink-500 hover:text-pink-400"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register; 