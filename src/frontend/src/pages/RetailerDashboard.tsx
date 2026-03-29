import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useStore } from "../hooks/useStore";

const CATEGORY_ICONS: Record<string, string> = {
  All: "🛒",
  Spices: "🌶️",
  Vegetables: "🥦",
  Fruits: "🍎",
  Groceries: "🌾",
  Others: "📦",
};

const CATEGORY_COLORS: Record<string, string> = {
  All: "bg-primary/10 text-primary border-primary/20",
  Spices: "bg-orange-50 text-orange-700 border-orange-200",
  Vegetables: "bg-green-50 text-green-700 border-green-200",
  Fruits: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Groceries: "bg-amber-50 text-amber-700 border-amber-200",
  Others: "bg-slate-50 text-slate-700 border-slate-200",
};

interface RetailerDashboardProps {
  onNavigate: (page: string) => void;
}

export function RetailerDashboard({ onNavigate }: RetailerDashboardProps) {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const store = useStore(currentUser?.id);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Spices",
    "Vegetables",
    "Fruits",
    "Groceries",
    "Others",
  ];

  const filtered = store.products.filter((p) => {
    const matchCat =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (productId: string) => {
    store.addToCart(productId, 1);
    const product = store.products.find((p) => p.id === productId);
    toast.success(`${product?.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentPage="retailer-dashboard"
        onNavigate={onNavigate}
        cartCount={store.cart.length}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Welcome back,{" "}
            <span className="text-primary">{currentUser?.name}</span>!
          </h1>
          <p className="text-muted-foreground mt-1">{currentUser?.shopName}</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="retailer.search.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search.placeholder")}
            className="pl-10 rounded-xl h-11 border-border"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid="retailer.category.tab"
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-md scale-105"
                  : `${CATEGORY_COLORS[cat] || CATEGORY_COLORS.Others} hover:scale-105`
              }`}
            >
              <span>{CATEGORY_ICONS[cat] || "📦"}</span>
              {t(`category.${cat.toLowerCase()}`) || cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div data-ocid="product.empty_state" className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
