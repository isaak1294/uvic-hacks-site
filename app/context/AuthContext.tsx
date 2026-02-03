"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation"; // Changed from next/router for App Router compatibility

interface AuthContextType {
    user: any | null;
    token: string | null;
    login: (token: string, userData: any) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        router.push("/join/login");
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
            try {
                // Proactive Expiry Check: Decode JWT payload
                const payload = JSON.parse(atob(savedToken.split('.')[1]));
                const isExpired = Date.now() >= payload.exp * 1000;

                if (isExpired) {
                    logout();
                } else {
                    setToken(savedToken);
                    setUser(JSON.parse(savedUser));
                }
            } catch (e) {
                logout(); // Clear malformed data
            }
        }
        setLoading(false);
    }, []);

    const login = (newToken: string, userData: any) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};