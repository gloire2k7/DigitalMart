
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Laptop, Headphones, Watch, Camera, Home, Car, Book } from 'lucide-react';

const Categories = () => {
  const categories = [
    { name: "Electronics", icon: Smartphone, count: 1250, description: "Phones, laptops, and gadgets" },
    { name: "Computers", icon: Laptop, count: 890, description: "Laptops, desktops, and accessories" },
    { name: "Audio", icon: Headphones, count: 650, description: "Headphones, speakers, and audio gear" },
    { name: "Wearables", icon: Watch, count: 340, description: "Smartwatches and fitness trackers" },
    { name: "Photography", icon: Camera, count: 420, description: "Cameras and photography equipment" },
    { name: "Home & Garden", icon: Home, count: 980, description: "Home improvement and garden tools" },
    { name: "Automotive", icon: Car, count: 560, description: "Car accessories and parts" },
    { name: "Books", icon: Book, count: 780, description: "Physical and digital books" },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="glass border-purple-500/20 hover:scale-105 transition-transform cursor-pointer">
              <CardHeader className="text-center">
                <category.icon className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                  {category.count} products
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
