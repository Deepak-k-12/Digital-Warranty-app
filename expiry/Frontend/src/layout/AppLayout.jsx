import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/layout/AppSidebar';
import { Outlet } from 'react-router-dom'; // CORRECTION: Always import from 'react-router-dom' for web projects.
import AppHeader from './AppHeader';
import AppFooter from '@/components/layout/app-footer';

const AppLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex-1 space-y-4 p-4 px-5">
          <Outlet />
        </div>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;