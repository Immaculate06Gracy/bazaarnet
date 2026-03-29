import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  id: string;
  name: string;
  shopName: string;
  phone: string;
  email: string;
  location: string;
  role: "retailer" | "wholesaler";
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (
    email: string,
    password: string,
    role: "retailer" | "wholesaler",
  ) => Promise<boolean>;
  signup: (userData: Omit<User, "id">) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "bazaarnet_users";
const SESSION_KEY = "bazaarnet_session";

function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Seed demo users
    const existingUsers = getUsers();
    if (existingUsers.length === 0) {
      const demoUsers: User[] = [
        {
          id: "r1",
          name: "Ravi Kumar",
          shopName: "Kumar General Store",
          phone: "9876543210",
          email: "retailer@demo.com",
          location: "Chennai",
          role: "retailer",
          password: "demo123",
        },
        {
          id: "w1",
          name: "Sundar Traders",
          shopName: "Sundar Wholesale Co.",
          phone: "9876500000",
          email: "wholesaler@demo.com",
          location: "Coimbatore",
          role: "wholesaler",
          password: "demo123",
        },
      ];
      saveUsers(demoUsers);
    }

    // Restore session
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      const users = getUsers();
      const user = users.find((u) => u.id === sessionId);
      if (user) setCurrentUser(user);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    role: "retailer" | "wholesaler",
  ): Promise<boolean> => {
    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role,
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem(SESSION_KEY, user.id);
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, "id">): Promise<boolean> => {
    const users = getUsers();
    if (users.find((u) => u.email === userData.email)) return false;
    const newUser: User = { ...userData, id: `user_${Date.now()}` };
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem(SESSION_KEY, newUser.id);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
