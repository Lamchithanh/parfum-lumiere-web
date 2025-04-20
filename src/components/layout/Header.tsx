import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Heart, ShoppingBag, Search, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { mockProducts } from '@/data/mockProducts';
import authService from '@/services/authService';
import { cartService } from '@/lib/cart';
import { favoritesService } from '@/lib/favorites';
import { normalizeProductName } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface CurrentUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  images: string[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const response = authService.getCurrentUser();
      setIsAuthenticated(!!response);
      setUser(response);
    };
    checkAuth();
    // Lắng nghe sự kiện storage để cập nhật trạng thái đăng nhập
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    const updateCounts = () => {
      const cartItems = cartService.getCartItems();
      const favorites = favoritesService.getFavorites();
      setCartCount(cartItems.length);
      setFavoritesCount(favorites.length);
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    return () => window.removeEventListener('storage', updateCounts);
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const results = mockProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleProductClick = (product: Product) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/product/${normalizeProductName(product.name)}`);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="font-serif text-2xl font-semibold text-[#1a1a1a]">
              Parfum Lumière
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-sm uppercase tracking-wide text-gray-700 hover:text-[#1a1a1a] transition-colors"
              >
                Trang chủ
              </Link>
              <Link 
                to="/products" 
                className="text-sm uppercase tracking-wide text-gray-700 hover:text-[#1a1a1a] transition-colors"
              >
                Sản phẩm
              </Link>
              <Link 
                to="/contact" 
                className="text-sm uppercase tracking-wide text-gray-700 hover:text-[#1a1a1a] transition-colors"
              >
                Liên hệ
              </Link>
              <Link 
                to="/about" 
                className="text-sm uppercase tracking-wide text-gray-700 hover:text-[#1a1a1a] transition-colors"
              >
                Về chúng tôi
              </Link>
            </nav>
            
            {/* Search and Icons */}
            <div className="flex items-center space-x-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 h-9 w-full border-gray-200 focus:border-[#1a1a1a] focus:ring-[#1a1a1a] rounded-full"
                />
                {/* Dropdown kết quả tìm kiếm */}
                {searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    {searchResults.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="w-full p-4 hover:bg-gray-50 flex items-center space-x-4"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="text-left">
                              <p className="font-medium text-[#1a1a1a]">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.brand}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        Không tìm thấy sản phẩm
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link 
                to="/favorites" 
                className="text-gray-700 hover:text-[#1a1a1a] transition-colors relative"
              >
                <Heart size={20} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#1a1a1a] text-white text-xs rounded-full flex items-center justify-center">
                    {favoritesCount.toString()}
                  </span>
                )}
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-[#1a1a1a] transition-colors relative"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#1a1a1a] text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount.toString()}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-[#1a1a1a] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="hidden md:inline text-sm font-medium">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-[#1a1a1a]">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Thông tin cá nhân
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Quản trị hệ thống
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-[#1a1a1a] transition-colors"
                >
                  <User size={20} />
                </Link>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <div className="relative flex-1 mr-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 h-9 w-full border-gray-200 focus:border-[#1a1a1a] focus:ring-[#1a1a1a] rounded-full"
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <nav className="px-4 py-6 space-y-4">
                <Link 
                  to="/" 
                  className="block text-gray-700 hover:text-[#1a1a1a] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Trang chủ
                </Link>
                <Link 
                  to="/products" 
                  className="block text-gray-700 hover:text-[#1a1a1a] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sản phẩm
                </Link>
                <Link 
                  to="/contact" 
                  className="block text-gray-700 hover:text-[#1a1a1a] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Liên hệ
                </Link>
                <Link 
                  to="/about" 
                  className="block text-gray-700 hover:text-[#1a1a1a] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Về chúng tôi
                </Link>

                <div className="flex space-x-6 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSearchOpen(true);
                    }} 
                    className="text-gray-700 hover:text-[#1a1a1a] transition-colors"
                  >
                    <Search size={20} />
                  </button>
                  <Link 
                    to="/favorites" 
                    className="text-gray-700 hover:text-[#1a1a1a] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={20} />
                  </Link>
                  <Link 
                    to="/cart" 
                    className="text-gray-700 hover:text-[#1a1a1a] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag size={20} />
                  </Link>
                  {isAuthenticated ? (
                    <div className="relative">
                      <button className="flex items-center space-x-2 text-gray-700 hover:text-[#1a1a1a] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white">
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="text-sm font-medium">{user?.name}</span>
                      </button>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-[#1a1a1a]">{user?.name}</p>
                          <p className="text-sm text-gray-600">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Thông tin cá nhân
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin/dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            Quản trị hệ thống
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <LogOut size={16} className="mr-2" />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to="/login" 
                      className="text-gray-700 hover:text-[#1a1a1a] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} />
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 h-12 w-full border-gray-200 focus:border-[#1a1a1a] focus:ring-[#1a1a1a] rounded-lg"
            />
          </div>
          {searchQuery && (
            <div className="mt-4 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="w-full p-4 hover:bg-gray-50 flex items-center space-x-4"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="text-left">
                        <p className="font-medium text-[#1a1a1a]">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Không tìm thấy sản phẩm
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
