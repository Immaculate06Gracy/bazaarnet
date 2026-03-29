import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

type UserRole = "retailer" | "wholesaler";

interface AuthPageProps {
  userRole: UserRole;
  mode: "login" | "signup";
  onNavigate: (page: string) => void;
}

export function AuthPage({ userRole, mode, onNavigate }: AuthPageProps) {
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    shopName: "",
    phone: "",
    email: "",
    password: "",
    location: "",
  });

  const isSignup = mode === "signup";
  const roleLabel =
    userRole === "retailer" ? t("home.retailer") : t("home.wholesaler");

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        const ok = await signup({ ...form, role: userRole });
        if (!ok) {
          toast.error("Email already registered");
          return;
        }
        toast.success("Account created!");
        onNavigate(
          userRole === "retailer"
            ? "retailer-dashboard"
            : "wholesaler-dashboard",
        );
      } else {
        const ok = await login(form.email, form.password, userRole);
        if (!ok) {
          toast.error("Invalid credentials");
          return;
        }
        onNavigate(
          userRole === "retailer"
            ? "retailer-dashboard"
            : "wholesaler-dashboard",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const switchPage = isSignup ? `${userRole}-login` : `${userRole}-signup`;

  return (
    <div className="min-h-screen bazaar-gradient flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <Card className="shadow-card-hover rounded-2xl border-0 animate-fade-in">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
            <CardTitle className="font-display text-2xl text-foreground">
              {isSignup ? t("auth.signupBtn") : t("auth.loginBtn")} —{" "}
              {roleLabel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <>
                  <div>
                    <Label htmlFor="name">{t("auth.name")}</Label>
                    <Input
                      id="name"
                      data-ocid="auth.name.input"
                      value={form.name}
                      onChange={handleChange("name")}
                      required
                      className="mt-1 rounded-xl"
                      placeholder="Ravi Kumar"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shopName">{t("auth.shopName")}</Label>
                    <Input
                      id="shopName"
                      data-ocid="auth.shop.input"
                      value={form.shopName}
                      onChange={handleChange("shopName")}
                      required
                      className="mt-1 rounded-xl"
                      placeholder="Kumar General Store"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("auth.phone")}</Label>
                    <Input
                      id="phone"
                      data-ocid="auth.phone.input"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      required
                      className="mt-1 rounded-xl"
                      placeholder="9876543210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">{t("auth.location")}</Label>
                    <Input
                      id="location"
                      data-ocid="auth.location.input"
                      value={form.location}
                      onChange={handleChange("location")}
                      required
                      className="mt-1 rounded-xl"
                      placeholder="Chennai"
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  data-ocid="auth.email.input"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                  className="mt-1 rounded-xl"
                  placeholder={
                    userRole === "retailer"
                      ? "retailer@demo.com"
                      : "wholesaler@demo.com"
                  }
                />
              </div>

              <div>
                <Label htmlFor="password">{t("auth.password")}</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    data-ocid="auth.password.input"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange("password")}
                    required
                    className="rounded-xl pr-10"
                    placeholder="demo123"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                data-ocid={
                  isSignup
                    ? "auth.signup.submit_button"
                    : "auth.login.submit_button"
                }
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold h-11"
              >
                {loading
                  ? "Please wait..."
                  : isSignup
                    ? t("auth.signupBtn")
                    : t("auth.loginBtn")}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {isSignup ? t("auth.hasAccount") : t("auth.noAccount")}{" "}
                <button
                  type="button"
                  onClick={() => onNavigate(switchPage)}
                  className="text-primary hover:underline font-semibold"
                >
                  {isSignup ? t("auth.loginBtn") : t("auth.signupBtn")}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
