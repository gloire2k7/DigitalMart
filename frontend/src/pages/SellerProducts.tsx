import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { ProductForm } from '@/components/ProductForm';
import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sold: number;
  status: string;
  image: string;
  category: string;
}

const SellerProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products/seller');
      // Ensure we're setting an array
      const productsData = Array.isArray(response.data) ? response.data : [];
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive"
      });
      // Set empty array on error
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`/api/products/${id}`);
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      await axios.patch(`/api/products/${id}/status?status=${newStatus}`);
      toast({
        title: "Success",
        description: `Product status updated to ${newStatus}!`,
      });
      fetchProducts();
    } catch (error) {
      console.error('Error updating product status:', error);
      toast({
        title: "Error",
        description: "Failed to update product status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null); // Clear editing product state on close
  };

  const handleFormSuccess = () => {
    fetchProducts(); // Refresh products after save/update
    handleFormClose(); // Close form
  };

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
          <Button 
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            onClick={() => {
              setEditingProduct(null); // Ensure we are adding, not editing
              setIsFormOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No products found. Click "Add Product" to create your first product.
          </div>
        ) : (
          <div className="grid gap-6">
            {products.map((product) => (
              <Card key={product.id} className="glass border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg overflow-hidden">
                      {product.image ? (
                        <img
                          // Assuming images are served from http://localhost:8085/uploads/
                          src={`http://localhost:8085/uploads/${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                          No Image
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Price</p>
                          <p className="font-medium text-lg">${product.price}</p>
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
                          <p className="text-muted-foreground">Category</p>
                          <p className="font-medium">{product.category}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <Badge 
                            variant={product.status === 'Active' ? 'default' : 'destructive'}
                            className="cursor-pointer"
                            onClick={() => handleStatusChange(product.id, product.status)}
                          >
                            {product.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(product)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ProductForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        product={editingProduct}
      />
    </Layout>
  );
};

export default SellerProducts;
