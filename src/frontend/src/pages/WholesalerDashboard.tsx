import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Edit2,
  PackageCheck,
  Plus,
  Trash2,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import type { Product } from "../data/sampleData";
import { type OrderStatus, useStore } from "../hooks/useStore";

const STATUS_STYLES: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-700 border-blue-200",
  Dispatched: "bg-orange-100 text-orange-700 border-orange-200",
  Delivered: "bg-green-100 text-green-700 border-green-200",
  Declined: "bg-red-100 text-red-700 border-red-200",
};

const CATEGORIES = ["Spices", "Vegetables", "Fruits", "Groceries", "Others"];

interface WholesalerDashboardProps {
  onNavigate: (page: string) => void;
}

type ProductForm = {
  name: string;
  category: string;
  pricePerKg: string;
  stock: string;
  wholesalerContact: string;
};

export function WholesalerDashboard({ onNavigate }: WholesalerDashboardProps) {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const store = useStore(currentUser?.id);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    category: "Spices",
    pricePerKg: "",
    stock: "",
    wholesalerContact: currentUser?.phone || "",
  });

  const myProducts = store.products.filter(
    (p) => p.wholesalerId === currentUser?.id,
  );
  const myOrders = currentUser ? store.getWholesalerOrders(currentUser.id) : [];

  const openAddDialog = () => {
    setEditProduct(null);
    setForm({
      name: "",
      category: "Spices",
      pricePerKg: "",
      stock: "",
      wholesalerContact: currentUser?.phone || "",
    });
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      pricePerKg: product.pricePerKg.toString(),
      stock: product.stock.toString(),
      wholesalerContact: product.wholesalerContact,
    });
    setDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!form.name || !form.pricePerKg || !form.stock) {
      toast.error("Please fill all fields");
      return;
    }
    if (editProduct) {
      store.updateProduct(editProduct.id, {
        name: form.name,
        category: form.category,
        pricePerKg: Number.parseFloat(form.pricePerKg),
        stock: Number.parseInt(form.stock),
        wholesalerContact: form.wholesalerContact,
      });
      toast.success("Product updated!");
    } else {
      store.addProduct({
        name: form.name,
        category: form.category,
        pricePerKg: Number.parseFloat(form.pricePerKg),
        stock: Number.parseInt(form.stock),
        wholesalerName: currentUser?.shopName || "",
        wholesalerContact: form.wholesalerContact,
        wholesalerId: currentUser?.id || "",
        image: `https://placehold.co/300x200/0A3D91/white?text=${encodeURIComponent(form.name)}`,
      });
      toast.success("Product added!");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    store.deleteProduct(id);
    toast.success("Product deleted");
  };

  const statusKey = (status: OrderStatus) =>
    `order.status.${status.toLowerCase()}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="wholesaler-dashboard" onNavigate={onNavigate} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Welcome, <span className="text-primary">{currentUser?.name}</span>!
          </h1>
          <p className="text-muted-foreground mt-1">{currentUser?.shopName}</p>
        </div>

        <Tabs defaultValue="products">
          <TabsList className="mb-6 rounded-xl bg-secondary">
            <TabsTrigger
              data-ocid="wholesaler.products.tab"
              value="products"
              className="rounded-lg"
            >
              {t("wholesaler.myProducts")} ({myProducts.length})
            </TabsTrigger>
            <TabsTrigger
              data-ocid="wholesaler.orders.tab"
              value="orders"
              className="rounded-lg"
            >
              {t("wholesaler.incomingOrders")} ({myOrders.length})
            </TabsTrigger>
          </TabsList>

          {/* My Products Tab */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-xl font-semibold">
                {t("wholesaler.myProducts")}
              </h2>
              <Button
                data-ocid="wholesaler.add_product.button"
                onClick={openAddDialog}
                className="rounded-xl bg-primary text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                {t("wholesaler.addProduct")}
              </Button>
            </div>

            {myProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-3">📦</p>
                <p className="text-muted-foreground">
                  No products yet. Add your first product!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myProducts.map((product, i) => (
                  <Card
                    key={product.id}
                    className="rounded-2xl shadow-card border-border"
                  >
                    <CardContent className="p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-36 object-cover rounded-xl mb-3"
                      />
                      <h3 className="font-semibold text-foreground">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {product.category}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-primary font-bold">
                          ₹{product.pricePerKg}/kg
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            product.stock > 0
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {product.stock} kg
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          data-ocid={`wholesaler.product.edit_button.${i + 1}`}
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(product)}
                          className="flex-1 rounded-xl gap-1.5"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit
                        </Button>
                        <Button
                          data-ocid={`wholesaler.product.delete_button.${i + 1}`}
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 rounded-xl gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Incoming Orders Tab */}
          <TabsContent value="orders">
            <h2 className="font-display text-xl font-semibold mb-4">
              {t("wholesaler.incomingOrders")}
            </h2>

            {myOrders.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-3">📋</p>
                <p className="text-muted-foreground">No incoming orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myOrders.map((order, i) => (
                  <Card
                    key={order.id}
                    className="rounded-2xl shadow-card border-border"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-foreground">
                            {order.retailerName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.retailerShop}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs font-semibold ${STATUS_STYLES[order.status]}`}
                        >
                          {t(statusKey(order.status))}
                        </Badge>
                      </div>

                      <div className="space-y-1 mb-4">
                        {order.items.map((item) => (
                          <div
                            key={item.productId}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-foreground">
                              {item.productName}
                            </span>
                            <span className="text-muted-foreground">
                              {item.qty} kg
                            </span>
                          </div>
                        ))}
                      </div>

                      <p className="text-primary font-bold mb-3">
                        ₹{order.total.toLocaleString()}
                      </p>

                      <div className="flex gap-2 flex-wrap">
                        {order.status === "Pending" && (
                          <>
                            <Button
                              data-ocid={`wholesaler.accept.button.${i + 1}`}
                              size="sm"
                              onClick={() => {
                                store.updateOrderStatus(order.id, "Accepted");
                                toast.success("Order accepted!");
                              }}
                              className="rounded-xl bg-primary text-white gap-1.5"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              {t("wholesaler.accept")}
                            </Button>
                            <Button
                              data-ocid={`wholesaler.decline.button.${i + 1}`}
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                store.updateOrderStatus(order.id, "Declined");
                                toast.error("Order declined");
                              }}
                              className="rounded-xl gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              {t("wholesaler.decline")}
                            </Button>
                          </>
                        )}
                        {order.status === "Accepted" && (
                          <Button
                            data-ocid={`wholesaler.dispatch.button.${i + 1}`}
                            size="sm"
                            onClick={() => {
                              store.updateOrderStatus(order.id, "Dispatched");
                              toast.success("Marked as dispatched!");
                            }}
                            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white gap-1.5"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            {t("wholesaler.dispatch")}
                          </Button>
                        )}
                        {order.status === "Dispatched" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              store.updateOrderStatus(order.id, "Delivered");
                              toast.success("Marked as delivered!");
                            }}
                            className="rounded-xl bg-green-600 hover:bg-green-700 text-white gap-1.5"
                          >
                            <PackageCheck className="w-3.5 h-3.5" />
                            {t("wholesaler.markDelivered")}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Add/Edit Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editProduct ? "Edit Product" : t("wholesaler.addProduct")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="pName">Product Name</Label>
              <Input
                id="pName"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1 rounded-xl"
                placeholder="e.g. Turmeric"
              />
            </div>
            <div>
              <Label htmlFor="pCat">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger id="pCat" className="mt-1 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="pPrice">Price per kg (₹)</Label>
                <Input
                  id="pPrice"
                  type="number"
                  value={form.pricePerKg}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pricePerKg: e.target.value }))
                  }
                  className="mt-1 rounded-xl"
                  placeholder="120"
                />
              </div>
              <div>
                <Label htmlFor="pStock">Stock (kg)</Label>
                <Input
                  id="pStock"
                  type="number"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stock: e.target.value }))
                  }
                  className="mt-1 rounded-xl"
                  placeholder="500"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pContact">Contact Number</Label>
              <Input
                id="pContact"
                value={form.wholesalerContact}
                onChange={(e) =>
                  setForm((f) => ({ ...f, wholesalerContact: e.target.value }))
                }
                className="mt-1 rounded-xl"
                placeholder="9876500000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="wholesaler.product.cancel_button"
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProduct}
              data-ocid="wholesaler.product.save_button"
              className="rounded-xl bg-primary text-white"
            >
              {editProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
