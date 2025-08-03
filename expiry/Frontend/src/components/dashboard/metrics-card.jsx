import CardWrapper from '../card-wrapper';
import { Button } from '../ui/button';

const MetricsCard = ({ item }) => {
  // If no item is passed, don't render anything
  if (!item) return null;

  // Destructure the properties from the item object
  const { title, value, change, icon: Icon } = item;

  return (
    <CardWrapper>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground mb-2 text-sm font-medium">{title}</p>
          <p className="mb-2 text-2xl font-bold">{value}</p>
          {change && (
            <p className="text-muted-foreground text-sm">
              <span className={`${Number(change) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {Number(change) > 0 ? '+' : ''}{change}%
              </span>
              {' from last month'}
            </p>
          )}
        </div>
        <Button variant="default" size="icon" className="sidemenu-background text-white">
          <Icon className="h-6 w-6" />
        </Button>
      </div>
    </CardWrapper>
  );
};

export default MetricsCard;