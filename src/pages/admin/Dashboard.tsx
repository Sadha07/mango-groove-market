
import React from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Package, ShoppingCart, BarChart, Settings, User } from "lucide-react";

// Admin Layout Component
const AdminLayout: React.FC<{ children: React.ReactNode; currentPage: string }> = ({ 
  children, 
  currentPage 
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/signin");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: BarChart },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 bg-primary text-white">
          <h1 className="text-xl font-bold">Mango Admin</h1>
        </div>
        <div className="p-4">
          <div className="mb-6 px-4 py-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-md ${
                      currentPage === item.name.toLowerCase()
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-8">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="h-16 px-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
            </h1>
            <div>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

// Dashboard Stats Card
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendValue }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="bg-primary/10 text-primary p-2 rounded-full">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      
      {trend && (
        <div className={`mt-2 text-sm ${
          trend === "up" ? "text-green-600" : "text-red-600"
        }`}>
          {trend === "up" ? "▲" : "▼"} {trendValue}
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/signin" />;
  }

  return (
    <AdminLayout currentPage="dashboard">
      {/* Dashboard content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Revenue"
          value="$12,426"
          icon={<BarChart className="h-5 w-5" />}
          trend="up"
          trendValue="8.2% from last month"
        />
        <StatCard
          title="Orders"
          value="142"
          icon={<ShoppingCart className="h-5 w-5" />}
          trend="up"
          trendValue="12% from last month"
        />
        <StatCard
          title="Products"
          value="38"
          icon={<Package className="h-5 w-5" />}
        />
        <StatCard
          title="Customers"
          value="96"
          icon={<User className="h-5 w-5" />}
          trend="up"
          trendValue="5% from last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-3">Order #</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">#1234</td>
                  <td>John Doe</td>
                  <td>May 17, 2023</td>
                  <td>$125.00</td>
                  <td>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">#1233</td>
                  <td>Lisa Smith</td>
                  <td>May 16, 2023</td>
                  <td>$90.00</td>
                  <td>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Shipped
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">#1232</td>
                  <td>Robert Johnson</td>
                  <td>May 15, 2023</td>
                  <td>$210.00</td>
                  <td>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Processing
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">#1231</td>
                  <td>Emily White</td>
                  <td>May 14, 2023</td>
                  <td>$68.00</td>
                  <td>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Delivered
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/admin/orders"
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              View all orders
            </Link>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Popular Products</h2>
          <div className="space-y-4">
            <div className="flex items-center border-b pb-4">
              <img
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
                alt="Alphonso Mango"
                className="w-12 h-12 rounded-md object-cover mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium">Alphonso Mango</h3>
                <p className="text-sm text-gray-500">$8.99 per lb</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">158 sold</p>
                <p className="text-sm text-green-600">↑ 12%</p>
              </div>
            </div>
            
            <div className="flex items-center border-b pb-4">
              <img
                src="https://images.unsplash.com/photo-1553279768-865429fa0078"
                alt="Honey Mango"
                className="w-12 h-12 rounded-md object-cover mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium">Honey Mango</h3>
                <p className="text-sm text-gray-500">$6.99 per lb</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">124 sold</p>
                <p className="text-sm text-green-600">↑ 8%</p>
              </div>
            </div>
            
            <div className="flex items-center border-b pb-4">
              <img
                src="https://images.unsplash.com/photo-1601493700603-58609a3d176a"
                alt="Kesar Mango"
                className="w-12 h-12 rounded-md object-cover mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium">Kesar Mango</h3>
                <p className="text-sm text-gray-500">$7.99 per lb</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">98 sold</p>
                <p className="text-sm text-red-600">↓ 3%</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1519096845289-95806ee03a1a"
                alt="Green Mango"
                className="w-12 h-12 rounded-md object-cover mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium">Green Mango</h3>
                <p className="text-sm text-gray-500">$5.49 per lb</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">86 sold</p>
                <p className="text-sm text-green-600">↑ 15%</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/admin/products"
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              Manage products
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
