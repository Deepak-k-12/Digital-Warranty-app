import { Package, Shield, Clock, AlertTriangle } from 'lucide-react';

export const warrantyStatsData = [
  {
    title: 'Total Products',
    value: '24',
    change: '+12.5',
    icon: Package
  },
  {
    title: 'Active Warranties',
    value: '18',
    change: '+8.2',
    icon: Shield
  },
  {
    title: 'Expiring Soon',
    value: '3',
    change: '-15.3',
    icon: Clock
  },
  {
    title: 'Expired Items',
    value: '2',
    change: '+5.7',
    icon: AlertTriangle
  }
];

export const mockWarrantyProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    brand: "Apple Inc.",
    model: "A2890",
    category: "electronics",
    purchaseDate: "2023-03-15",
    warrantyMonths: 24,
    warrantyUntil: "2025-03-15",
    daysLeft: 85,
    status: "active",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    price: 999,
    billImage: "/bill-samples/iphone-bill.jpg"
  },
  {
    id: 2,
    name: "Paracetamol 500mg",
    brand: "ABC Pharma",
    model: "30 Tablets",
    category: "medicine",
    purchaseDate: "2023-01-10",
    expiryDate: "2024-12-10",
    daysLeft: 18,
    status: "warning",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    price: 5
  },
  {
    id: 3,
    name: "Organic Honey",
    brand: "Nature's Best",
    model: "500g",
    category: "food",
    purchaseDate: "2024-11-20",
    expiryDate: "2026-11-20",
    daysLeft: 730,
    status: "active",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    price: 12
  },
  {
    id: 4,
    name: "Samsung Washing Machine",
    brand: "Samsung",
    model: "WA70H4200SW",
    category: "appliance",
    purchaseDate: "2022-08-12",
    warrantyMonths: 60,
    warrantyUntil: "2027-08-12",
    daysLeft: 965,
    status: "active",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    price: 450
  },
  {
    id: 5,
    name: "Canon EOS R5",
    brand: "Canon",
    model: "Professional DSLR",
    category: "electronics",
    purchaseDate: "2023-06-05",
    warrantyMonths: 24,
    warrantyUntil: "2025-06-05",
    daysLeft: 163,
    status: "active",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    price: 3899
  },
  {
    id: 6,
    name: "Vitamin D3 2000 IU",
    brand: "HealthPlus",
    model: "60 Capsules",
    category: "medicine",
    purchaseDate: "2024-03-01",
    expiryDate: "2024-12-30",
    daysLeft: -5,
    status: "expired",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    price: 25
  }
];

export const categories = [
  { id: "all", name: "All Categories", icon: "Package" },
  { id: "electronics", name: "Electronics", icon: "Smartphone" },
  { id: "medicine", name: "Medicine", icon: "Pill" },
  { id: "food", name: "Food", icon: "UtensilsCrossed" },
  { id: "appliance", name: "Appliances", icon: "Home" }
];

export const chartData = [
  { month: 'Jan', electronics: 5, medicine: 8, food: 12, appliance: 3 },
  { month: 'Feb', electronics: 7, medicine: 6, food: 15, appliance: 4 },
  { month: 'Mar', electronics: 12, medicine: 10, food: 8, appliance: 6 },
  { month: 'Apr', electronics: 8, medicine: 12, food: 20, appliance: 5 },
  { month: 'May', electronics: 15, medicine: 9, food: 18, appliance: 8 },
  { month: 'Jun', electronics: 10, medicine: 14, food: 22, appliance: 7 }
];