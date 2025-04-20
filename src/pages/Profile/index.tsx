import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Orders from './Orders';
import authService from '@/services/authService';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: '👤' },
    { id: 'orders', label: 'Đơn hàng', icon: '📦' },
    { id: 'address', label: 'Địa chỉ', icon: '📍' },
    { id: 'payment', label: 'Thanh toán', icon: '💳' },
    { id: 'settings', label: 'Cài đặt', icon: '⚙️' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return <Orders />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Tính năng đang phát triển</h3>
            <p className="text-gray-600">Chức năng này sẽ sớm được cập nhật</p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-medium mb-8">Thông tin cá nhân</h1>
        <p className="text-gray-600 mb-8">Quản lý thông tin tài khoản của bạn</p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#1a1a1a] text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 