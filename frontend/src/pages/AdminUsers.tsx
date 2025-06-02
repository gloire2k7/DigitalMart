
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Eye, Ban, CheckCircle, AlertCircle } from 'lucide-react';

const AdminUsers = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "buyer",
      status: "active",
      joinDate: "2024-01-15",
      orders: 12,
      spent: "$1,234"
    },
    {
      id: 2,
      name: "TechCorp Inc.",
      email: "contact@techcorp.com",
      role: "seller",
      status: "active",
      joinDate: "2024-01-10",
      products: 145,
      revenue: "$12,456"
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "buyer",
      status: "suspended",
      joinDate: "2024-01-08",
      orders: 3,
      spent: "$267"
    },
    {
      id: 4,
      name: "GadgetWorld",
      email: "info@gadgetworld.com",
      role: "seller",
      status: "pending",
      joinDate: "2024-01-20",
      products: 0,
      revenue: "$0"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'suspended': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'buyer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'seller': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'admin': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <Layout userRole="admin">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Users</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage buyers, sellers, and administrators
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {users.map((user) => (
            <Card key={user.id} className="glass border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-lg">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>Joined: {user.joinDate}</span>
                        {user.role === 'buyer' && (
                          <>
                            <span>•</span>
                            <span>{user.orders} orders</span>
                            <span>•</span>
                            <span>Spent: {user.spent}</span>
                          </>
                        )}
                        {user.role === 'seller' && (
                          <>
                            <span>•</span>
                            <span>{user.products} products</span>
                            <span>•</span>
                            <span>Revenue: {user.revenue}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    {user.status === 'active' ? (
                      <Button size="sm" variant="outline" className="text-red-500">
                        <Ban className="w-4 h-4 mr-2" />
                        Suspend
                      </Button>
                    ) : user.status === 'suspended' ? (
                      <Button size="sm" variant="outline" className="text-green-500">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Activate
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-green-500">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
