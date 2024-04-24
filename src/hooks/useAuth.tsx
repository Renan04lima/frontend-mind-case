/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";

import { api } from "../services/api";

interface IUser {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

interface IAuthContext {
  user: IUser | null;
  signIn(email: string, password: string): Promise<void>;
  signUp(name: string, email: string, password: string): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null>(null);

  const keyStorageUser = "@user";

  async function signIn(email: string, password: string) {
    const { data } = await api.post("login", {
      email,
      password,
    });

    const userInfo = {
      token: data.token,
      user: data.user,
    };

    localStorage.setItem(keyStorageUser, JSON.stringify(userInfo));
    setUser(userInfo);

    api.defaults.headers.common["Authorization"] = `Bearer ${userInfo.token}`;
  }

  async function signUp(name: string, email: string, password: string) {
    const { data } = await api.post("sign-up", {
      name,
      email,
      password,
    });

    const userInfo = {
      token: data.token,
      user: data.user,
    };

    localStorage.setItem(keyStorageUser, JSON.stringify(userInfo));
    setUser(userInfo);

    api.defaults.headers.common["Authorization"] = `Bearer ${userInfo.token}`;
  }

  function logOut() {
    localStorage.clear();
    setUser(null);
  }

  useEffect(() => {
    function checkIfUserIsLoggedIn() {
      const storedUser = localStorage.getItem(keyStorageUser);

      if (storedUser) {
        const userInfo = JSON.parse(storedUser);
        setUser(userInfo);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userInfo.token}`;
      }
    }

    checkIfUserIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
