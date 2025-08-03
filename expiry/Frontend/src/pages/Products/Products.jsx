import { useState } from 'react';
import PageHeader from '@/components/navigation/page-header';
import CardWrapper from '@/components/card-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowUpDown, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { mockWarrantyProducts as initialProducts, categories } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Products = () => {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewingProduct, setViewingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // --- HANDLER FUNCTIONS ---
  const handleDelete = (productId) => {
    setProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
    setDeletingProduct(null);
  };

  const handleUpdate = () => {
    setProducts(currentProducts => 
      currentProducts.map(p => p.id === editingProduct.id ? editingProduct : p)
    );
    setEditingProduct(null);
  };
  
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({ ...prev, [name]: value }));
  };

  // --- FILTERING & SORTING LOGIC ---
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        case 'expiry':
          const aDate = new Date(a.warrantyUntil || a.expiryDate);
          const bDate = new Date(b.warrantyUntil || b.expiryDate);
          return aDate - bDate;
        default:
          return 0;
      }
    });

  return (
    <>
      <PageHeader
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' }
        ]}
        heading="📦 Your Product Inventory"
      />

      <CardWrapper title="🔍 Search & Filter">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(({ id, name, icon: Icon }) => (
              <Button
                key={id}
                onClick={() => setSelectedCategory(id)}
                variant={selectedCategory === id ? "default" : "outline"}
                size="sm"
                className={`${selectedCategory === id && "sidemenu-background text-white"} rounded-full font-medium`}
              >
                <Icon className="w-4 h-4 mr-2" /> {name}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="expiry">Sort by Expiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <CardWrapper key={product.id} className="p-0 flex flex-col">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 space-y-4 flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(product.category)} text-xs font-medium capitalize`}>
                  {product.category}
                </Badge>
                <Badge className={`${getStatusColor(product.status)} text-xs font-medium capitalize`}>
                  {product.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.brand} • {product.model}</p>
              </div>
              
              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Purchase Date:</span>
                  <span className="font-medium">{formatDate(product.purchaseDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {product.warrantyUntil ? 'Warranty Until:' : 'Expiry Date:'}
                  </span>
                  <span className={`font-medium ${getStatusColor(product.status)}`}>
                    {formatDate(product.warrantyUntil || product.expiryDate)}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button onClick={() => setViewingProduct(product)} className="flex-1 sidemenu-background text-white"><Eye className="w-4 h-4 mr-2" /> View</Button>
                <Button onClick={() => setEditingProduct(product)} variant="outline" size="icon"><Edit className="w-4 h-4" /></Button>
                <Button onClick={() => setDeletingProduct(product)} variant="outline" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardWrapper>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <CardWrapper className="text-center py-12">
          <div className="text-muted-foreground">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        </CardWrapper>
      )}

      {/* View Details Modal */}
      <Dialog open={!!viewingProduct} onOpenChange={() => setViewingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewingProduct?.name}</DialogTitle>
            <DialogDescription>{viewingProduct?.brand} • {viewingProduct?.model}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <img src={viewingProduct?.image} alt={viewingProduct?.name} className="w-full h-48 object-cover rounded-md" />
            <div className="text-sm space-y-2">
                <div className="flex justify-between"><span className="text-muted-foreground">Category:</span><span className="font-medium capitalize">{viewingProduct?.category}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Purchase Date:</span><span className="font-medium">{formatDate(viewingProduct?.purchaseDate)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Price:</span><span className="font-medium">${viewingProduct?.price}</span></div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">{viewingProduct?.warrantyUntil ? 'Warranty Until:' : 'Expiry Date:'}</span>
                    <span className={`font-medium ${getStatusColor(viewingProduct?.status)}`}>{formatDate(viewingProduct?.warrantyUntil || viewingProduct?.expiryDate)}</span>
                </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deletingProduct} onOpenChange={() => setDeletingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-destructive" />
              Are you sure?
            </DialogTitle>
            <DialogDescription>
              This action will permanently delete the warranty for <strong className="text-foreground">{deletingProduct?.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setDeletingProduct(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(deletingProduct.id)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Modal */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Make changes to your product details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={editingProduct?.name} onChange={handleEditFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">Brand</Label>
              <Input id="brand" name="brand" value={editingProduct?.brand} onChange={handleEditFormChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" name="price" type="number" value={editingProduct?.price} onChange={handleEditFormChange} className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Products;