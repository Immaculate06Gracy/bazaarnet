import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { type OrderStatus, useStore } from "../hooks/useStore";

const STATUS_STYLES: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-700 border-blue-200",
  Dispatched: "bg-orange-100 text-orange-700 border-orange-200",
  Delivered: "bg-green-100 text-green-700 border-green-200",
  Declined: "bg-red-100 text-red-700 border-red-200",
};

interface OrdersProps {
  onNavigate: (page: string) => void;
}

export function Orders({ onNavigate }: OrdersProps) {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const store = useStore(currentUser?.id);

  const orders = currentUser ? store.getRetailerOrders(currentUser.id) : [];

  const statusKey = (status: OrderStatus) =>
    `order.status.${status.toLowerCase()}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentPage="orders"
        onNavigate={onNavigate}
        cartCount={store.cart.length}
      />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          {t("orders.title")}
        </h1>

        {orders.length === 0 ? (
          <div data-ocid="orders.empty_state" className="text-center py-20">
            <ClipboardList className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">{t("orders.empty")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <Card
                key={order.id}
                data-ocid={`orders.item.${i + 1}`}
                className="rounded-2xl shadow-card border-border"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t("orders.date")}
                      </p>
                      <p className="font-semibold text-sm text-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold ${STATUS_STYLES[order.status]}`}
                    >
                      {t(statusKey(order.status))}
                    </Badge>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-foreground">
                          {item.productName}
                        </span>
                        <span className="text-muted-foreground">
                          {item.qty} kg × ₹{item.pricePerKg}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {t("orders.total")}
                    </span>
                    <span className="font-bold text-primary text-lg">
                      ₹{order.total.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
