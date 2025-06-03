import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

const categories = [
  'Smartphones',
  'Laptops',
  'Audio',
  'Cameras',
  'Wearables',
  'Gaming',
  'Smart Homes',
  'Automotives',
];

export function ProductForm({ isOpen, onClose, onSuccess, product }: ProductFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price.toString() || '',
    stock: product?.stock.toString() || '',
    category: product?.category || '',
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string>(product?.image ? `http://localhost:8085/uploads/${product.image}` : '');

  // Reset form data and preview when product prop changes (for editing)
  useEffect(() => {
    setFormData({
      name: product?.name || '',
      price: product?.price.toString() || '',
      stock: product?.stock.toString() || '',
      category: product?.category || '',
      image: null,
    });
    setPreviewUrl(product?.image ? `http://localhost:8085/uploads/${product.image}` : '');
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        setFormData(prev => ({ ...prev, image: null }));
        if (!product?.image) setPreviewUrl(''); // Clear preview if no existing image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('category', formData.category);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      } else if (product?.image && !formData.image) {
        // If editing and no new image is selected, keep the existing image URL
        formDataToSend.append('image', product.image);
      }

      if (product) {
        // Update existing product
        await axios.put(`/api/products/${product.id}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data' // Important for file uploads
            }
        });
        toast({
          title: "Success",
          description: "Product updated successfully!",
        });
      } else {
        // Create new product
        await axios.post('/api/products', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data' // Important for file uploads
            }
        });
        toast({
          title: "Success",
          description: "Product created successfully!",
        });
      }

      onSuccess();
      // Reset form after successful submission (for both create and update)
      setFormData({
        name: '',
        price: '',
        stock: '',
        category: '',
        image: null
      });
      setPreviewUrl('');
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: `Failed to ${product ? 'update' : 'create'} product. Please try again.`, 
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            <span className="gradient-text">{product ? 'Edit Product' : 'Add New Product'}</span>
          </DialogTitle>
          <DialogDescription>
            {product ? 'Edit the details of your product.' : 'Fill in the details below to create a new product.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
                min="0"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image">Product Image</Label>
              <div className="mt-2">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
              </div>
              {(previewUrl || product?.image) && (
                <div className="mt-4">
                  <img
                    src={previewUrl || `http://localhost:8085/uploads/${product?.image}`}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              disabled={loading}
            >
              {loading ? (product ? 'Saving...' : 'Creating...') : (product ? 'Save Changes' : 'Create Product')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 