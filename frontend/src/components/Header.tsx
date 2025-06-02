
import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, Heart, Bell, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="gradient-text text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
              DigitalMart
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search for products, brands and more..."
                className="pl-10 pr-4 glass border-purple-500/30 focus:border-purple-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Link to="/account">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors">
                <User className="w-4 h-4" />
                <span>Account</span>
              </Button>
            </Link>
            
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-purple-400 transition-colors">
                <Heart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-pink-500 hover:bg-pink-600">
                  3
                </Badge>
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-purple-400 transition-colors">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-orange-500 hover:bg-orange-600">
                5
              </Badge>
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-purple-400 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-cyan-500 hover:bg-cyan-600">
                  2
                </Badge>
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-gray-300 hover:text-purple-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search products..."
              className="pl-10 glass border-purple-500/30 focus:border-purple-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
