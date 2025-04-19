
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Heart, ShoppingBag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm z-50 relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-semibold">
            Parfum Lumière
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm uppercase tracking-wide hover:text-perfume-gold transition-colors">
              Trang chủ
            </Link>
            <Link to="/products" className="text-sm uppercase tracking-wide hover:text-perfume-gold transition-colors">
              Sản phẩm
            </Link>
            <Link to="/contact" className="text-sm uppercase tracking-wide hover:text-perfume-gold transition-colors">
              Liên hệ
            </Link>
            <Link to="/about" className="text-sm uppercase tracking-wide hover:text-perfume-gold transition-colors">
              Về chúng tôi
            </Link>
          </nav>
          
          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="text-gray-700 hover:text-perfume-gold transition-colors">
              <Search size={20} />
            </Link>
            <Link to="/favorites" className="text-gray-700 hover:text-perfume-gold transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-perfume-gold transition-colors">
              <ShoppingBag size={20} />
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-perfume-gold transition-colors">
              <User size={20} />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-sm uppercase tracking-wide hover:text-perfume-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link 
                to="/products" 
                className="text-sm uppercase tracking-wide hover:text-perfume-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sản phẩm
              </Link>
              <Link 
                to="/contact" 
                className="text-sm uppercase tracking-wide hover:text-perfume-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Liên hệ
              </Link>
              <Link 
                to="/about" 
                className="text-sm uppercase tracking-wide hover:text-perfume-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Về chúng tôi
              </Link>
              <div className="flex space-x-4 pt-2">
                <Link to="/search" className="text-gray-700 hover:text-perfume-gold transition-colors">
                  <Search size={20} />
                </Link>
                <Link to="/favorites" className="text-gray-700 hover:text-perfume-gold transition-colors">
                  <Heart size={20} />
                </Link>
                <Link to="/cart" className="text-gray-700 hover:text-perfume-gold transition-colors">
                  <ShoppingBag size={20} />
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-perfume-gold transition-colors">
                  <User size={20} />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
