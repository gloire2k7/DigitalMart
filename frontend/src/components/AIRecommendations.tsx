
import { useState, useEffect } from 'react';
import { Star, TrendingUp, User, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI recommendation loading
    setTimeout(() => {
      setRecommendations([
        {
          id: 1,
          name: 'Wireless Headphones Pro',
          price: 299,
          rating: 4.8,
          confidence: 95,
          reason: 'Based on your music preferences',
          image: '/placeholder.svg'
        },
        {
          id: 2,
          name: 'Smart Fitness Watch',
          price: 199,
          rating: 4.7,
          confidence: 89,
          reason: 'Matches your fitness goals',
          image: '/placeholder.svg'
        },
        {
          id: 3,
          name: 'Bluetooth Speaker',
          price: 79,
          rating: 4.6,
          confidence: 82,
          reason: 'Complements your audio setup',
          image: '/placeholder.svg'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-white animate-pulse" />
            </div>
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4 animate-glow">
            <Star className="w-6 h-6 text-white" />
          </div>
          AI Recommendations
          <Badge className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500">
            Personalized
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((product: any) => (
            <div key={product.id} className="glass p-4 rounded-lg hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.reason}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-lg gradient-text">
                      ${product.price}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {product.confidence}% match
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          View All Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
