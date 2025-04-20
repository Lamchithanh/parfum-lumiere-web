import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Heart, User, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Parfum Lumière
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="search"
                placeholder="Tìm kiếm nước hoa..."
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              Sản phẩm
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              Giới thiệu
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Liên hệ
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/favorites" className="text-gray-600 hover:text-gray-900">
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <ShoppingCart size={24} />
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="icon">
                <User size={20} />
              </Button>
            </Link>
            <Button className="md:hidden" variant="outline" size="icon">
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 