
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const SellerProducts = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$199",
      stock: 45,
      sold: 89,
      status: "Active",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$299",
      stock: 23,
      sold: 67,
      status: "Active",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: "$79",
      stock: 0,
      sold: 45,
      status: "Out of Stock",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: "$149",
      stock: 67,
      sold: 34,
      status: "Active",
      image: "/placeholder.svg"
    }
  ];

  return (
    <Layout userRole="seller">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Products</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your product catalog
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="grid gap-6">
          {products.map((product) => (
            <Card key={product.id} className="glass border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg"></div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-medium text-lg">{product.price}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Stock</p>
                        <p className="font-medium">{product.stock} units</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Sold</p>
                        <p className="font-medium">{product.sold} units</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge variant={product.status === 'Active' ? 'default' : 'destructive'}>
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SellerProducts;
