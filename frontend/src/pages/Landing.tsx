
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Zap, Shield, TrendingUp, Users, Package } from 'lucide-react';

const Landing = () => {
  const trendingProducts = [
    { id: 1, name: "Wireless Headphones", price: "$199", rating: 4.8, image: "/placeholder.svg" },
    { id: 2, name: "Smart Watch", price: "$299", rating: 4.9, image: "/placeholder.svg" },
    { id: 3, name: "Gaming Laptop", price: "$1299", rating: 4.7, image: "/placeholder.svg" },
    { id: 4, name: "Smartphone", price: "$799", rating: 4.8, image: "/placeholder.svg" },
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Recommendations",
      description: "Get personalized product suggestions based on your preferences and shopping history."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Bank-level security with multiple payment options including Apple Pay, PayPal, and more."
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track your orders, manage inventory, and get insights with powerful analytics."
    },
    {
      icon: Users,
      title: "Multi-Role Platform",
      description: "Whether you're a buyer, seller, or admin - we have tools tailored for your needs."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="gradient-text text-2xl font-bold">DigitalMart</div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The Future of <span className="gradient-text">E-Commerce</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience next-generation online shopping with AI-powered recommendations, 
            secure payments, and seamless multi-vendor marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                Start Shopping Now
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="gradient-text">DigitalMart?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass border-purple-500/20">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-purple-500 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Trending</span> Products
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <Card key={product.id} className="glass border-purple-500/20 hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg mb-4"></div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-purple-600">{product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="glass border-purple-500/20 p-8">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your <span className="gradient-text">Digital Journey?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied customers and sellers on our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  Sign Up as Buyer
                </Button>
              </Link>
              <Link to="/signup?role=seller">
                <Button size="lg" variant="outline">
                  Join as Seller
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="gradient-text text-xl font-bold mb-4">DigitalMart</h3>
              <p className="text-muted-foreground">The future of e-commerce, today.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/products" className="hover:text-purple-400">Shop Products</Link></li>
                <li><Link to="/features" className="hover:text-purple-400">Features</Link></li>
                <li><Link to="/cart" className="hover:text-purple-400">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/signup?role=seller" className="hover:text-purple-400">Become a Seller</Link></li>
                <li><Link to="/seller/dashboard" className="hover:text-purple-400">Seller Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DigitalMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
