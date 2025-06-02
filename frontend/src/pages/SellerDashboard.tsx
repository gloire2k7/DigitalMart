
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Package, ShoppingCart, TrendingUp, Eye, Edit } from 'lucide-react';

const SellerDashboard = () => {
  const stats = [
    { title: "Total Revenue", value: "$12,849", change: "+12.5%", icon: DollarSign },
    { title: "Total Products", value: "124", change: "+3", icon: Package },
    { title: "Orders", value: "89", change: "+8", icon: ShoppingCart },
    { title: "Conversion Rate", value: "3.2%", change: "+0.4%", icon: TrendingUp },
  ];

  const recentOrders = [
    { id: "#12345", customer: "John Doe", product: "Wireless Headphones", amount: "$199", status: "Shipped" },
    { id: "#12346", customer: "Jane Smith", product: "Smart Watch", amount: "$299", status: "Processing" },
    { id: "#12347", customer: "Bob Johnson", product: "Gaming Mouse", amount: "$79", status: "Delivered" },
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 89, revenue: "$17,711" },
    { name: "Smart Watch", sales: 67, revenue: "$20,033" },
    { name: "Gaming Mouse", sales: 45, revenue: "$3,555" },
  ];

  return (
    <Layout userRole="seller">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Seller Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your products and track your sales performance
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
          {/* Recent Orders */}
          <Card className="glass border-purple-500/20">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-sm">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.amount}</p>
                      <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Orders
              </Button>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="glass border-purple-500/20">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Your best performing products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.revenue}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Manage Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
