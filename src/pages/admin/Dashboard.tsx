import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Users,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';

// Mock data
const revenueData = [
  { month: 'T1', revenue: 450, orders: 240, profit: 180 },
  { month: 'T2', revenue: 380, orders: 198, profit: 152 },
  { month: 'T3', revenue: 420, orders: 210, profit: 168 },
  { month: 'T4', revenue: 520, orders: 280, profit: 208 },
  { month: 'T5', revenue: 480, orders: 240, profit: 192 },
  { month: 'T6', revenue: 600, orders: 320, profit: 240 },
  { month: 'T7', revenue: 580, orders: 290, profit: 232 },
];

const categoryData = [
  { name: 'Nước hoa Nam', value: 400, growth: 12 },
  { name: 'Nước hoa Nữ', value: 300, growth: 8 },
  { name: 'Nước hoa Unisex', value: 200, growth: 15 },
  { name: 'Gift Set', value: 100, growth: 5 },
];

const topProducts = [
  { name: 'Chanel N°5', sales: 120, revenue: 180 },
  { name: 'Dior Sauvage', sales: 98, revenue: 147 },
  { name: 'Gucci Bloom', sales: 86, revenue: 129 },
  { name: 'YSL Black Opium', sales: 75, revenue: 112.5 },
  { name: 'Tom Ford Tobacco', sales: 65, revenue: 97.5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value * 1000000);
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value}%`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Tổng quan</h1>
        <p className="text-gray-600 mt-1">Thống kê hoạt động kinh doanh</p>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Doanh thu tháng</p>
              <p className="text-2xl font-semibold">{formatCurrency(580)}</p>
              <div className="flex items-center text-green-600">
                <ArrowUpRight size={16} className="mr-1" />
                <span className="text-sm">+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Đơn hàng mới</p>
              <p className="text-2xl font-semibold">290</p>
              <div className="flex items-center text-green-600">
                <ArrowUpRight size={16} className="mr-1" />
                <span className="text-sm">+8.2%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Khách hàng mới</p>
              <p className="text-2xl font-semibold">128</p>
              <div className="flex items-center text-green-600">
                <ArrowUpRight size={16} className="mr-1" />
                <span className="text-sm">+14.3%</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Lợi nhuận</p>
              <p className="text-2xl font-semibold">{formatCurrency(232)}</p>
              <div className="flex items-center text-red-600">
                <ArrowDownRight size={16} className="mr-1" />
                <span className="text-sm">-2.4%</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Bộ lọc thời gian */}
      <div className="flex items-center space-x-4">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
        >
          <option value="7days">7 ngày qua</option>
          <option value="30days">30 ngày qua</option>
          <option value="90days">90 ngày qua</option>
          <option value="custom">Tùy chỉnh</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ doanh thu */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Doanh thu & Lợi nhuận</h2>
            <Button variant="outline" size="sm">
              <Calendar size={16} className="mr-2" />
              Xuất báo cáo
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Doanh thu"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  name="Lợi nhuận"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Biểu đồ đơn hàng */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Đơn hàng theo thời gian</h2>
            <Button variant="outline" size="sm">
              <Calendar size={16} className="mr-2" />
              Xuất báo cáo
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  name="Số đơn hàng"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phân bổ danh mục */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Phân bổ danh mục</h2>
            <div className="flex items-center space-x-2">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <p className="text-sm text-gray-500">{category.value} sản phẩm</p>
                  </div>
                  <div className="flex items-center text-sm">
                    {category.growth > 0 ? (
                      <ArrowUpRight size={16} className="text-green-600" />
                    ) : (
                      <ArrowDownRight size={16} className="text-red-600" />
                    )}
                    <span className={category.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatPercent(category.growth)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top sản phẩm */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Top sản phẩm bán chạy</h2>
            <Button variant="outline" size="sm">
              <Package size={16} className="mr-2" />
              Xem tất cả
            </Button>
          </div>
          <div className="space-y-6">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm font-medium">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.sales} đơn hàng</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
                  <p className="text-sm text-gray-500">Doanh thu</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 