import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { formatPrice, normalizeProductName } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import { cartService } from '@/lib/cart';
import { favoritesService } from '@/lib/favorites';
import { productService } from '@/services/productService';
import { IProduct } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import { userInfoService } from '@/lib/userInfo';
import authService from '@/services/authService';

const ProductDetail = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('CHIẾT 10ML');
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productName) return;
      
      setLoading(true);
      try {
        const products = await productService.getAllProducts();
        const foundProduct = products.find(p => 
          normalizeProductName(p.name) === productName
        );
        
        if (foundProduct) {
          setProduct(foundProduct);
          setIsFavorited(favoritesService.isFavorite(foundProduct.id));
          
          // Lấy sản phẩm liên quan
          const related = products.filter(p => 
            p.id !== foundProduct.id && 
            (p.brand === foundProduct.brand || p.category === foundProduct.category)
          ).slice(0, 4);
          setRelatedProducts(related);
        } else {
          toast({
            title: 'Không tìm thấy sản phẩm',
            description: 'Sản phẩm bạn tìm kiếm không tồn tại',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Lỗi',
          description: 'Không thể tải thông tin sản phẩm',
          variant: 'destructive',
        });
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productName]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="animate-pulse">
            <div className="h-[600px] bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Không tìm thấy sản phẩm</h1>
            <Button onClick={() => navigate('/')}>Quay lại trang chủ</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1) setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Kiểm tra đăng nhập
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      // Lưu URL hiện tại để sau khi đăng nhập chuyển về
      userInfoService.saveRedirectUrl(window.location.pathname);
      
      toast({
        title: 'Yêu cầu đăng nhập',
        description: 'Vui lòng đăng nhập để tiếp tục mua hàng',
      });
      
      navigate('/login');
      return;
    }

    cartService.addToCart(product.id, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    if (!product) return;

    // Kiểm tra đăng nhập
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      // Lưu URL hiện tại để sau khi đăng nhập chuyển về
      userInfoService.saveRedirectUrl(window.location.pathname);
      
      toast({
        title: 'Yêu cầu đăng nhập',
        description: 'Vui lòng đăng nhập để tiếp tục mua hàng',
      });
      
      navigate('/login');
      return;
    }
    
    // Thêm vào giỏ hàng
    cartService.addToCart(product.id, quantity, selectedSize);
    
    // Chuyển đến trang thanh toán
    navigate('/checkout');
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    const newState = favoritesService.toggleFavorite(product.id);
    setIsFavorited(newState);
  };

  const sizes = ['CHIẾT 10ML', 'CHIẾT 20ML', 'CHIẾT 30ML', 'FULLBOX 100ML'];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Hình ảnh sản phẩm */}
            <div className="space-y-6">
              <div className="border-2 border-[#1a1a1a] rounded-lg overflow-hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative w-full h-[500px] bg-white"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </motion.div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-lg overflow-hidden bg-white border ${
                      selectedImage === index ? 'border-[#1a1a1a] ring-1 ring-[#1a1a1a]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-medium mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#1a1a1a] font-medium">Tình trạng:</span>
                  <span className="text-gray-600">Còn hàng</span>
                </div>
                <div className="text-2xl font-semibold text-[#1a1a1a] mb-6">
                  {formatPrice(product.price)}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
              </div>

              {/* Giới tính */}
              <div className="space-y-3">
                <h3 className="font-medium">Giới tính</h3>
                <div className="flex gap-2">
                  <button className="px-6 py-2 border rounded hover:border-[#1a1a1a] bg-white">
                    NAM
                  </button>
                </div>
              </div>

              {/* Xuất xứ */}
              <div className="space-y-3">
                <h3 className="font-medium">Xuất xứ</h3>
                <div className="flex gap-2">
                  <button className="px-6 py-2 border rounded hover:border-[#1a1a1a] bg-white">
                    PHÁP
                  </button>
                </div>
              </div>

              {/* Dung tích */}
              <div className="space-y-3">
                <h3 className="font-medium">Dung tích</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 border rounded ${
                        selectedSize === size
                          ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                          : 'hover:border-[#1a1a1a] bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Số lượng và nút */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Số lượng</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-3 hover:bg-gray-50"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-16 text-center border-x"
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-3 hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 h-12 text-white"
                  >
                    MUA NGAY
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAddToCart}
                    className="flex-1 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white h-12"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    THÊM VÀO GIỎ HÀNG
                  </Button>
                </div>

                <button
                  onClick={handleToggleFavorite}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#1a1a1a]"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      isFavorited ? 'fill-[#1a1a1a] text-[#1a1a1a]' : ''
                    }`} 
                  />
                  {isFavorited ? 'Đã thêm vào yêu thích' : 'Thêm vào yêu thích'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-medium">Sản phẩm liên quan</h2>
              <Button
                variant="outline"
                onClick={() => navigate(`/products?brand=${product?.brand}`)}
                className="border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
              >
                Xem tất cả
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  toggleFavorite={favoritesService.toggleFavorite}
                  isFavorite={favoritesService.isFavorite(relatedProduct.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
