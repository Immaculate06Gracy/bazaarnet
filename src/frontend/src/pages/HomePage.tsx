import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Store } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type Page = string;

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bazaar-gradient flex flex-col items-center justify-center p-6">
      {/* Hero */}
      <div className="text-center mb-12 animate-fade-in">
        <img
          src="/assets/uploads/image-1-2.png"
          alt="BazaarNet"
          className="h-28 md:h-36 w-auto object-contain mx-auto mb-4"
        />
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Retailer Card */}
        <Card
          data-ocid="home.retailer.card"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white shadow-card-hover rounded-2xl animate-fade-in stagger-2 bazaar-card-hover cursor-pointer"
        >
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <Store className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">
              {t("home.retailer")}
            </h2>
            <p className="text-white/70 text-sm mb-6">
              {t("home.retailer.desc")}
            </p>
            <div className="flex gap-3 w-full">
              <Button
                data-ocid="home.retailer.login.button"
                variant="secondary"
                className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold rounded-xl"
                onClick={() => onNavigate("retailer-login")}
              >
                {t("home.login")}
              </Button>
              <Button
                data-ocid="home.retailer.signup.button"
                variant="secondary"
                className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold rounded-xl"
                onClick={() => onNavigate("retailer-signup")}
              >
                {t("home.signup")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wholesaler Card */}
        <Card
          data-ocid="home.wholesaler.card"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white shadow-card-hover rounded-2xl animate-fade-in stagger-3 bazaar-card-hover cursor-pointer"
        >
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">
              {t("home.wholesaler")}
            </h2>
            <p className="text-white/70 text-sm mb-6">
              {t("home.wholesaler.desc")}
            </p>
            <div className="flex gap-3 w-full">
              <Button
                data-ocid="home.wholesaler.login.button"
                variant="secondary"
                className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold rounded-xl"
                onClick={() => onNavigate("wholesaler-login")}
              >
                {t("home.login")}
              </Button>
              <Button
                data-ocid="home.wholesaler.signup.button"
                variant="secondary"
                className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold rounded-xl"
                onClick={() => onNavigate("wholesaler-signup")}
              >
                {t("home.signup")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
