import { toast } from '@/components/ui/use-toast';

const USER_INFO_KEY = 'user_info';
const REDIRECT_URL_KEY = 'redirect_url';

export interface UserShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export const userInfoService = {
  // Lưu thông tin giao hàng
  saveShippingInfo: (info: UserShippingInfo) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
    toast({
      title: 'Đã lưu thông tin',
      description: 'Thông tin giao hàng của bạn đã được lưu lại',
    });
  },

  // Lấy thông tin giao hàng
  getShippingInfo: (): UserShippingInfo | null => {
    const info = localStorage.getItem(USER_INFO_KEY);
    return info ? JSON.parse(info) : null;
  },

  // Lưu URL chuyển hướng
  saveRedirectUrl: (url: string) => {
    sessionStorage.setItem(REDIRECT_URL_KEY, url);
  },

  // Lấy và xóa URL chuyển hướng
  getAndClearRedirectUrl: (): string | null => {
    const url = sessionStorage.getItem(REDIRECT_URL_KEY);
    sessionStorage.removeItem(REDIRECT_URL_KEY);
    return url;
  }
}; 