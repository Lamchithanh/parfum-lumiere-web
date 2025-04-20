import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  Package, 
  FileText, 
  Bell,
  Tag,
  Newspaper,
  Mail,
  BarChart
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  
  const menus = [
    {
      title: 'Tổng quan',
      icon: <LayoutDashboard size={20} />,
      path: '/admin/dashboard'
    },
    {
      title: 'Người dùng',
      icon: <Users size={20} />,
      path: '/admin/users'
    },
    {
      title: 'Sản phẩm',
      icon: <Package size={20} />,
      path: '/admin/products'
    },
    {
      title: 'Đơn hàng',
      icon: <ShoppingBag size={20} />,
      path: '/admin/orders'
    },
    {
      title: 'Danh mục',
      icon: <Tag size={20} />,
      path: '/admin/categories'
    },
    {
      title: 'Tin tức & Blog',
      icon: <Newspaper size={20} />,
      path: '/admin/blog'
    },
   
    {
      title: 'Tin nhắn',
      icon: <MessageSquare size={20} />,
      path: '/admin/chat'
    },
    {
      title: 'Email Marketing',
      icon: <Mail size={20} />,
      path: '/admin/email'
    },
    {
      title: 'Thông báo',
      icon: <Bell size={20} />,
      path: '/admin/notifications'
    },
    {
      title: 'Cài đặt',
      icon: <Settings size={20} />,
      path: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 overflow-y-auto">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-serif">
            Parfum Lumière
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                location.pathname === menu.path
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {menu.icon}
              <span className="text-sm font-medium">{menu.title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 