import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Phone, ShoppingCart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import type { Product } from "../data/sampleData";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  index: number;
}

export function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  const { t } = useLanguage();
  const inStock = product.stock > 0;

  return (
    <Card className="rounded-2xl shadow-card bazaar-card-hover overflow-hidden border border-border">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/300x200/0A3D91/white?text=${encodeURIComponent(product.name)}`;
          }}
        />
        <Badge
          className={`absolute top-3 right-3 text-xs font-semibold ${
            inStock
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-red-100 text-red-700 border-red-200"
          }`}
          variant="outline"
        >
          {inStock ? t("common.inStock") : t("common.outOfStock")}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-display font-bold text-lg text-foreground mb-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs text-muted-foreground">
              {t("product.price")}
            </span>
            <p className="font-bold text-primary text-lg">
              ₹{product.pricePerKg}/{t("common.kg")}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">
              {t("product.stock")}
            </span>
            <p className="font-semibold text-sm text-foreground">
              {product.stock} {t("common.kg")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-3 text-muted-foreground">
          <Package className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs">{product.wholesalerName}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-4 text-muted-foreground">
          <Phone className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs">{product.wholesalerContact}</span>
        </div>
        <Button
          data-ocid={`product.add_to_cart.button.${index}`}
          onClick={() => onAddToCart?.(product.id)}
          disabled={!inStock || !onAddToCart}
          className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold gap-2"
          size="sm"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {inStock ? t("product.addToCart") : t("product.outOfStock")}
        </Button>
      </CardContent>
    </Card>
  );
}
