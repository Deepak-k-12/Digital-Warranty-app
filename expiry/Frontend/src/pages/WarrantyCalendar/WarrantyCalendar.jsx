import React from 'react';
import PageHeader from '@/components/navigation/page-header';
import CardWrapper from '@/components/card-wrapper';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon } from 'lucide-react';
import { mockWarrantyProducts } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';

// --- Imports for the Calendar Component ---
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const WarrantyCalendar = () => {
  // Prepare events for the calendar from your mock data
  const events = mockWarrantyProducts.map(product => ({
    id: product.id,
    title: product.name,
    start: new Date(product.warrantyUntil || product.expiryDate),
    end: new Date(product.warrantyUntil || product.expiryDate),
    allDay: true,
    resource: product, // Attach the full product object to the event
  }));

  // Custom component to style each event on the calendar
  const EventComponent = ({ event }) => (
    <div className={`text-xs p-1 rounded-sm truncate ${getStatusColor(event.resource.status)}`}>
      {event.title}
    </div>
  );
  
  // Filter for the "Upcoming Expiries" list on the side
  const upcomingEvents = mockWarrantyProducts
    .filter(product => product.status === 'warning' || product.status === 'expired')
    .sort((a, b) => new Date(a.warrantyUntil || a.expiryDate) - new Date(b.warrantyUntil || b.expiryDate))
    .slice(0, 5);

  return (
    <>
      <PageHeader
        items={[
          { label: 'Home', href: '/' },
          { label: 'Calendar', href: '/calendar' }
        ]}
        heading="📅 Warranty & Expiry Calendar"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <CardWrapper className="lg:col-span-2" noPadding>
          <div className="p-4 h-[700px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              components={{
                event: EventComponent,
              }}
            />
          </div>
        </CardWrapper>

        {/* Upcoming Events List */}
        <CardWrapper title="⏰ Upcoming Expiries">
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(product => (
                <div 
                  key={product.id}
                  className={`p-4 rounded-lg border ${getStatusColor(product.status)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                      product.status === 'expired' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {product.brand} • {product.model}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.status === 'expired' ? 'Expired on' : 'Expires on'}: {formatDate(product.warrantyUntil || product.expiryDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>No upcoming expiries!</p>
              </div>
            )}
          </div>
        </CardWrapper>
      </div>
    </>
  );
};

export default WarrantyCalendar;