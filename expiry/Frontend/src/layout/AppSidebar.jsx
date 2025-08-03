import {
  Receipt,
  Upload,
  Calendar,
  BarChart3,
  Package,
  LayoutDashboard,
} from 'lucide-react';
import {
  Sidebar,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { useNavigate, useLocation } from 'react-router-dom';

// CHANGE: Data is now specific to the Digital Warranty Vault project.
const navItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Upload Bill',
    url: '/upload',
    icon: Upload,
  },
  {
    title: 'Products',
    url: '/products',
    icon: Package,
  },
  {
    title: 'Calendar',
    url: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
  },
];

export function AppSidebar({ ...props }) {
  const { open } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation(); // FIX: Correctly import and use useLocation

  // CHANGE: The logo now uses the Receipt icon, which fits the project theme.
  const renderLogo = () => {
    if (open) {
      return (
        <div className="flex items-center space-x-2">
          <Receipt className="text-primary h-8 w-8" />
          <span className="heading text-xl font-bold">Warranty Vault</span>
        </div>
      );
    }
    return (
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
        <Receipt className="text-primary h-8 w-8" />
      </div>
    );
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mb-1 py-3.5">
        <SidebarMenu>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            onClick={() => navigate('/')}
          >
            {renderLogo()}
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>

      {/* CHANGE: Drastically simplified by removing all submenu logic. */}
      <div className="hide-scrollbar flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              onClick={() => navigate(item.url)}
              // FIX: Active state is now derived directly and reliably from location.pathname
              className={`cursor-pointer ${
                location.pathname === item.url
                  ? 'sidemenu-background !text-white'
                  : 'text-muted-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarGroup>
        ))}
      </div>
    </Sidebar>
  );
}