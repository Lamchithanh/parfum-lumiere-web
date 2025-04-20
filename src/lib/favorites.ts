import { toast } from '@/components/ui/use-toast';
import { IProduct } from '@/types';

const FAVORITES_KEY = 'favorites';

// Khởi tạo danh sách yêu thích nếu chưa có
const initializeFavorites = () => {
  if (!localStorage.getItem(FAVORITES_KEY)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
  }
};

initializeFavorites();

export const favoritesService = {
  // Lấy tất cả sản phẩm yêu thích
  getFavorites: (): number[] => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  // Thêm sản phẩm vào danh sách yêu thích
  addToFavorites: (productId: number) => {
    const favorites = favoritesService.getFavorites();
    
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

      toast({
        title: 'Đã thêm vào yêu thích',
        description: 'Sản phẩm đã được thêm vào danh sách yêu thích',
      });
    }

    return favorites;
  },

  // Xóa sản phẩm khỏi danh sách yêu thích
  removeFromFavorites: (productId: number) => {
    const favorites = favoritesService.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== productId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

    toast({
      title: 'Đã xóa khỏi yêu thích',
      description: 'Sản phẩm đã được xóa khỏi danh sách yêu thích',
    });

    return updatedFavorites;
  },

  // Xóa toàn bộ danh sách yêu thích
  clearFavorites: () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
    return [];
  },

  // Kiểm tra sản phẩm có trong danh sách yêu thích không
  isFavorite: (productId: number): boolean => {
    const favorites = favoritesService.getFavorites();
    return favorites.includes(productId);
  },

  // Lấy danh sách sản phẩm yêu thích đầy đủ
  getFavoriteProducts: (products: IProduct[]): IProduct[] => {
    const favorites = favoritesService.getFavorites();
    return products.filter(product => favorites.includes(product.id));
  },

  // Toggle trạng thái yêu thích
  toggleFavorite: (productId: number): boolean => {
    const isFavorite = favoritesService.isFavorite(productId);
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(productId);
      return false;
    } else {
      favoritesService.addToFavorites(productId);
      return true;
    }
  },
}; 