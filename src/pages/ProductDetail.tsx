
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { IProduct, IProductVariant } from '@/types';
import { toast } from '@/components/ui/use-toast';

// Mock data - trong thực tế sẽ lấy từ API theo ID
const productMock: IProduct = {
  id: "p1",
  name: "Parfum Lumière No.1",
  brand: "Parfum Lumière",
  description: "Hương thơm quyến rũ với notes hoa hồng và vanilla. Parfum Lumière No.1 là sự kết hợp hoàn hảo giữa nét truyền thống và hiện đại, mang đến cho bạn cảm giác tự tin và sang trọng mỗi khi sử dụng. Mùi hương kéo dài suốt cả ngày, phản ánh cá tính và phong cách riêng của bạn.",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  category: "Women",
  scent_notes: ["Hoa hồng", "Vanilla", "Gỗ đàn hương", "Hổ phách", "Xạ hương"],
  variants: [
    { id: "v1", capacity: "50ml", price: 2500000, stock: 10 },
    { id: "v2", capacity: "100ml", price: 4500000, stock: 5 },
    { id: "v3", capacity: "200ml", price: 7500000, stock: 2 }
  ],
  rating: 4.5,
  reviews: [
    { id: "r1", userId: "u1", userName: "Ngọc Anh", rating: 5, comment: "Mùi hương tuyệt vời, kéo dài cả ngày!", date: "2025-03-15" },
    { id: "r2", userId: "u2", userName: "Minh Tuấn", rating: 4, comment: "Chai đẹp, mùi thơm nhẹ nhàng", date: "2025-03-10" },
    { id: "r3", userId: "u3", userName: "Thu Hà", rating: 5, comment: "Sản phẩm đúng như mô tả, sẽ mua lại", date: "2025-02-28" }
  ],
  featured: true,
  new_arrival: true
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product] = useState<IProduct>(productMock); // Trong thực tế sẽ lấy theo productId từ API
  const [selectedVariant, setSelectedVariant] = useState<IProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  
  const handleAddToCart = () => {
    // Trong thực tế sẽ kết nối với context hoặc redux store
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} (${selectedVariant.capacity}) x ${quantity}`,
    });
  };
  
  const handleAddToFavorites = () => {
    // Trong thực tế sẽ kết nối với context hoặc redux store
    toast({
      title: "Đã thêm vào danh sách yêu thích",
      description: product.name,
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Hình ảnh sản phẩm */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={product.images[activeImageIndex] || "/placeholder.svg"} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                    activeImageIndex === index ? 'border-perfume-gold' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Thông tin sản phẩm */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl font-bold">{product.name}</h2>
              <p className="text-gray-600 mt-1">{product.brand}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews.length} đánh giá)
              </span>
            </div>
            
            <div className="pt-2">
              <h3 className="text-2xl font-semibold text-perfume-gold">
                {formatPrice(selectedVariant.price)}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Còn {selectedVariant.stock} sản phẩm
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Dung tích</h4>
              <div className="flex space-x-2">
                {product.variants.map(variant => (
                  <Button
                    key={variant.id}
                    variant={selectedVariant.id === variant.id ? "default" : "outline"}
                    onClick={() => setSelectedVariant(variant)}
                    className="rounded-full"
                  >
                    {variant.capacity}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Số lượng</h4>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(prev => Math.min(selectedVariant.stock, prev + 1))}
                  disabled={quantity >= selectedVariant.stock}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button 
                className="flex-grow py-6 bg-black hover:bg-gray-800"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="p-6"
                onClick={handleAddToFavorites}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium mb-2">Mô tả</h4>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Thành phần mùi hương</h4>
              <ul className="list-disc list-inside text-gray-700 pl-2">
                {product.scent_notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Đánh giá và Bình luận */}
        <div className="mt-16">
          <Tabs defaultValue="reviews">
            <TabsList className="border-b border-gray-200 w-full justify-start">
              <TabsTrigger value="reviews">Đánh giá ({product.reviews.length})</TabsTrigger>
              <TabsTrigger value="shipping">Thông tin vận chuyển</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews" className="pt-6">
              {product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{review.userName}</h5>
                          <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-3">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này.</p>
              )}
            </TabsContent>
            
            <TabsContent value="shipping" className="pt-6">
              <div className="space-y-4 text-gray-700">
                <p>Chúng tôi cung cấp các phương thức vận chuyển sau:</p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Giao hàng tiêu chuẩn: 2-3 ngày làm việc</li>
                  <li>Giao hàng nhanh: 1 ngày làm việc</li>
                  <li>Miễn phí giao hàng cho đơn hàng trên 1.000.000đ</li>
                </ul>
                <p className="pt-2">Chính sách đổi trả: Khách hàng có thể đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên vẹn và chưa được sử dụng.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
