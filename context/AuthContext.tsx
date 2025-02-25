"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the AuthContext type correctly
interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;  // userEmail can be a string or null
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userEmail: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedEmail = localStorage.getItem('userEmail');

        if (storedAuth === 'true' && storedEmail) {
            setIsAuthenticated(true);
            setUserEmail(storedEmail);
        }
    }, []);

    const login = (email: string) => {
        setIsAuthenticated(true);
        setUserEmail(email); // Now this is correct
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null); // Now this is correct
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);