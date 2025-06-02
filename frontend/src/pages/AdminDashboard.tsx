
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,234", change: "+12%", icon: Users },
    { title: "Total Products", value: "5,678", change: "+8%", icon: Package },
    { title: "Total Orders", value: "2,345", change: "+15%", icon: ShoppingCart },
    { title: "Platform Revenue", value: "$45,678", change: "+22%", icon: DollarSign },
  ];

  const recentActivity = [
    { type: "user", message: "New seller registered: TechCorp Inc.", time: "2 hours ago" },
    { type: "order", message: "Order #12345 flagged for review", time: "4 hours ago" },
    { type: "product", message: "Product removed for policy violation", time: "6 hours ago" },
    { type: "system", message: "System maintenance completed", time: "1 day ago" },
  ];

  const topSellers = [
    { name: "TechCorp Inc.", revenue: "$12,456", products: 145, rating: 4.9 },
    { name: "GadgetWorld", revenue: "$8,234", products: 89, rating: 4.7 },
    { name: "ElectroHub", revenue: "$6,789", products: 67, rating: 4.8 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'order': return ShoppingCart;
      case 'product': return Package;
      case 'system': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  return (
    <Layout userRole="admin">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Admin Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor and manage the entire platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="glass border-purple-500/20">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform activities and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <Icon className="w-5 h-5 text-purple-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Sellers */}
          <Card className="glass border-purple-500/20">
            <CardHeader>
              <CardTitle>Top Sellers</CardTitle>
              <CardDescription>Best performing sellers on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSellers.map((seller, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">{seller.products} products</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">★ {seller.rating}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-lg">{seller.revenue}</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Health */}
        <Card className="glass border-purple-500/20">
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>System status and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">99.9%</div>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">1.2s</div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">0</div>
                <p className="text-sm text-muted-foreground">Critical Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
