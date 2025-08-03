import { useState } from 'react';
import PageHeader from '@/components/navigation/page-header';
import CardWrapper from '@/components/card-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CloudUpload, Eye, Save, Bell, Camera, FileText, Zap } from 'lucide-react';
import { categories } from '@/data/mockData'; // CHANGE: Import categories for dynamic options

const WarrantyUpload = () => {
  // CHANGE: Unified state for the entire form
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    purchaseDate: "",
    warrantyMonths: "",
    brand: "",
    model: "",
    price: "",
    reminders: {
      oneMonth: true,
      oneWeek: true,
      oneDay: true
    }
  });

  const [uploadMethod, setUploadMethod] = useState('camera');

  // CHANGE: Generic handler for all text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  // CHANGE: Generic handler for all checkboxes
  const handleReminderChange = (name, checked) => {
    setProductData(prev => ({
      ...prev,
      reminders: { ...prev.reminders, [name]: checked }
    }));
  };

  const handleSave = () => {
    console.log("Saving product:", productData);
  };

  const simulateOCR = () => {
    setProductData({
      ...productData, // Keep existing reminder settings
      productName: "iPhone 15 Pro Max",
      category: "electronics",
      purchaseDate: "2024-12-01",
      warrantyMonths: "24",
      brand: "Apple Inc.",
      model: "A3108",
      price: "1199"
    });
  };

  return (
    <>
      <PageHeader
        items={[
          { label: 'Home', href: '/' },
          { label: 'Upload Bill', href: '/upload' }
        ]}
        heading="📄 Upload Your Bill or Invoice"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <CardWrapper title="📤 Upload Methods">
          {/* ... Upload UI remains the same ... */}
        </CardWrapper>

        {/* OCR Results Form */}
        <CardWrapper title="🔍 OCR Results & Product Details">
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary" />
                Extracted Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div>
                  <Label className="text-sm font-medium">Product Name</Label>
                  <Input name="productName" value={productData.productName} onChange={handleChange} placeholder="Enter product name" className="mt-1" />
                </div>
                {/* Category */}
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Select value={productData.category} onValueChange={(value) => setProductData({...productData, category: value})}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {/* CHANGE: Dynamically generate categories */}
                      {categories.filter(c => c.id !== 'all').map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* ... Other inputs using the generic handleChange ... */}
                <div><Label>Purchase Date</Label><Input name="purchaseDate" type="date" value={productData.purchaseDate} onChange={handleChange} className="mt-1" /></div>
                <div><Label>Warranty (months)</Label><Input name="warrantyMonths" type="number" value={productData.warrantyMonths} onChange={handleChange} placeholder="24" className="mt-1" /></div>
                <div><Label>Brand</Label><Input name="brand" value={productData.brand} onChange={handleChange} placeholder="Brand name" className="mt-1" /></div>
                <div><Label>Model</Label><Input name="model" value={productData.model} onChange={handleChange} placeholder="Model/SKU" className="mt-1" /></div>
              </div>
            </div>
          </div>
        </CardWrapper>
      </div>

      {/* Reminder Settings */}
      <CardWrapper title="🔔 Reminder Settings">
        <div className="space-y-4">
          <h5 className="font-medium text-foreground mb-3 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-primary" />
            When should we remind you?
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="oneMonth" checked={productData.reminders.oneMonth} onCheckedChange={(checked) => handleReminderChange('oneMonth', checked)} />
              <Label htmlFor="oneMonth">30 days before</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="oneWeek" checked={productData.reminders.oneWeek} onCheckedChange={(checked) => handleReminderChange('oneWeek', checked)} />
              <Label htmlFor="oneWeek">7 days before</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="oneDay" checked={productData.reminders.oneDay} onCheckedChange={(checked) => handleReminderChange('oneDay', checked)} />
              <Label htmlFor="oneDay">1 day before</Label>
            </div>
          </div>
        </div>
      </CardWrapper>

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6">
        <Button onClick={handleSave} className="flex-1 sidemenu-background text-white">
          <Save className="w-4 h-4 mr-2" />
          Save to Warranty Vault
        </Button>
        <Button variant="outline" className="px-6">Cancel</Button>
      </div>
    </>
  );
};

export default WarrantyUpload;