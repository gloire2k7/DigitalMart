
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Package, CreditCard, Star, Truck } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'order',
      icon: Package,
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped and will arrive in 2-3 business days.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      type: 'payment',
      icon: CreditCard,
      title: 'Payment Confirmed',
      message: 'Payment for order #12344 has been successfully processed.',
      time: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'review',
      icon: Star,
      title: 'Review Request',
      message: 'Please review your recent purchase of Wireless Headphones.',
      time: '1 day ago',
      unread: false
    },
    {
      id: 4,
      type: 'delivery',
      icon: Truck,
      title: 'Delivery Update',
      message: 'Your package is out for delivery and will arrive today.',
      time: '2 days ago',
      unread: false
    },
    {
      id: 5,
      type: 'promotion',
      icon: Bell,
      title: 'Special Offer',
      message: 'Get 20% off on electronics this weekend only!',
      time: '3 days ago',
      unread: false
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-blue-500';
      case 'payment': return 'text-green-500';
      case 'review': return 'text-yellow-500';
      case 'delivery': return 'text-purple-500';
      case 'promotion': return 'text-pink-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Notifications</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Stay updated with your orders and account activity
            </p>
          </div>
          <Button variant="outline">Mark All as Read</Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`glass border-purple-500/20 ${notification.unread ? 'bg-purple-50/50 dark:bg-purple-900/10' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${getIconColor(notification.type)}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        {notification.unread && (
                          <Badge className="bg-purple-500 hover:bg-purple-600">New</Badge>
                        )}
                      </div>
                      <CardDescription className="mt-2">
                        {notification.message}
                      </CardDescription>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{notification.time}</span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="glass border-purple-500/20 text-center py-12">
            <CardContent>
              <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <CardTitle className="text-xl mb-2">No notifications</CardTitle>
              <CardDescription>You're all caught up! Check back later for updates.</CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
