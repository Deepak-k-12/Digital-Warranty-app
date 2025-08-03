import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { mockWarrantyProducts } from '@/data/mockData';
import { Package } from 'lucide-react';

// A professional, vibrant, and accessible color palette
const CATEGORY_COLORS = {
  electronics: '#3b82f6', // blue-500
  medicine: '#10b981',    // emerald-500
  food: '#f59e0b',       // amber-500
  appliance: '#ef4444',   // red-500
  default: '#6b7280',     // gray-500
};

// --- Custom Active Shape for the Pie Slice ---
// This component renders the slice that is currently being hovered over, making it slightly larger.
const ActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 8} // Makes the active slice pop out
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      stroke="hsl(var(--card))"
      strokeWidth={3}
    />
  );
};

const WarrantyChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Dynamically calculate all necessary data from the product list
  const { categoryData, totalProducts, totalValue } = useMemo(() => {
    if (!mockWarrantyProducts || mockWarrantyProducts.length === 0) {
      return { categoryData: [], totalProducts: 0, totalValue: 0 };
    }

    const total = mockWarrantyProducts.length;
    const value = mockWarrantyProducts.reduce((sum, p) => sum + p.price, 0);

    const counts = mockWarrantyProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || { value: 0, totalValue: 0 });
      acc[product.category].value += 1;
      acc[product.category].totalValue += product.price;
      return acc;
    }, {});

    const data = Object.keys(counts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: counts[key].value,
      totalValue: counts[key].totalValue,
      percentage: ((counts[key].value / total) * 100).toFixed(1),
      color: CATEGORY_COLORS[key] || CATEGORY_COLORS.default,
    }));

    return { categoryData: data, totalProducts: total, totalValue: value };
  }, [mockWarrantyProducts]);

  const activeData = activeIndex !== null ? categoryData[activeIndex] : null;

  // Handle the case where there is no data to display
  if (categoryData.length === 0) {
    return (
      <div className="flex h-[350px] w-full flex-col items-center justify-center text-center">
        <div className="rounded-full border-4 border-dashed border-muted p-6">
          <Package className="h-12 w-12 text-muted-foreground" />
        </div>
        <p className="mt-4 font-semibold">No Product Data</p>
        <p className="text-sm text-muted-foreground">Upload a bill to see your category overview.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full h-[350px] grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* The Chart */}
      <div className="relative h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={<ActiveShape />}
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="95%"
              paddingAngle={3}
              stroke="none"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData ? activeData.name : 'total'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              {activeData ? (
                <>
                  <p className="text-3xl font-bold text-foreground">{activeData.value}</p>
                  <p className="text-sm text-muted-foreground">{activeData.name}</p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-bold text-foreground">{totalProducts}</p>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* The Interactive Legend */}
      <div className="space-y-3">
        {categoryData.map((entry, index) => (
          <motion.div
            key={entry.name}
            className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-muted/50 cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: entry.color }} />
              <span className="font-medium text-foreground">{entry.name}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{entry.value}</p>
              <p className="text-xs text-muted-foreground">{entry.percentage}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WarrantyChart;
