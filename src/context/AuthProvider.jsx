// components/context/AuthProviderNew.jsx
import { createContext, useState, useCallback, useEffect } from "react";
import useStorage from "../hooks/useStorage";

import { mockUser } from "../utils/constants";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get, set, remove } = useStorage(window.localStorage);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      try {
        const sessionUser = get("user");

        if (sessionUser) {
          setUser(sessionUser);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [get, remove]);

  const register = useCallback(
    async (credentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const newUser = {
          id: Math.floor(Math.random() * 10000),
          username: credentials.username,
          email: credentials.email,
          favoritePokemon: [],
          createdAt: new Date().toISOString(),
        };

        set("user", newUser);
        setUser(newUser);

        return { ok: true, user: newUser };
      } catch (err) {
        console.error("Registration error:", err);
        setError(err.message);

        return { ok: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [set],
  );

  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);
      setError(null);

      try {
        if (
          credentials.email === mockUser.email &&
          credentials.password === mockUser.password
        ) {
          const loggedInUser = {
            id: 1,
            username: mockUser.name,
            email: mockUser.email,
            favoritePokemon: mockUser.favoritePokemon,
          };

          set("user", loggedInUser);
          setUser(loggedInUser);

          return { ok: true, user: loggedInUser };
        } else {
          throw new Error("Invalid email or password");
        }
      } catch (err) {
        setError(err.message);
        return { ok: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [set],
  );

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      remove("user");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [remove]);

  const updateProfile = useCallback(
    async (updates) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedUser = {
          ...user,
          ...updates,
        };

        set("user", updatedUser);
        setUser(updatedUser);

        return { ok: true, user: updatedUser };
      } catch (err) {
        console.error("Profile update error:", err);
        setError(err.message);
        return { ok: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [user, set],
  );

  const value = {
    // User state
    user,
    isLoading,
    isAuthenticated: !!user,
    error,

    // Auth methods
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
