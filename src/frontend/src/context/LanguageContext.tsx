import { type ReactNode, createContext, useContext, useState } from "react";

type Language = "en" | "ta";

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.marketplace": "Marketplace",
    "nav.cart": "Cart",
    "nav.orders": "Orders",
    "nav.logout": "Logout",
    "home.title": "BazaarNet",
    "home.subtitle": "Connecting Wholesalers & Retailers",
    "home.retailer": "Retailer",
    "home.wholesaler": "Wholesaler",
    "home.login": "Login",
    "home.signup": "Sign Up",
    "home.retailer.desc": "Browse products and place bulk orders",
    "home.wholesaler.desc": "Manage stock and fulfill orders",
    "category.spices": "Spices",
    "category.vegetables": "Vegetables",
    "category.fruits": "Fruits",
    "category.groceries": "Groceries",
    "category.others": "Others",
    "category.all": "All",
    "product.addToCart": "Add to Cart",
    "product.outOfStock": "Out of Stock",
    "product.price": "Price/kg",
    "product.stock": "Stock",
    "product.wholesaler": "Supplier",
    "product.contact": "Contact",
    "order.status.pending": "Pending",
    "order.status.accepted": "Accepted",
    "order.status.dispatched": "Dispatched",
    "order.status.delivered": "Delivered",
    "order.status.declined": "Declined",
    "wholesaler.addProduct": "Add Product",
    "wholesaler.updateStock": "Update Stock",
    "wholesaler.accept": "Accept",
    "wholesaler.decline": "Decline",
    "wholesaler.dispatch": "Mark Dispatched",
    "wholesaler.myProducts": "My Products",
    "wholesaler.incomingOrders": "Incoming Orders",
    "wholesaler.markDelivered": "Mark Delivered",
    "auth.name": "Full Name",
    "auth.shopName": "Shop Name",
    "auth.phone": "Phone Number",
    "auth.email": "Email Address",
    "auth.password": "Password",
    "auth.location": "Location",
    "auth.loginBtn": "Login",
    "auth.signupBtn": "Create Account",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.placeOrder": "Place Order",
    "cart.orderSuccess": "Order placed successfully!",
    "cart.qty": "Qty",
    "orders.title": "My Orders",
    "orders.empty": "No orders yet",
    "orders.date": "Order Date",
    "orders.items": "Items",
    "orders.total": "Total",
    "orders.status": "Status",
    "search.placeholder": "Search products...",
    "common.kg": "kg",
    "common.inStock": "In Stock",
    "common.outOfStock": "Out of Stock",
    "demo.hint": "Demo: retailer@demo.com / demo123",
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.marketplace": "சந்தை",
    "nav.cart": "கார்ட்",
    "nav.orders": "ஆர்டர்கள்",
    "nav.logout": "வெளியேறு",
    "home.title": "BazaarNet",
    "home.subtitle": "மொத்த விற்பனையாளர்கள் & சில்லறை விற்பனையாளர்களை இணைக்கிறது",
    "home.retailer": "சில்லறை வியாபாரி",
    "home.wholesaler": "மொத்த வியாபாரி",
    "home.login": "உள்நுழை",
    "home.signup": "பதிவு செய்",
    "home.retailer.desc": "தயாரிப்புகளை உலாவி ஆர்டர் செய்யுங்கள்",
    "home.wholesaler.desc": "சரக்கை நிர்வகித்து ஆர்டர்களை நிறைவேற்றுங்கள்",
    "category.spices": "மசாலா",
    "category.vegetables": "காய்கறிகள்",
    "category.fruits": "பழங்கள்",
    "category.groceries": "மளிகை",
    "category.others": "மற்றவை",
    "category.all": "அனைத்தும்",
    "product.addToCart": "கார்டில் சேர்",
    "product.outOfStock": "கையிருப்பில் இல்லை",
    "product.price": "விலை/கிலோ",
    "product.stock": "இருப்பு",
    "product.wholesaler": "சப்ளையர்",
    "product.contact": "தொடர்பு",
    "order.status.pending": "நிலுவையில்",
    "order.status.accepted": "ஏற்றுக்கொள்ளப்பட்டது",
    "order.status.dispatched": "அனுப்பப்பட்டது",
    "order.status.delivered": "வழங்கப்பட்டது",
    "order.status.declined": "நிராகரிக்கப்பட்டது",
    "wholesaler.addProduct": "தயாரிப்பு சேர்",
    "wholesaler.updateStock": "இருப்பு புதுப்பி",
    "wholesaler.accept": "ஏற்றுக்கொள்",
    "wholesaler.decline": "நிராகரி",
    "wholesaler.dispatch": "அனுப்பியது குறி",
    "wholesaler.myProducts": "என் தயாரிப்புகள்",
    "wholesaler.incomingOrders": "வரும் ஆர்டர்கள்",
    "wholesaler.markDelivered": "வழங்கியது குறி",
    "auth.name": "முழு பெயர்",
    "auth.shopName": "கடை பெயர்",
    "auth.phone": "தொலைபேசி",
    "auth.email": "மின்னஞ்சல்",
    "auth.password": "கடவுச்சொல்",
    "auth.location": "இடம்",
    "auth.loginBtn": "உள்நுழை",
    "auth.signupBtn": "கணக்கு உருவாக்கு",
    "auth.noAccount": "கணக்கு இல்லையா?",
    "auth.hasAccount": "ஏற்கனவே கணக்கு உள்ளதா?",
    "cart.title": "கொள்முதல் கார்ட்",
    "cart.empty": "கார்ட் காலியாக உள்ளது",
    "cart.total": "மொத்தம்",
    "cart.placeOrder": "ஆர்டர் செய்",
    "cart.orderSuccess": "ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது!",
    "cart.qty": "அளவு",
    "orders.title": "என் ஆர்டர்கள்",
    "orders.empty": "இன்னும் ஆர்டர் இல்லை",
    "orders.date": "ஆர்டர் தேதி",
    "orders.items": "பொருட்கள்",
    "orders.total": "மொத்தம்",
    "orders.status": "நிலை",
    "search.placeholder": "தயாரிப்புகளை தேடு...",
    "common.kg": "கிலோ",
    "common.inStock": "கையிருப்பு உள்ளது",
    "common.outOfStock": "கையிருப்பில் இல்லை",
    "demo.hint": "டெமோ: retailer@demo.com / demo123",
  },
};

interface LanguageContextType {
  language: Language;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggle = () => setLanguage((l) => (l === "en" ? "ta" : "en"));
  const t = (key: string) => translations[language][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
