import { useCallback, useEffect, useState } from "react";
import { type Product, sampleProducts } from "../data/sampleData";

export interface CartItem {
  productId: string;
  qty: number;
}

export type OrderStatus =
  | "Pending"
  | "Accepted"
  | "Declined"
  | "Dispatched"
  | "Delivered";

export interface OrderItem {
  productId: string;
  productName: string;
  qty: number;
  pricePerKg: number;
  wholesalerId: string;
}

export interface Order {
  id: string;
  retailerId: string;
  retailerName: string;
  retailerShop: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const PRODUCTS_KEY = "bazaarnet_products";
const ORDERS_KEY = "bazaarnet_orders";

function getCartKey(retailerId: string) {
  return `bazaarnet_cart_${retailerId}`;
}

function loadProducts(): Product[] {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
  return sampleProducts;
}

function loadOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function useStore(userId?: string) {
  const [products, setProductsState] = useState<Product[]>(loadProducts);
  const [orders, setOrdersState] = useState<Order[]>(loadOrders);
  const [cart, setCartState] = useState<CartItem[]>(() => {
    if (!userId) return [];
    try {
      return JSON.parse(localStorage.getItem(getCartKey(userId)) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (userId) {
      setCartState(() => {
        try {
          return JSON.parse(localStorage.getItem(getCartKey(userId)) || "[]");
        } catch {
          return [];
        }
      });
    } else {
      setCartState([]);
    }
  }, [userId]);

  const setProducts = useCallback((p: Product[]) => {
    setProductsState(p);
    saveProducts(p);
  }, []);

  const setOrders = useCallback((o: Order[]) => {
    setOrdersState(o);
    saveOrders(o);
  }, []);

  const setCart = useCallback(
    (c: CartItem[]) => {
      setCartState(c);
      if (userId) {
        localStorage.setItem(getCartKey(userId), JSON.stringify(c));
      }
    },
    [userId],
  );

  const addProduct = useCallback(
    (product: Omit<Product, "id">) => {
      const newProduct: Product = { ...product, id: `prod_${Date.now()}` };
      setProducts([...products, newProduct]);
      return newProduct;
    },
    [products, setProducts],
  );

  const updateProduct = useCallback(
    (id: string, updates: Partial<Product>) => {
      setProducts(
        products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      );
    },
    [products, setProducts],
  );

  const deleteProduct = useCallback(
    (id: string) => {
      setProducts(products.filter((p) => p.id !== id));
    },
    [products, setProducts],
  );

  const addToCart = useCallback(
    (productId: string, qty: number) => {
      const existing = cart.find((c) => c.productId === productId);
      if (existing) {
        setCart(
          cart.map((c) =>
            c.productId === productId ? { ...c, qty: c.qty + qty } : c,
          ),
        );
      } else {
        setCart([...cart, { productId, qty }]);
      }
    },
    [cart, setCart],
  );

  const updateCartQty = useCallback(
    (productId: string, qty: number) => {
      if (qty <= 0) {
        setCart(cart.filter((c) => c.productId !== productId));
      } else {
        setCart(
          cart.map((c) => (c.productId === productId ? { ...c, qty } : c)),
        );
      }
    },
    [cart, setCart],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart(cart.filter((c) => c.productId !== productId));
    },
    [cart, setCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const placeOrder = useCallback(
    (
      retailerId: string,
      retailerName: string,
      retailerShop: string,
      items: OrderItem[],
      total: number,
    ) => {
      const order: Order = {
        id: `order_${Date.now()}`,
        retailerId,
        retailerName,
        retailerShop,
        items,
        total,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };
      const newOrders = [order, ...orders];
      setOrders(newOrders);
      clearCart();
      return order;
    },
    [orders, setOrders, clearCart],
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status } : o)));
    },
    [orders, setOrders],
  );

  const getRetailerOrders = useCallback(
    (retailerId: string) => {
      return orders
        .filter((o) => o.retailerId === retailerId)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    },
    [orders],
  );

  const getWholesalerOrders = useCallback(
    (wholesalerId: string) => {
      return orders
        .filter((o) =>
          o.items.some((item) => item.wholesalerId === wholesalerId),
        )
        .map((o) => ({
          ...o,
          items: o.items.filter((item) => item.wholesalerId === wholesalerId),
        }))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    },
    [orders],
  );

  return {
    products,
    cart,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    placeOrder,
    updateOrderStatus,
    getRetailerOrders,
    getWholesalerOrders,
  };
}
