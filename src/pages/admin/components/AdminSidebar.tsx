import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  BarChart2,
  MessageSquare
} from 'lucide-react';

const menuItems = [
  { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/admin/users', icon: Users, label: 'Quản lý người dùng' },
  { path: '/admin/products', icon: Package, label: 'Quản lý sản phẩm' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Quản lý đơn hàng' },
  { path: '/admin/statistics', icon: BarChart2, label: 'Thống kê' },
  { path: '/admin/messages', icon: MessageSquare, label: 'Tin nhắn' },
  { path: '/admin/settings', icon: Settings, label: 'Cài đặt' },
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                isActive ? 'bg-gray-100 border-l-4 border-blue-500' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}; 