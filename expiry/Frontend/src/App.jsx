import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard/Dashboard";
import WarrantyUpload from "@/pages/WarrantyUpload/WarrantyUpload";
import WarrantyCalendar from "@/pages/WarrantyCalendar/WarrantyCalendar";
import Analytics from "@/pages/Analytics/Analytics";
import Products from "@/pages/Products/Products";
import AppLayout from "@/layout/AppLayout";
import { ThemeProvider } from "@/context/ThemeContext";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index path="/" element={<Dashboard />} />
                <Route path="/upload" element={<WarrantyUpload />} />
                <Route path="/calendar" element={<WarrantyCalendar />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/products" element={<Products />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
