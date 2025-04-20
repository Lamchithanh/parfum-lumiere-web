import { toast } from '@/components/ui/use-toast';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'parfum_lumiere_auth';
const USERS_KEY = 'parfum_lumiere_users';

// Mock data cho tài khoản admin
const mockAdmin: User = {
  id: '1',
  email: 'admin@parfumlumiere.com',
  password: 'admin123',
  name: 'Admin',
  phone: '0123456789',
  address: '123 Đường ABC, Quận 1, TP.HCM',
  createdAt: new Date().toISOString(),
};

// Khởi tạo dữ liệu người dùng nếu chưa có
const initializeUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    localStorage.setItem(USERS_KEY, JSON.stringify([mockAdmin]));
  }
};

// Khởi tạo trạng thái xác thực nếu chưa có
const initializeAuth = () => {
  const auth = localStorage.getItem(STORAGE_KEY);
  if (!auth) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: null, isAuthenticated: false }));
  }
};

// Khởi tạo dữ liệu
initializeUsers();
initializeAuth();

export const authService = {
  // Đăng ký tài khoản mới
  register: (userData: Omit<User, 'id' | 'createdAt'>) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Kiểm tra email đã tồn tại
    if (users.some((user: User) => user.email === userData.email)) {
      toast({
        title: 'Đăng ký thất bại',
        description: 'Email đã được sử dụng',
        variant: 'destructive',
      });
      return false;
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    toast({
      title: 'Đăng ký thành công',
      description: 'Bạn có thể đăng nhập ngay bây giờ',
    });

    return true;
  },

  // Đăng nhập
  login: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);

    if (!user) {
      toast({
        title: 'Đăng nhập thất bại',
        description: 'Email hoặc mật khẩu không đúng',
        variant: 'destructive',
      });
      return false;
    }

    const authState: AuthState = {
      user,
      isAuthenticated: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));

    toast({
      title: 'Đăng nhập thành công',
      description: `Xin chào ${user.name}!`,
    });

    return true;
  },

  // Đăng xuất
  logout: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: null, isAuthenticated: false }));
    toast({
      title: 'Đã đăng xuất',
      description: 'Hẹn gặp lại bạn!',
    });
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: (): User | null => {
    const auth = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return auth.user || null;
  },

  // Kiểm tra trạng thái đăng nhập
  isAuthenticated: (): boolean => {
    const auth = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return auth.isAuthenticated || false;
  },

  // Cập nhật thông tin người dùng
  updateUser: (userData: Partial<User>) => {
    const auth = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!auth.user) return false;

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const userIndex = users.findIndex((u: User) => u.id === auth.user.id);

    if (userIndex === -1) return false;

    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      user: updatedUser,
      isAuthenticated: true,
    }));

    toast({
      title: 'Cập nhật thành công',
      description: 'Thông tin của bạn đã được cập nhật',
    });

    return true;
  },
}; 