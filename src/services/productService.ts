import { IProduct } from '@/types';
import { mockProducts } from '@/data/mockProducts';

// Giả lập delay của API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  // Lấy tất cả sản phẩm
  getAllProducts: async (): Promise<IProduct[]> => {
    await delay(500); // Giả lập delay API
    return mockProducts;
  },

  // Lấy sản phẩm theo ID
  getProductById: async (id: number): Promise<IProduct | undefined> => {
    await delay(300);
    return mockProducts.find(p => p.id === id);
  },

  // Lấy sản phẩm theo danh mục
  getProductsByCategory: async (category: string): Promise<IProduct[]> => {
    await delay(300);
    return mockProducts.filter(p => p.category === category);
  },

  // Lấy sản phẩm theo thương hiệu
  getProductsByBrand: async (brand: string): Promise<IProduct[]> => {
    await delay(300);
    return mockProducts.filter(p => p.brand === brand);
  },

  // Lấy sản phẩm nổi bật
  getFeaturedProducts: async (): Promise<IProduct[]> => {
    await delay(300);
    return mockProducts.filter(p => p.featured);
  },

  // Lấy sản phẩm mới
  getNewArrivals: async (): Promise<IProduct[]> => {
    await delay(300);
    return mockProducts.filter(p => p.new_arrival);
  },

  // Tìm kiếm sản phẩm
  searchProducts: async (query: string): Promise<IProduct[]> => {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  },

  // Lọc sản phẩm theo nhiều tiêu chí
  filterProducts: async (filters: {
    priceRange?: [number, number];
    brands?: string[];
    categories?: string[];
    sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
  }): Promise<IProduct[]> => {
    await delay(500);
    
    let filteredProducts = [...mockProducts];

    // Lọc theo khoảng giá
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(p => {
        return p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1];
      });
    }

    // Lọc theo thương hiệu
    if (filters.brands && filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(p => 
        filters.brands!.includes(p.brand)
      );
    }

    // Lọc theo danh mục
    if (filters.categories && filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(p => 
        filters.categories!.includes(p.category)
      );
    }

    // Sắp xếp
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts = filteredProducts.filter(p => p.new_arrival).concat(
            filteredProducts.filter(p => !p.new_arrival)
          );
          break;
      }
    }

    return filteredProducts;
  },

  // Lấy danh sách các danh mục
  getCategories: async (): Promise<string[]> => {
    await delay(200);
    return Array.from(new Set(mockProducts.map(p => p.category)));
  },

  // Lấy danh sách các thương hiệu
  getBrands: async (): Promise<string[]> => {
    await delay(200);
    return Array.from(new Set(mockProducts.map(p => p.brand)));
  }
}; 