import { useState } from 'react';
import PageHeader from '@/components/navigation/page-header';
import CardWrapper from '@/components/card-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowUpDown, Eye, Edit, Trash2 } from 'lucide-react';
// CHANGE: Corrected import paths
import { mockWarrantyProducts, categories } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = mockWarrantyProducts
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
          // Ensure products with no daysLeft (e.g., food items without warranty) are handled
          return (a.daysLeft ?? Infinity) - (b.daysLeft ?? Infinity);
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

      {/* Filters */}
      <CardWrapper title="🔍 Search & Filter">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {/* CHANGE: Using icons from the data object directly */}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <CardWrapper key={product.id} className="hover:shadow-lg transition-shadow p-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(product.category)} text-xs font-medium capitalize`}>
                  {product.category}
                </Badge>
                <Badge className={`${getStatusColor(product.status)} text-xs font-medium capitalize`}>
                  {product.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div>
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`font-medium ${getStatusColor(product.status)}`}>
                    {product.status === 'expired' 
                      ? `Expired ${Math.abs(product.daysLeft)} days ago`
                      : `${product.daysLeft} days left`
                    }
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button className="flex-1 sidemenu-background text-white"><Eye className="w-4 h-4 mr-2" /> View</Button>
                <Button variant="outline" size="icon"><Edit className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
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
    </>
  );
};

export default Products;