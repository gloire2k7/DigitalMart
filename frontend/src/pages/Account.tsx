
import { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Account = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg",
    joinDate: "January 2023"
  });

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 299.99,
      items: 2
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 599.99,
      items: 1
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-white mb-1">{user.name}</h2>
                  <p className="text-gray-400 mb-2">{user.email}</p>
                  <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="orders" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 glass">
                  <TabsTrigger value="orders" className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Wishlist</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                  <Card className="glass border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-purple-500/20">
                            <div>
                              <h3 className="font-semibold text-white">{order.id}</h3>
                              <p className="text-sm text-gray-400">{order.date} • {order.items} items</p>
                              <span className={`inline-block px-2 py-1 rounded text-xs ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-white">${order.total}</p>
                              <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="wishlist">
                  <Card className="glass border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">My Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-400">Save items you love for later</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="profile">
                  <Card className="glass border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                          <p className="text-white">{user.name}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                          <p className="text-white">{user.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                          <p className="text-gray-400">Not provided</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card className="glass border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Notification Preferences
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Privacy Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-red-400 border-red-400/50 hover:bg-red-500/10">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
