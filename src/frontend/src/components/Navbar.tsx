import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  Globe,
  Home,
  LogOut,
  Menu,
  ShoppingCart,
  Store,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount?: number;
}

export function Navbar({
  currentPage,
  onNavigate,
  cartCount = 0,
}: NavbarProps) {
  const { currentUser, logout } = useAuth();
  const { t, toggle, language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const isRetailer = currentUser?.role === "retailer";

  const handleLogout = () => {
    logout();
    onNavigate("home");
    setMenuOpen(false);
  };

  const navItems = [
    {
      key: "nav.home",
      page: isRetailer ? "retailer-dashboard" : "wholesaler-dashboard",
      icon: <Home className="w-4 h-4" />,
      ocid: "navbar.home.link",
    },
    ...(isRetailer
      ? [
          {
            key: "nav.marketplace",
            page: "retailer-dashboard",
            icon: <Store className="w-4 h-4" />,
            ocid: "navbar.marketplace.link",
          },
          {
            key: "nav.cart",
            page: "cart",
            icon: <ShoppingCart className="w-4 h-4" />,
            ocid: "navbar.cart.link",
            badge: cartCount,
          },
          {
            key: "nav.orders",
            page: "orders",
            icon: <ClipboardList className="w-4 h-4" />,
            ocid: "navbar.orders.link",
          },
        ]
      : [
          {
            key: "nav.orders",
            page: "wholesaler-dashboard",
            icon: <ClipboardList className="w-4 h-4" />,
            ocid: "navbar.orders.link",
          },
        ]),
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() =>
            onNavigate(
              isRetailer ? "retailer-dashboard" : "wholesaler-dashboard",
            )
          }
          className="flex items-center gap-2"
        >
          <div className="bazaar-gradient rounded-lg p-1 flex items-center gap-2">
            <img
              src="/assets/uploads/image-1-2.png"
              alt="BazaarNet"
              className="h-9 w-auto rounded-md object-contain"
            />
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              data-ocid={item.ocid}
              onClick={() => onNavigate(item.page)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                currentPage === item.page
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {item.icon}
              {t(item.key)}
              {item.badge && item.badge > 0 ? (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-white">
                  {item.badge}
                </Badge>
              ) : null}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            data-ocid="navbar.language.toggle"
            variant="outline"
            size="sm"
            onClick={toggle}
            className="gap-1.5 rounded-lg border-border text-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === "en" ? "EN" : "TA"}
          </Button>
          {currentUser && (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs font-semibold text-foreground leading-none">
                  {currentUser.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentUser.shopName}
                </p>
              </div>
              <Button
                data-ocid="navbar.logout.button"
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {isRetailer && cartCount > 0 && (
            <button
              type="button"
              data-ocid="navbar.cart.link"
              onClick={() => {
                onNavigate("cart");
                setMenuOpen(false);
              }}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5 text-primary" />
              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-primary text-white">
                {cartCount}
              </Badge>
            </button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMenuOpen((m) => !m)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              data-ocid={item.ocid}
              onClick={() => {
                onNavigate(item.page);
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-left hover:bg-accent"
            >
              {item.icon}
              {t(item.key)}
              {item.badge && item.badge > 0 ? (
                <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-white">
                  {item.badge}
                </Badge>
              ) : null}
            </button>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <Button
              data-ocid="navbar.language.toggle"
              variant="outline"
              size="sm"
              onClick={toggle}
              className="gap-1.5 text-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === "en" ? "EN" : "TA"}
            </Button>
            {currentUser && (
              <Button
                data-ocid="navbar.logout.button"
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive gap-1.5 text-sm"
              >
                <LogOut className="w-4 h-4" />
                {t("nav.logout")}
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
