
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Filter, Grid, List } from 'lucide-react';

const FeaturedProducts = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const products = [
    {
      id: 1,
      name: "Wireless Pro Headphones",
      price: 199,
      originalPrice: 299,
      rating: 4.8,
      reviews: 2847,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      badge: "BESTSELLER",
      isNew: false
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 349,
      originalPrice: 399,
      rating: 4.6,
      reviews: 1923,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      isNew: true
    },
    {
      id: 3,
      name: "Gaming Mechanical Keyboard",
      price: 129,
      originalPrice: 179,
      rating: 4.9,
      reviews: 3456,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      badge: "EDITOR'S CHOICE"
    },
    {
      id: 4,
      name: "4K Webcam Pro",
      price: 89,
      originalPrice: 129,
      rating: 4.7,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1527698266440-12104e498b76?w=400&h=400&fit=crop",
      isNew: true
    },
    {
      id: 5,
      name: "Wireless Charging Pad",
      price: 39,
      originalPrice: 59,
      rating: 4.5,
      reviews: 1567,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      price: 79,
      originalPrice: 119,
      rating: 4.8,
      reviews: 2103,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      badge: "TRENDING"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Featured</span> Products
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium products with exclusive deals
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <span className="text-gray-400">{products.length} Products</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10'}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 mb-12 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Load More Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
