
import { useState, useEffect } from 'react';
import { Search, Clock, TrendingUp, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const InstantSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches] = useState([
    'wireless headphones',
    'smartphone',
    'laptop',
    'gaming chair'
  ]);

  const [trendingSearches] = useState([
    'Black Friday deals',
    'iPhone 15',
    'Gaming laptop',
    'Smartwatch'
  ]);

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setResults([
          { id: 1, name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 99 },
          { id: 2, name: 'Gaming Headset Pro', category: 'Gaming', price: 149 },
          { id: 3, name: 'Studio Monitor Headphones', category: 'Audio', price: 299 }
        ]);
        setIsSearching(false);
      }, 300);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query]);

  return (
    <Card className="glass">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-4 animate-glow">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Instant Search</h3>
            <p className="text-muted-foreground">Find anything in milliseconds</p>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search products, brands, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-12 glass text-lg py-6"
          />
          <Button
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            variant="ghost"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {isSearching && (
          <div className="space-y-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2 mb-6">
            <h4 className="font-semibold text-sm text-muted-foreground">Search Results</h4>
            {results.map((result: any) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div>
                  <p className="font-medium">{result.name}</p>
                  <p className="text-sm text-muted-foreground">{result.category}</p>
                </div>
                <span className="font-bold gradient-text">${result.price}</span>
              </div>
            ))}
          </div>
        )}

        {query.length === 0 && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Recent Searches</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setQuery(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <TrendingUp className="w-4 h-4 mr-2 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Trending Searches</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search, index) => (
                  <Badge
                    key={index}
                    className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-colors"
                    onClick={() => setQuery(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstantSearch;
