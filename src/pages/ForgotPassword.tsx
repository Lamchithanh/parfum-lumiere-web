import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import authService from '@/services/authService';
import dgforgot from '@/assest/images/Генерации в нейросети - Фон _ Духи.jpg';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        toast.success(response.message);
        setEmail('');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi gửi yêu cầu');
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
            src={dgforgot}
            alt="Forgot Password Background"
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
              <h2 className="text-5xl font-serif mb-6">Quên mật khẩu?</h2>
              <p className="text-xl text-gray-200 max-w-lg mx-auto">
                Đừng lo lắng, chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào tài khoản của mình
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
            <h2 className="text-2xl font-serif text-white mb-2">Đặt lại mật khẩu</h2>
            <p className="text-gray-400">
              Vui lòng nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Gửi yêu cầu'}
            </Button>

            <p className="text-center text-gray-400 text-sm">
              <Link 
                to="/login" 
                className="font-medium text-pink-500 hover:text-pink-400"
              >
                Quay lại đăng nhập
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword; 