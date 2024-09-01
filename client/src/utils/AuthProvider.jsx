import { useState, createContext, useContext } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({children}) {

    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (userToken) => {
        setToken(userToken);
        setIsAuthenticated(true);
        console.log(isAuthenticated)
    }

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log(context);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};