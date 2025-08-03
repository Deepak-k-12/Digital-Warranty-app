import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/utils';
import { mockWarrantyProducts } from '@/data/mockData';
import { ImageOff } from 'lucide-react';

const RecentProducts = () => {
  const recentProducts = mockWarrantyProducts.slice(0, 4);

  return (
    <div className="space-y-4">
      {recentProducts.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-4 rounded-xl bg-muted/20 p-3 hover:bg-muted/30 transition"
        >
          <div className="h-12 w-12 flex items-center justify-center rounded-md overflow-hidden border border-border bg-background">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <ImageOff className="w-5 h-5 text-muted-foreground" />
            )}
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.brand}</p>
          </div>

          <Badge className={`text-xs capitalize ${getStatusColor(product.status)}`}>
            {product.status}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default RecentProducts;
