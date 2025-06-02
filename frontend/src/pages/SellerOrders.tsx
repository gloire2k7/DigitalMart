
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Package, Truck } from 'lucide-react';

const SellerOrders = () => {
  const orders = [
    {
      id: "#12345",
      customer: "John Doe",
      email: "john@example.com",
      product: "Wireless Headphones",
      quantity: 1,
      amount: "$199",
      status: "Processing",
      date: "2024-01-15",
      address: "123 Main St, New York, NY 10001"
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      email: "jane@example.com",
      product: "Smart Watch",
      quantity: 1,
      amount: "$299",
      status: "Shipped",
      date: "2024-01-14",
      address: "456 Oak Ave, Los Angeles, CA 90210"
    },
    {
      id: "#12347",
      customer: "Bob Johnson",
      email: "bob@example.com",
      product: "Gaming Mouse",
      quantity: 2,
      amount: "$158",
      status: "Delivered",
      date: "2024-01-13",
      address: "789 Pine St, Chicago, IL 60601"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-500';
      case 'Shipped': return 'bg-blue-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Layout userRole="seller">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Orders</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage and track customer orders
          </p>
        </div>

        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="glass border-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <CardDescription>{order.date}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Customer</h4>
                    <p className="text-sm">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Product</h4>
                    <p className="text-sm">{order.product}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Amount</h4>
                    <p className="text-lg font-bold text-purple-600">{order.amount}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <p className="text-sm text-muted-foreground">{order.address}</p>
                </div>

                <div className="flex space-x-2 mt-6">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {order.status === 'Processing' && (
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Package className="w-4 h-4 mr-2" />
                      Mark as Shipped
                    </Button>
                  )}
                  {order.status === 'Shipped' && (
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      <Truck className="w-4 h-4 mr-2" />
                      Track Package
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SellerOrders;
