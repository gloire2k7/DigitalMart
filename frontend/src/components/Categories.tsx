
import { useState } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Camera, 
  Watch, 
  Gamepad2,
  Home,
  Car
} from 'lucide-react';

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      name: "Smartphones",
      icon: Smartphone,
      count: 2847,
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Laptops",
      icon: Laptop,
      count: 1923,
      color: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Audio",
      icon: Headphones,
      count: 3456,
      color: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Cameras",
      icon: Camera,
      count: 892,
      color: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Wearables",
      icon: Watch,
      count: 1567,
      color: "from-violet-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Gaming",
      icon: Gamepad2,
      count: 2103,
      color: "from-indigo-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop"
    },
    {
      id: 7,
      name: "Smart Home",
      icon: Home,
      count: 1845,
      color: "from-teal-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
      id: 8,
      name: "Automotive",
      icon: Car,
      count: 967,
      color: "from-yellow-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our vast collection across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 transition-all duration-300 ${
                      hoveredCategory === category.id ? 'scale-110 animate-glow' : ''
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1 text-center">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count.toLocaleString()} items</p>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-white/10 backdrop-blur-sm transition-opacity duration-300 ${
                    hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Banner */}
        <div className="mt-16 glass rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-pink-600/20 animate-gradient-shift" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Discover New Arrivals
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Be the first to get your hands on the latest tech innovations and exclusive releases
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Explore New Arrivals
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
