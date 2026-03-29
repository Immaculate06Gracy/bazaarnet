import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useStore } from "../hooks/useStore";

interface CartProps {
  onNavigate: (page: string) => void;
}

export function Cart({ onNavigate }: CartProps) {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const store = useStore(currentUser?.id);

  const cartItemsWithDetails = store.cart
    .map((item) => {
      const product = store.products.find((p) => p.id === item.productId);
      return { ...item, product };
    })
    .filter((item) => item.product);

  const total = cartItemsWithDetails.reduce((sum, item) => {
    return sum + item.product!.pricePerKg * item.qty;
  }, 0);

  const handlePlaceOrder = () => {
    if (!currentUser || cartItemsWithDetails.length === 0) return;
    const items = cartItemsWithDetails.map((item) => ({
      productId: item.product!.id,
      productName: item.product!.name,
      qty: item.qty,
      pricePerKg: item.product!.pricePerKg,
      wholesalerId: item.product!.wholesalerId,
    }));
    store.placeOrder(
      currentUser.id,
      currentUser.name,
      currentUser.shopName,
      items,
      total,
    );
    toast.success(t("cart.orderSuccess"));
    onNavigate("orders");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentPage="cart"
        onNavigate={onNavigate}
        cartCount={store.cart.length}
      />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          {t("cart.title")}
        </h1>

        {cartItemsWithDetails.length === 0 ? (
          <div data-ocid="cart.empty_state" className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">{t("cart.empty")}</p>
            <Button
              onClick={() => onNavigate("retailer-dashboard")}
              className="mt-4 rounded-xl bg-primary text-white"
            >
              {t("nav.marketplace")}
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {cartItemsWithDetails.map((item, i) => (
                <Card
                  key={item.productId}
                  data-ocid={`cart.item.row.${i + 1}`}
                  className="rounded-2xl shadow-card border-border"
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <img
                      src={item.product!.image}
                      alt={item.product!.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {item.product!.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.product!.pricePerKg}/{t("common.kg")}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        Subtotal: ₹{item.product!.pricePerKg * item.qty}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() =>
                          store.updateCartQty(item.productId, item.qty - 1)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold text-sm">
                        {item.qty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() =>
                          store.updateCartQty(item.productId, item.qty + 1)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-destructive hover:text-destructive"
                        onClick={() => store.removeFromCart(item.productId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-2xl shadow-card border-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">
                    {cartItemsWithDetails.length} items
                  </span>
                </div>
                <Separator className="mb-4" />
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display text-xl font-bold text-foreground">
                    {t("cart.total")}
                  </span>
                  <span className="font-display text-2xl font-bold text-primary">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
                <Button
                  data-ocid="cart.place_order.primary_button"
                  onClick={handlePlaceOrder}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base"
                >
                  {t("cart.placeOrder")}
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
