
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Grid3X3, User, ShoppingCart, Heart, Bell, Settings, Package, BarChart3, Users, FileText } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

const buyerMenuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Shop", url: "/products", icon: ShoppingBag },
  { title: "Categories", url: "/categories", icon: Grid3X3 },
  { title: "Cart", url: "/cart", icon: ShoppingCart },
  { title: "Wishlist", url: "/wishlist", icon: Heart },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Account", url: "/account", icon: User },
];

const sellerMenuItems = [
  { title: "Dashboard", url: "/seller/dashboard", icon: BarChart3 },
  { title: "Products", url: "/seller/products", icon: Package },
  { title: "Orders", url: "/seller/orders", icon: FileText },
  { title: "Analytics", url: "/seller/analytics", icon: BarChart3 },
  { title: "Account", url: "/account", icon: User },
];

const adminMenuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: BarChart3 },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: FileText },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

interface AppSidebarProps {
  userRole?: 'buyer' | 'seller' | 'admin';
}

export function AppSidebar({ userRole = 'buyer' }: AppSidebarProps) {
  const location = useLocation();
  
  const getMenuItems = () => {
    switch (userRole) {
      case 'seller':
        return sellerMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return buyerMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="gradient-text text-xl font-bold">
          DigitalMart
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          {userRole === 'buyer' && 'Buyer Account'}
          {userRole === 'seller' && 'Seller Account'}
          {userRole === 'admin' && 'Admin Account'}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
