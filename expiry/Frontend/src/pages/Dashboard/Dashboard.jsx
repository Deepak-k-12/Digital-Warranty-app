import React from 'react';

// ✨ Global Effects
import GlobalSpotlight from '@/components/reactbits/Effects/GlobalSpotlight';
import StarsCanvas from '@/components/reactbits/Effects/StarsCanvas';
import ClickEffect from '@/components/reactbits/Effects/ClickEffect';

// Existing Dashboard imports
import PageHeader from '@/components/navigation/page-header';
import MetricsCard from '@/components/dashboard/metrics-card';
import WarrantyChart from '@/components/dashboard/warranty-chart';
import RecentProducts from '@/components/dashboard/recent-products';
import WarrantyAlerts from '@/components/dashboard/warranty-alerts';
import CardWrapper from '@/components/card-wrapper';
import { Button } from '@/components/ui/button';
import { Upload, Calendar, BarChart3, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { warrantyStatsData, mockWarrantyProducts, chartData } from '@/data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const recentProducts = mockWarrantyProducts.slice(0, 5);
  const warrantyAlerts = mockWarrantyProducts.filter(
    (p) => p.status === 'warning' || p.status === 'expired'
  );

  return (
    <>
      {/* 🌟 Global Visual Effects */}
      <GlobalSpotlight />
      <StarsCanvas />
      <ClickEffect />

      {/* 🧩 Page Header */}
      <PageHeader
        items={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/' },
        ]}
        heading="Welcome to your Warranty Vault!"
      >
        <Button 
          onClick={() => navigate('/upload')}
          className="sidemenu-background text-white hover:opacity-90"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Bill
        </Button>
        <Button variant="outline" onClick={() => navigate('/calendar')}>
          <Calendar className="w-4 h-4 mr-2" />
          View Calendar
        </Button>
      </PageHeader>

      {/* 📊 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {warrantyStatsData.map((stat) => (
          <MetricsCard key={stat.title} item={stat} />
        ))}
      </div>

      {/* ⚠️ Alerts */}
      <CardWrapper title="⚠️ Warranty & Expiry Alerts" className="border-l-4 border-l-yellow-500">
        <WarrantyAlerts alerts={warrantyAlerts} />
      </CardWrapper>

      {/* 📈 Chart & Recent Products */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <CardWrapper className="col-span-1 lg:col-span-4" title="📊 Product Categories Overview">
          <WarrantyChart data={chartData} />
        </CardWrapper>

        <CardWrapper className="col-span-1 lg:col-span-3" title="📦 Recent Products">
          <RecentProducts products={recentProducts} />
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="outline" className="w-full" onClick={() => navigate('/products')}>
              <Eye className="w-4 h-4 mr-2" />
              View All Products
            </Button>
          </div>
        </CardWrapper>
      </div>

      {/* ⚡ Quick Actions */}
      <CardWrapper title="🚀 Quick Actions" className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/upload')}>
            <Upload className="w-6 h-6 mb-2" />
            <span>Upload New Bill</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/calendar')}>
            <Calendar className="w-6 h-6 mb-2" />
            <span>Check Calendar</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/analytics')}>
            <BarChart3 className="w-6 h-6 mb-2" />
            <span>View Analytics</span>
          </Button>
        </div>
      </CardWrapper>
    </>
  );
};

export default Dashboard;
