import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthPage } from "./pages/AuthPages";
import { Cart } from "./pages/Cart";
import { HomePage } from "./pages/HomePage";
import { Orders } from "./pages/Orders";
import { RetailerDashboard } from "./pages/RetailerDashboard";
import { SplashScreen } from "./pages/SplashScreen";
import { WholesalerDashboard } from "./pages/WholesalerDashboard";

type Page =
  | "splash"
  | "home"
  | "retailer-login"
  | "retailer-signup"
  | "wholesaler-login"
  | "wholesaler-signup"
  | "retailer-dashboard"
  | "wholesaler-dashboard"
  | "cart"
  | "orders";

export default function App() {
  const [page, setPage] = useState<Page>("splash");

  const navigate = useCallback((p: string) => {
    setPage(p as Page);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "splash":
        return <SplashScreen onDone={() => setPage("home")} />;
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "retailer-login":
        return (
          <AuthPage userRole="retailer" mode="login" onNavigate={navigate} />
        );
      case "retailer-signup":
        return (
          <AuthPage userRole="retailer" mode="signup" onNavigate={navigate} />
        );
      case "wholesaler-login":
        return (
          <AuthPage userRole="wholesaler" mode="login" onNavigate={navigate} />
        );
      case "wholesaler-signup":
        return (
          <AuthPage userRole="wholesaler" mode="signup" onNavigate={navigate} />
        );
      case "retailer-dashboard":
        return <RetailerDashboard onNavigate={navigate} />;
      case "wholesaler-dashboard":
        return <WholesalerDashboard onNavigate={navigate} />;
      case "cart":
        return <Cart onNavigate={navigate} />;
      case "orders":
        return <Orders onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        {renderPage()}
        <Toaster richColors position="top-right" />
      </LanguageProvider>
    </AuthProvider>
  );
}
