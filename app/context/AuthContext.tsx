"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const logout = () => {
        // Capture the current path so we can return after logging back in
        const currentPath = window.location.pathname + window.location.search;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);

        // Redirect to login with a returnUrl parameter
        // We use encodeURIComponent to ensure special characters in the URL don't break the query string
        router.push(`/join/login?redirect=${encodeURIComponent(currentPath)}`);
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
            try {
                const payload = JSON.parse(atob(savedToken.split('.')[1]));
                const isExpired = Date.now() >= payload.exp * 1000;

                if (isExpired) {
                    logout();
                } else {
                    setToken(savedToken);
                    setUser(JSON.parse(savedUser));
                }
            } catch (e) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = (newToken: string, userData: any) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);

        // Check for a redirect parameter in the URL
        const redirectTo = searchParams.get("redirect");

        // If it exists, send them back there; otherwise, send to profile
        if (redirectTo) {
            router.push(decodeURIComponent(redirectTo));
        } else {
            router.push("/profile");
        }
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