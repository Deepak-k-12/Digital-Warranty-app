import React from 'react';
import PageHeader from '@/components/navigation/page-header';
import CardWrapper from '@/components/card-wrapper';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
// CHANGE: Corrected import path
import { mockWarrantyProducts, chartData as monthlyTrends } from '@/data/mockData'; 

const Analytics = () => {
  // --- Dynamic Data Calculation ---
  // Use useMemo to prevent recalculating on every render
  const analyticsData = React.useMemo(() => {
    const categoryCount = {};
    const statusCount = {};
    const valueByCategory = {};

    let totalValue = 0;
    let activeCoverage = 0;
    let expiringSoonValue = 0;
    let lostCoverage = 0;

    for (const product of mockWarrantyProducts) {
      // Category Count
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
      
      // Status Count & Value Calculation
      statusCount[product.status] = (statusCount[product.status] || 0) + 1;
      valueByCategory[product.category] = (valueByCategory[product.category] || 0) + product.price;
      totalValue += product.price;

      if (product.status === 'active') activeCoverage += product.price;
      if (product.status === 'warning') expiringSoonValue += product.price;
      if (product.status === 'expired') lostCoverage += product.price;
    }

    const categoryData = [
      { name: 'Electronics', value: categoryCount.electronics || 0, color: '#3b82f6' },
      { name: 'Medicine', value: categoryCount.medicine || 0, color: '#10b981' },
      { name: 'Food', value: categoryCount.food || 0, color: '#f59e0b' },
      { name: 'Appliance', value: categoryCount.appliance || 0, color: '#ef4444' },
    ];

    const statusData = [
      { name: 'Active', value: statusCount.active || 0, color: '#10b981' },
      { name: 'Expiring', value: statusCount.warning || 0, color: '#f59e0b' },
      { name: 'Expired', value: statusCount.expired || 0, color: '#ef4444' },
    ];

    const valueData = Object.keys(valueByCategory).map(category => ({
      category,
      totalValue: valueByCategory[category],
    }));

    return { categoryData, statusData, valueData, totalValue, activeCoverage, expiringSoonValue, lostCoverage };
  }, []);

  return (
    <>
      <PageHeader
        items={[
          { label: 'Home', href: '/' },
          { label: 'Analytics', href: '/analytics' }
        ]}
        heading="📊 Warranty Analytics & Insights"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <CardWrapper>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">${analyticsData.totalValue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Protected Value</div>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-1">${analyticsData.activeCoverage.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Active Coverage</div>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-1">${analyticsData.expiringSoonValue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Expiring Soon</div>
          </div>
        </CardWrapper>
        <CardWrapper>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-1">${analyticsData.lostCoverage.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Lost Coverage</div>
          </div>
        </CardWrapper>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Category Distribution */}
        <CardWrapper title="Products by Category">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={analyticsData.categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {analyticsData.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardWrapper>

        {/* Status Distribution */}
        <CardWrapper title="Warranty Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={analyticsData.statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {analyticsData.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardWrapper>
      </div>

      {/* Monthly Trends */}
      <CardWrapper title="Monthly Product Trends" className="mb-6">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
            <Legend />
            <Line type="monotone" dataKey="electronics" stroke="#3b82f6" strokeWidth={2} name="Electronics" />
            <Line type="monotone" dataKey="medicine" stroke="#10b981" strokeWidth={2} name="Medicine" />
            <Line type="monotone" dataKey="food" stroke="#f59e0b" strokeWidth={2} name="Food" />
            <Line type="monotone" dataKey="appliance" stroke="#ef4444" strokeWidth={2} name="Appliance" />
          </LineChart>
        </ResponsiveContainer>
      </CardWrapper>
      
      {/* ... Other sections like Insights and Recommendations can remain the same ... */}
    </>
  );
};

export default Analytics;