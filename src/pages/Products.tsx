import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { mockProducts, brandData } from '@/data/mockProducts';
import Layout from '@/components/layout/Layout';
import { formatPrice } from '@/lib/utils';
import { Filter, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IProduct } from '@/types';
import { favoritesService } from '@/lib/favorites';
import { productService } from '@/services/productService';
import ProductCard from '@/components/products/ProductCard';
import { mockBrands } from '@/data/mockBrands';

const PRICE_RANGE = {
  min: 0,
  max: 5000000,
} as const;

const SORT_OPTIONS = [
  { value: 'featured', label: 'Nổi bật' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'rating', label: 'Đánh giá cao' },
  { value: 'newest', label: 'Mới nhất' },
] as const;

type SortOption = typeof SORT_OPTIONS[number]['value'];

const BrandBanner = ({ brand }: { brand: string }) => {
  const data = brandData[brand];
  
  if (!data) return null;

  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <div className="relative h-[600px] overflow-hidden">
        <img 
          src={data.banner} 
          alt={`${brand} Banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-6xl text-white font-serif">{brand}</h1>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif mb-8 text-center">SẢN PHẨM CHỦ ĐẠO</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.collections.map((collection, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative overflow-hidden rounded-lg group">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-serif text-xl mt-4 mb-2">{collection.name}</h3>
              <p className="text-gray-600">{collection.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Brand Story */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif mb-4">{data.story.title}</h2>
              <p className="text-gray-600 leading-relaxed">{data.story.description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src={data.story.image} 
                alt="Brand Story"
                className="w-full rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_RANGE.min, PRICE_RANGE.max]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [favorites, setFavorites] = useState<number[]>([]);

  const selectedBrand = searchParams.get('brand');

  // Lấy danh sách brands và categories
  useEffect(() => {
    const fetchFilters = async () => {
      const [brandsData, categoriesData] = await Promise.all([
        productService.getBrands(),
        productService.getCategories()
      ]);
      setBrands(brandsData);
      setCategories(categoriesData);
    };
    fetchFilters();
  }, []);

  // Lấy và lọc sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filteredProducts = await productService.filterProducts({
          priceRange,
          brands: selectedBrands,
          categories: selectedCategories,
          sortBy: sortBy as any
        });
        setProducts(filteredProducts);
        setFavorites(favoritesService.getFavorites());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [priceRange, selectedBrands, selectedCategories, sortBy]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productService.getAllProducts();
        
        // Lọc sản phẩm theo thương hiệu nếu có
        const filteredProducts = selectedBrand
          ? allProducts.filter(product => product.brand === selectedBrand)
          : allProducts;
          
        setProducts(filteredProducts);
        setFavorites(favoritesService.getFavorites());
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedBrand]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? []
        : [brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFavorite = (productId: number) => {
    favoritesService.toggleFavorite(productId);
    setFavorites(favoritesService.getFavorites());
  };

  const renderHeader = () => {
    if (!selectedBrand) {
      return (
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Tất cả sản phẩm</h1>
          <div className="flex flex-wrap justify-center gap-2 text-black">
            {mockBrands.map(brand => (
              <Button
                key={brand.id}
                variant="outline"
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set('brand', brand.name);
                  window.location.search = params.toString();
                }}
              >
                {brand.name}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    const brand = mockBrands.find(b => b.name === selectedBrand);
    return (
      <div className="text-center mb-12 text-black">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Bộ sưu tập {selectedBrand}
        </h1>
        {brand && (
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            {brand.description}
          </p>
        )}
        <Button
          variant="outline"
          onClick={() => {
            window.location.search = '';
          }}
        >
          Xem tất cả sản phẩm
        </Button>
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Không tìm thấy sản phẩm
      </h3>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        {selectedBrand 
          ? `Hiện tại không có sản phẩm nào của thương hiệu ${selectedBrand}. Vui lòng thử lại sau.`
          : 'Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn. Vui lòng thử các tiêu chí khác.'}
      </p>
      <div className="space-x-4">
        <Button
          variant="outline"
          onClick={() => {
            setPriceRange([PRICE_RANGE.min, PRICE_RANGE.max]);
            setSelectedBrands([]);
            setSelectedCategories([]);
            setSortBy('featured');
            if (selectedBrand) {
              navigate('/products');
            }
          }}
        >
          Đặt lại bộ lọc
        </Button>
        <Button onClick={() => navigate('/')}>
          Về trang chủ
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-16">
        {selectedBrands.length === 1 ? (
          <BrandBanner brand={selectedBrands[0]} />
        ) : (
          <div className="bg-[#1a1a1a] text-white py-12">
            <div className="container mx-auto px-4">
              {renderHeader()}
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-3xl">Sản phẩm</h1>
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Bộ lọc */}
            <div className={`lg:w-1/4 ${showFilter ? 'block' : 'hidden'} lg:block bg-white p-6 rounded-lg shadow-sm`}>
              <div className="space-y-6 sticky top-24">
                {/* Khoảng giá */}
                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Khoảng giá
                  </h3>
                  <Slider
                    defaultValue={[PRICE_RANGE.min, PRICE_RANGE.max]}
                    max={PRICE_RANGE.max}
                    step={100000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Thương hiệu */}
                <div>
                  <h3 className="font-medium mb-4">Thương hiệu</h3>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className={`block w-full text-left px-2 py-1 rounded ${
                          selectedBrands.includes(brand)
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Danh mục */}
                <div>
                  <h3 className="font-medium mb-4">Danh mục</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`block w-full text-left px-2 py-1 rounded ${
                          selectedCategories.includes(category)
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="lg:w-3/4">
              {/* Sắp xếp */}
              <div className="mb-6">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full md:w-48 p-2 border rounded"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {loading ? (
                // Loading skeleton
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <div key={n} className="animate-pulse">
                      <div className="bg-gray-200 h-64 rounded-lg mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      toggleFavorite={toggleFavorite}
                      isFavorite={favorites.includes(product.id)}
                    />
                  ))}
                </div>
              ) : (
                renderEmptyState()
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
