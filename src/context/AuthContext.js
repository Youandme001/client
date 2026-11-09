import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { accountApi } from '../api';
import { sessionStore } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(sessionStore.get);

  // Drop a stored session that the API no longer accepts (expired token)
  useEffect(() => {
    const stored = sessionStore.get();
    if (!stored?.user?.id) return;
    accountApi
      .get(stored.user.id)
      .then((user) => {
        const next = { ...stored, user };
        sessionStore.set(next);
        setSession(next);
      })
      .catch(() => {
        sessionStore.clear();
        setSession(null);
      });
  }, []);

  const save = useCallback((token, user) => {
    const next = { token, user };
    sessionStore.set(next);
    setSession(next);
  }, []);

  const login = useCallback(
    async (email, password) => {
      const { token, user } = await accountApi.login(email, password);
      save(token, user);
      return user;
    },
    [save]
  );

  const register = useCallback(
    async (body) => {
      const { token, data } = await accountApi.register(body);
      save(token, data);
      return data;
    },
    [save]
  );

  const updateUser = useCallback((user) => {
    setSession((prev) => {
      const next = { ...prev, user };
      sessionStore.set(next);
      return next;
    });
  }, []);

  const logout = useCallback(() => {
    sessionStore.clear();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ user: session?.user || null, login, register, logout, updateUser }),
    [session, login, register, logout, updateUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
