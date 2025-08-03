import { AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// This function calculates the days remaining or past
const calculateDays = (dateString) => {
  if (!dateString) return { text: 'N/A', isPast: false };
  const today = new Date();
  const expiryDate = new Date(dateString);
  // Normalize dates to midnight to compare days accurately
  today.setHours(0, 0, 0, 0);
  expiryDate.setHours(0, 0, 0, 0);
  
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: `${Math.abs(diffDays)} days ago`, isPast: true };
  }
  if (diffDays === 0) {
    return { text: `Today`, isPast: false };
  }
  return { text: `${diffDays} days left`, isPast: false };
};

const WarrantyAlerts = ({ alerts }) => {
  // Handle the case where there are no alerts
  if (!alerts || alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
        <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
        <p className="font-medium">All good!</p>
        <p className="text-sm">No expiring items found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const date = alert.warrantyUntil || alert.expiryDate;
        const { text: daysText, isPast } = calculateDays(date);

        return (
          <div key={alert.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50">
            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              isPast ? 'bg-red-100 dark:bg-red-900/50' : 'bg-yellow-100 dark:bg-yellow-900/50'
            }`}>
              {isPast ? (
                <XCircle className="h-5 w-5 text-red-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{alert.name}</p>
              <p className={`text-xs ${isPast ? 'text-red-500' : 'text-yellow-600'}`}>
                {isPast ? 'Expired on' : 'Expires on'} {formatDate(date)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{daysText}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WarrantyAlerts;