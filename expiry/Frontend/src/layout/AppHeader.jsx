import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
// CHANGE: Using the cleaner toggleTheme function from context
import { useTheme } from '@/context/ThemeContext'; 
import {
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  UserIcon,
  LogOutIcon,
  Search,
  Bell,
  SettingsIcon, // CHANGE: Added a more appropriate icon
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator, // CHANGE: Added for better visual separation
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// CHANGE: Updated menu items with "Settings" icon and "Logout" option
const dropdownMenuItems = [
  { label: 'Profile', icon: UserIcon, link: '/profile' },
  { label: 'Settings', icon: SettingsIcon, link: '/settings' },
];

const AppHeader = () => {
  const { theme, toggleTheme } = useTheme(); // CHANGE: Using toggleTheme
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) return; // Don't search if the query is empty
    // CHANGE: Pass the search query as a URL parameter
    navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
  };

  return (
    <header className="bg-background sticky top-0 z-10 flex w-full border-b py-3">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, warranties..."
            className="w-full !border-[1px] border-border pl-10"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(); // CHANGE: Use the enhanced search handler
              }
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pr-2 lg:px-6">
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-0 text-xs text-destructive-foreground">
            3
          </Badge>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme} // CHANGE: Using the cleaner toggleTheme function
        >
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-2 flex h-8 min-w-[48px] items-center rounded-full">
              <div className="bg-primary -ml-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
                WV
              </div>
              <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[180px] px-3 py-2">
            <div className="mb-2 border-b border-muted px-2 pt-1 pb-2">
              <div className="text-sm font-semibold text-foreground">Warranty Vault User</div>
              <div className="text-xs text-muted-foreground">user@warrantyvault.com</div>
            </div>
            {dropdownMenuItems.map(({ label, icon: Icon, link }) => (
              <DropdownMenuItem key={label} onClick={() => navigate(link || '')}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </DropdownMenuItem>
            ))}
            {/* CHANGE: Added a separator and Logout button */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/logout')}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;