interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  gender?: string;
  birthDate?: string;
  role?: string;
}

interface UserInfo {
  phone?: string;
  address?: string;
  city?: string;
  gender?: string;
  birthDate?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}

const USERS_KEY = 'parfum_lumiere_users';
const CURRENT_USER_KEY = 'parfum_lumiere_auth';

// Khởi tạo một số user mẫu
const initializeUsers = () => {
  // Xóa dữ liệu cũ
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);

  // Tạo mới tài khoản admin mặc định
  const defaultUsers = [
    {
      id: '1',
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      avatar: '/images/avatars/author-1.jpg',
      role: 'admin'
    }
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  console.log('Đã khởi tạo user mẫu:', defaultUsers);
};

// Lấy danh sách users từ localStorage
export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    initializeUsers();
    return getUsers();
  }
  return JSON.parse(users);
};

// Lưu danh sách users vào localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  try {
    // Kiểm tra email đã tồn tại chưa
    const users = getUsers();
    if (users.find((u: User) => u.email === email)) {
      return {
        success: false,
        message: 'Email đã được sử dụng'
      };
    }

    // Tạo user mới
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      name,
      avatar: `/images/avatars/default-avatar.jpg`,
      role: 'user'
    };

    // Thêm user mới vào danh sách
    users.push(newUser);
    saveUsers(users);

    // Lưu thông tin user hiện tại
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
      user: userWithoutPassword,
      isAuthenticated: true
    }));

    return {
      success: true,
      message: 'Đăng ký thành công',
      user: userWithoutPassword
    };
  } catch (error) {
    return {
      success: false,
      message: 'Đã có lỗi xảy ra khi đăng ký'
    };
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // Kiểm tra thông tin đăng nhập
    const users = getUsers();
    const user = users.find((u: User) => u.email === email && u.password === password);

    if (!user) {
      return {
        success: false,
        message: 'Email hoặc mật khẩu không chính xác'
      };
    }

    // Lưu thông tin user hiện tại
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
      user: userWithoutPassword,
      isAuthenticated: true
    }));

    return {
      success: true,
      message: 'Đăng nhập thành công',
      user: userWithoutPassword
    };
  } catch (error) {
    return {
      success: false,
      message: 'Đã có lỗi xảy ra khi đăng nhập'
    };
  }
};

export const logout = async (): Promise<void> => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
    user: null,
    isAuthenticated: false
  }));
};

export const getCurrentUser = (): Omit<User, 'password'> | null => {
  const authStr = localStorage.getItem(CURRENT_USER_KEY);
  if (!authStr) return null;
  
  try {
    const auth = JSON.parse(authStr);
    return auth.user || null;
  } catch (error) {
    return null;
  }
};

export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const users = getUsers();
    const user = users.find((u: User) => u.email === email);

    if (!user) {
      return {
        success: false,
        message: 'Email không tồn tại trong hệ thống'
      };
    }

    // Trong thực tế, đây là nơi gửi email reset password
    // Nhưng ở đây chúng ta sẽ giả lập thành công
    return {
      success: true,
      message: 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Đã có lỗi xảy ra khi xử lý yêu cầu'
    };
  }
};

export const updateUserInfo = async (userId: string, userInfo: Partial<User>): Promise<AuthResponse> => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex((u: User) => u.id === userId);
    
    if (userIndex === -1) {
      return {
        success: false,
        message: 'Không tìm thấy người dùng'
      };
    }

    // Cập nhật thông tin người dùng nhưng giữ nguyên password
    const currentUser = users[userIndex];
    users[userIndex] = {
      ...currentUser,
      ...userInfo,
      password: currentUser.password // Giữ nguyên password
    };
    saveUsers(users);

    // Cập nhật thông tin trong localStorage
    const currentAuthUser = getCurrentUser();
    if (currentAuthUser && currentAuthUser.id === userId) {
      const { password, ...userWithoutPassword } = users[userIndex];
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
        user: userWithoutPassword,
        isAuthenticated: true
      }));
    }

    // Trả về user không có password
    const { password: _, ...updatedUser } = users[userIndex];
    return {
      success: true,
      message: 'Cập nhật thông tin thành công',
      user: updatedUser
    };
  } catch (error) {
    return {
      success: false,
      message: 'Đã có lỗi xảy ra khi cập nhật thông tin'
    };
  }
};

// Khởi tạo dữ liệu mẫu khi service được import
initializeUsers();

export default {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  updateUserInfo,
  getUsers,
  saveUsers
}; 