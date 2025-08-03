import { mockWarrantyProducts } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, AlertTriangle } from 'lucide-react';

const ActivityFeed = () => {
  // Create a combined list of events from your products
  const activities = mockWarrantyProducts
    .map(p => ({
      id: p.id,
      type: p.status === 'expired' || p.status === 'warning' ? 'expiry' : 'added',
      date: p.status === 'expired' || p.status === 'warning' ? (p.expiryDate || p.warrantyUntil) : p.purchaseDate,
      productName: p.name,
      status: p.status,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by most recent event
    .slice(0, 5); // Show the top 5 most recent activities

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={`${activity.id}-${index}`} className="flex items-start space-x-4">
          {/* Icon */}
          <div className={`mt-1 rounded-full p-1.5 ${
            activity.type === 'added' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-yellow-100 dark:bg-yellow-900/50'
          }`}>
            {activity.type === 'added' ? (
              <PlusCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            )}
          </div>

          {/* Activity Text */}
          <div className="flex-1">
            <p className="text-sm text-foreground">
              {activity.type === 'added' ? (
                <>You added <span className="font-semibold">{activity.productName}</span> to your vault.</>
              ) : (
                <>Warranty for <span className="font-semibold">{activity.productName}</span> is expiring soon.</>
              )}
            </p>
            <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
          </div>

          {/* Status Badge */}
          <Badge className={`text-xs capitalize ${getStatusColor(activity.status)}`}>
            {activity.status}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;