import { Link, usePage } from "@inertiajs/react";
import { BarChart3, Bell, Box, History, LayoutDashboard, Package, Settings, ShoppingCart, Users, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Inertia } from "@inertiajs/inertia";

const navItems = [
  {
    title: "Home",
    href: "/Home",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    badge: 5,
  },
];

export function Layout({ children }) {
  const pathname = window.location.pathname;
  const { auth } = usePage().props;

  const handleLogout = () => {
    Inertia.get("/logout");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 border-r bg-background lg:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center font-semibold">
            StockMaster
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Package className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="border-b p-6">
                <SheetTitle>StockMaster</SheetTitle>
              </SheetHeader>
              <nav className="space-y-1 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                    )}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-4 ml-auto">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <span className="text-sm font-medium">{auth.user?.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}